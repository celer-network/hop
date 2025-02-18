import React, { FC, useState, useMemo } from 'react'
import { BigNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { makeStyles } from '@material-ui/core/styles'
import { Chain, HopBridge, Token } from '@hop-protocol/sdk'
import { useApp } from 'src/contexts/AppContext'
import { useWeb3Context } from 'src/contexts/Web3Context'
import AmountSelectorCard from 'src/components/AmountSelectorCard'
import Button from 'src/components/buttons/Button'
import Network from 'src/models/Network'
import Transaction from 'src/models/Transaction'
import {
  amountToBN,
  sanitizeNumericalString,
  formatStakingValues,
  isRewardsExpired,
  calculateApr,
  calculateStakedPosition,
  formatError,
} from 'src/utils'
import Alert from 'src/components/alert/Alert'
import { DetailRow } from 'src/components/InfoTooltip'
import { useTransactionReplacement, useApprove, useAsyncMemo, useBalance } from 'src/hooks'
import { Div, Flex } from 'src/components/ui'
import { ButtonsWrapper } from 'src/components/buttons/ButtonsWrapper'
import { useQuery } from 'react-query'
import { StakingRewards } from '@hop-protocol/core/contracts'
import logger from 'src/logger'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10.4rem',
  },
  buttons: {
    marginTop: theme.padding.default,
  },
  button: {
    width: '16rem',
  },
  alert: {
    marginTop: theme.padding.default,
  },
}))

type Props = {
  network: Network
  bridge: HopBridge | undefined
  stakingToken: Token | undefined
  rewardsToken: Token | undefined
  stakingRewards?: StakingRewards
  rewardTokenUsdPrice?: number
}

const StakeWidget: FC<Props> = props => {
  const styles = useStyles()
  const { network, bridge, stakingToken, rewardsToken, stakingRewards, rewardTokenUsdPrice } = props

  const { txConfirm, sdk } = useApp()
  const { checkConnectedNetworkId, address } = useWeb3Context()
  const { waitForTransaction, addTransaction } = useTransactionReplacement()
  const { balance: stakeBalance, loading: loadingStakeBalance } = useBalance(
    stakingRewards,
    address,
    Number(network.networkId)
  )
  const { balance: lpBalance, loading: loadingLpBalance } = useBalance(stakingToken, address)
  const { balance: totalStaked } = useBalance(stakingToken, stakingRewards?.address)
  const { approve } = useApprove(stakingToken)

  const [amount, setAmount] = useState('')

  const parsedAmount =
    amount && stakingToken ? amountToBN(amount, stakingToken.decimals) : undefined

  function handleOnChangeAmount(value) {
    const amt = sanitizeNumericalString(value)
    setAmount(amt)
  }

  // Fetched prices

  const { data } = useQuery(
    [
      `stakeWidgetData:${bridge?.network}:${network.slug}:${stakingToken?.address}:${
        stakingRewards?.address
      }:${address?.toString()}`,
      bridge?.network,
      network.slug,
      address?.toString(),
    ],
    async (): Promise<any> => {
      if (!(bridge && network && stakingToken && stakingRewards)) {
        return
      }

      try {
        const token = await bridge.getL1Token()
        const tokenUsdPrice = await bridge.priceFeed.getPriceByTokenSymbol(token.symbol)
        if (address) {
          const earned = await stakingRewards?.earned(address.toString())
          const allowance = await stakingToken?.allowance(stakingRewards.address, address.toString())

          return {
            tokenUsdPrice,
            earned,
            allowance,
          }
        }

        return {
          tokenUsdPrice,
          earned: BigNumber.from(0),
          allowance: BigNumber.from(0)
        }
      } catch (error) {
        console.log(`error:`, error)
      }
    },
    {
      enabled: !!bridge && !!network && !!stakingToken && !!stakingRewards,
      refetchInterval: 10e3,
    }
  )

  // Sync checks

  const needsApproval = useMemo(() => {
    if (!(address && data?.allowance && parsedAmount)) {
      return
    }
    return data?.allowance.lt(parsedAmount)
  }, [data?.allowance.toString(), parsedAmount])

  const isStakeEnabled = useMemo(() => {
    if (!parsedAmount || !lpBalance) return false
    if (needsApproval) return false
    if (parsedAmount.gt(lpBalance)) return false
    return true
  }, [parsedAmount, lpBalance, needsApproval])

  const warning = useMemo(() => {
    if (!parsedAmount || !lpBalance) return undefined
    if (parsedAmount.gt(lpBalance)) {
      return 'Insufficient balance'
    }
  }, [parsedAmount, lpBalance])

  // Async checks

  const rewardsExpired = useAsyncMemo(async () => {
    try {
      if (!stakingRewards) return
      const timestamp = await stakingRewards.periodFinish()
      const isExpired = isRewardsExpired(timestamp)
      return isExpired
    } catch (err: any) {
      logger.error(formatError(err))
    }
  }, [stakingRewards])

  const totalRewardsPerDay = useAsyncMemo(async () => {
    try {
      if (!(stakingRewards && rewardsExpired !== undefined)) {
        return
      }
      if (rewardsExpired) {
        return BigNumber.from('0')
      }
      const rewardRate = await stakingRewards.rewardRate()
      return rewardRate.mul(86400) // multiply by 1 day
    } catch (err: any) {
      logger.error(formatError(err))
    }
  }, [stakingRewards, rewardsExpired])

  const userRewardsPerDay = useMemo(() => {
    if (!(totalRewardsPerDay && stakeBalance?.gt(0) && totalStaked?.gt(0))) {
      return
    }
    return totalRewardsPerDay.mul(stakeBalance).div(totalStaked)
  }, [totalRewardsPerDay?.toString(), stakeBalance?.toString(), totalStaked?.toString()])

  const apr = useAsyncMemo(async () => {
    try {
      if (
        !(bridge && totalStaked && totalRewardsPerDay && rewardTokenUsdPrice && data?.tokenUsdPrice)
      ) {
        return
      }
      const canonToken = bridge.getCanonicalToken(network.slug)

      try {
        const url = 'https://assets.hop.exchange/v1-pool-stats.json'
        const res = await fetch(url)
        const json = await res.json()
        let symbol = canonToken.symbol
        if (symbol === 'WETH') {
          symbol = 'ETH'
        }
        if (symbol === 'XDAI') {
          symbol = 'DAI'
        }
        console.log('apr data', json)
        const oneHourMs = 60 * 60 * 1000
        const isRecent = json.timestamp > Date.now() - oneHourMs
        if (isRecent) {
          const apr = json.data[symbol][network.slug].stakingApr
          if (apr != null) {
            const aprBn = parseUnits(apr.toString(), 18)
            if (aprBn.lt(0)) {
              return BigNumber.from(0)
            }
          }
        }
      } catch (err) {
        console.error(err)
      }

      const amm = bridge.getAmm(network.slug)
      const stakedTotal = await amm.calculateTotalAmountForLpToken(totalStaked)
      if (stakedTotal.lte(0)) {
        return BigNumber.from(0)
      }

      return calculateApr(
        canonToken.decimals,
        data.tokenUsdPrice,
        rewardTokenUsdPrice,
        stakedTotal,
        totalRewardsPerDay
      )
    } catch (err) {
      logger.error(formatError(err))
    }
  }, [
    bridge,
    network.slug,
    totalStaked?.toString(),
    totalRewardsPerDay?.toString(),
    rewardTokenUsdPrice,
    data?.tokenUsdPrice,
  ])

  const stakedPosition = useAsyncMemo(async () => {
    if (
      !(
        address &&
        bridge &&
        data?.earned &&
        data?.tokenUsdPrice &&
        rewardTokenUsdPrice &&
        stakingToken &&
        stakeBalance?.gt(0)
      )
    ) {
      return
    }

    try {
      const canonToken = await bridge.getCanonicalToken(network.slug)
      const amm = bridge.getAmm(network.slug)
      const userStakedTotal = await amm.calculateTotalAmountForLpToken(stakeBalance)

      return calculateStakedPosition(
        data.earned,
        userStakedTotal,
        data.tokenUsdPrice,
        rewardTokenUsdPrice,
        canonToken.decimals,
        stakingToken.decimals
      )
    } catch (error) {
      console.log(`error:`, error)
    }
  }, [
    address,
    bridge?.network,
    network.slug,
    stakeBalance,
    stakingToken,
    data?.earned,
    rewardTokenUsdPrice,
    data?.tokenUsdPrice,
  ])

  // Actions

  const approveToken = async () => {
    if (!stakingRewards || !network || !stakingToken) {
      throw new Error('Undefined approval parameter')
    }

    const networkId = Number(network.networkId)
    const isNetworkConnected = await checkConnectedNetworkId(networkId)
    if (!isNetworkConnected || !parsedAmount) return

    const tx = await approve(parsedAmount, stakingToken, stakingRewards?.address)
    await tx?.wait()
  }

  const stake = async () => {
    try {
      if (!stakingRewards) {
        throw new Error('StakingRewards not instantiated')
      }

      if (!network) {
        throw new Error('Network must be defined')
      }

      if (!parsedAmount) {
        return
      }

      const networkId = Number(network.networkId)
      const isNetworkConnected = await checkConnectedNetworkId(networkId)
      if (!isNetworkConnected) return

      const tx = await txConfirm?.show({
        kind: 'stake',
        inputProps: {
          source: {
            network,
          },
          amount: amount,
          token: stakingToken,
        },
        onConfirm: async () => {
          const chain = Chain.fromSlug(network.slug)
          const overrides = await stakingToken?.txOverrides(chain)
          const signer = await sdk.getSignerOrProvider(network.slug)
          return stakingRewards.connect(signer).stake(parsedAmount, overrides)
        },
      })

      if (tx?.hash && network) {
        setAmount('')
        addTransaction(
          new Transaction({
            hash: tx.hash,
            networkName: network.slug,
            token: stakingToken,
          })
        )

        await waitForTransaction(tx, { networkName: network.slug, token: stakingToken })
      }
    } catch (err: any) {
      console.error(err)
    }
  }

  const claim = async () => {
    try {
      if (!stakingRewards) {
        throw new Error('StakingRewards not instantiated')
      }

      if (!network) {
        throw new Error('Network must be defined')
      }

      const networkId = Number(network.networkId)
      const isNetworkConnected = await checkConnectedNetworkId(networkId)
      if (!isNetworkConnected) return

      const chain = Chain.fromSlug(network.slug)
      const overrides = await stakingToken?.txOverrides(chain)
      const signer = await sdk.getSignerOrProvider(network.slug)
      await stakingRewards.connect(signer).getReward(overrides)
    } catch (err: any) {
      console.error(err)
    }
  }

  const withdraw = async () => {
    try {
      if (!stakingRewards || !network || !stakeBalance) {
        throw new Error('Missing withdraw param')
      }

      const networkId = Number(network.networkId)
      const isNetworkConnected = await checkConnectedNetworkId(networkId)
      if (!isNetworkConnected) return

      const signer = await sdk.getSignerOrProvider(network.slug)
      const _stakingRewards = stakingRewards.connect(signer)

      const tx = await txConfirm?.show({
        kind: 'withdrawStake',
        inputProps: {
          token: stakingToken,
          maxBalance: stakeBalance,
        },
        onConfirm: async (withdrawAmount: BigNumber) => {
          if (withdrawAmount.eq(stakeBalance)) {
            return _stakingRewards.exit()
          }

          const chain = Chain.fromSlug(network.slug)
          const overrides = await stakingToken?.txOverrides(chain)
          return _stakingRewards.withdraw(withdrawAmount, overrides)
        },
      })

      if (tx?.hash && network) {
        addTransaction(
          new Transaction({
            hash: tx.hash,
            networkName: network.slug,
            token: stakingToken,
          })
        )

        await waitForTransaction(tx, { networkName: network.slug, token: stakingToken })
      }
    } catch (err: any) {
      console.error(err)
    }
  }

  // Formatting

  const {
    formattedStakeBalance,
    formattedEarned,
    totalStakedFormatted,
    totalRewardsPerDayFormatted,
    userRewardsPerDayFormatted,
    aprFormatted,
    stakedPositionFormatted,
  } = formatStakingValues(
    stakingToken,
    rewardsToken,
    stakeBalance,
    data?.earned,
    totalStaked,
    totalRewardsPerDay,
    userRewardsPerDay,
    apr,
    stakedPosition,
    rewardsExpired
  )

  return (
    <Flex column alignCenter>
      <AmountSelectorCard
        label={`Staked: ${formattedStakeBalance}`}
        value={amount}
        token={stakingToken}
        onChange={handleOnChangeAmount}
        titleIconUrl={network?.imageUrl}
        title={`${network?.name} ${stakingToken?.name}`}
        balance={lpBalance}
        loadingBalance={loadingLpBalance}
        loadingSecondaryBalance={loadingStakeBalance}
        hideSymbol
      />

      <Flex column mt={2} width={['100%', '46rem']}>
        <DetailRow
          title="APR"
          tooltip="Annual Percentage Rate (APR) from staking LP tokens"
          value={aprFormatted}
        />
        <DetailRow
          title="Total Staked"
          tooltip="The total amount of LP tokens staked for rewards"
          value={totalStakedFormatted}
        />
        {totalRewardsPerDay?.gt(0) && (
          <DetailRow
            title={'Total Rewards'}
            tooltip={'The total rewards being distributed per day'}
            value={`${totalRewardsPerDayFormatted} / day`}
          />
        )}
      </Flex>

      <Flex column mb={2} width={['100%', '46rem']}>
        {!!userRewardsPerDay && (
          <DetailRow
            title={'Your Rewards'}
            tooltip={"The rewards you're earning per day"}
            value={`${userRewardsPerDayFormatted} / day`}
          />
        )}
        {!!stakedPosition && (
          <DetailRow
            title="Your Total"
            tooltip="The total worth of your staked LP position in USD"
            value={stakedPositionFormatted}
          />
        )}
      </Flex>

      <Alert severity="warning" text={warning} className={styles.alert} />

      <Flex column alignCenter fullWidth mt={2} mb={4}>
        <ButtonsWrapper>
          <Div mb={[2]}>
            <Button
              className={styles.button}
              large
              highlighted={!!needsApproval}
              disabled={!needsApproval}
              onClick={approveToken}
            >
              Approve
            </Button>
          </Div>
          <Div mb={[2]}>
            <Button
              className={styles.button}
              large
              highlighted={needsApproval === false}
              disabled={!isStakeEnabled}
              onClick={stake}
            >
              Stake
            </Button>
          </Div>
        </ButtonsWrapper>

        {data?.earned?.gt(0) && (
          <Flex my={2}>
            <Button large highlighted onClick={claim}>
              Claim {formattedEarned}
            </Button>
          </Flex>
        )}

        {stakeBalance?.gt(0) && (
          <Flex mt={2}>
            <Button large onClick={withdraw}>
              Withdraw
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default StakeWidget
