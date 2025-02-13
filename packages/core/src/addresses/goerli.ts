import { Addresses } from './types'

export const addresses: Addresses = {
  bonders: {
    ETH: {
      ethereum: {
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      polygon: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      optimism: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      arbitrum: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      }
    },
    USDC: {
      ethereum: {
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      polygon: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      optimism: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      arbitrum: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      }
    },
    HOP: {
      ethereum: {
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      polygon: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      optimism: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        arbitrum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      },
      arbitrum: {
        ethereum: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        polygon: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
        optimism: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7'
      }
    }
  },
  bridges: {
    ETH: {
      ethereum: {
        l1CanonicalToken: '0x0000000000000000000000000000000000000000',
        l1Bridge: '0xC8A4FB931e8D77df8497790381CA7d228E68a41b',
        bridgeDeployedBlockNumber: 7393532
      },
      polygon: {
        l1CanonicalBridge: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
        l1MessengerWrapper: '0x4b95e110178D51ef406C225462748A3F739d99Da',
        l2CanonicalBridge: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
        l2CanonicalToken: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
        l2Bridge: '0x34E8251051687BfF4EA23C18e466b3Ed13492abd',
        l2HopBridgeToken: '0xD063875762e760Ee787b11F6Af624058b4841A5a',
        l2AmmWrapper: '0x0e0E3d2C5c292161999474247956EF542caBF8dd',
        l2SaddleSwap: '0x3666f603Cc164936C1b87e207F36BEBa4AC5f18a',
        l2SaddleLpToken: '0x307C0fc195e1ddc927ee73856558Ab8C9297B3FB',
        l1FxBaseRootTunnel: '0x4b95e110178D51ef406C225462748A3F739d99Da',
        l1PosRootChainManager: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
        l1PosPredicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
        l2MessengerProxy: '0xB3DF06d0Cd5CceDe67265b53317dE091Bb21864b',
        bridgeDeployedBlockNumber: 27594937
      },
      arbitrum: {
        l1CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l1MessengerWrapper: '0x579F3d41C6C9EA61001A960f475683C021dFd571',
        l2CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l2CanonicalToken: '0xcb5ddfb8d0038247dc0beeecaa7f3457befcb77c',
        l2Bridge: '0xb276BC046DFf5024D20A3947475eA20C9F08eB1F',
        l2HopBridgeToken: '0x3F9880B2dF19aE17AdbdcD6a91a16fCd4a1A9D3D',
        l2AmmWrapper: '0xa832293f2DCe2f092182F17dd873ae06AD5fDbaF',
        l2SaddleSwap: '0x69a71b7F6Ff088a0310b4f911b4f9eA11e2E9740',
        l2SaddleLpToken: '0x8DC6D9fe4500D34A405414ed27e8Eb7Fd6889267',
        bridgeDeployedBlockNumber: 96936
      },
      optimism: {
        l1CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l1MessengerWrapper: '0x56900d66D74Cb14E3c86895789901C9135c95b16',
        l2CanonicalBridge: '0x4200000000000000000000000000000000000010',
        l2CanonicalToken: '0xDc38c5aF436B9652225f92c370A011C673FA7Ba5',
        l2Bridge: '0x2708E5C7087d4C6D295c8B58b2D452c360D505C7',
        l2HopBridgeToken: '0xC8A4FB931e8D77df8497790381CA7d228E68a41b',
        l2AmmWrapper: '0xC1985d7a3429cDC85E59E2E4Fcc805b857e6Ee2E',
        l2SaddleSwap: '0xa50395bdEaca7062255109fedE012eFE63d6D402',
        l2SaddleLpToken: '0x2105a73D7739f1034Becc1bd87f4F7820d575644',
        bridgeDeployedBlockNumber: 407263
      }
    },
    USDC: {
      ethereum: {
        l1CanonicalToken: '0x98339D8C260052B7ad81c28c16C0b98420f2B46a',
        l1Bridge: '0x7D269D3E0d61A05a0bA976b7DBF8805bF844AF3F',
        bridgeDeployedBlockNumber: 7398216
      },
      polygon: {
        l1CanonicalBridge: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
        l1MessengerWrapper: '0x91f8490eC27cbB1b2FaEdd29c2eC23011d7355FB',
        l2CanonicalBridge: '0x6D4dd09982853F08d9966aC3cA4Eb5885F16f2b2',
        l2CanonicalToken: '0x6D4dd09982853F08d9966aC3cA4Eb5885F16f2b2',
        l2Bridge: '0x3c0FFAca566fCcfD9Cc95139FEF6CBA143795963',
        l2HopBridgeToken: '0x5C32143C8B198F392d01f8446b754c181224ac26',
        l2AmmWrapper: '0xa81D244A1814468C734E5b4101F7b9c0c577a8fC',
        l2SaddleSwap: '0x76b22b8C1079A44F1211D867D68b1eda76a635A7',
        l2SaddleLpToken: '0x4a1a092BFFA8514E7F07ea3980C0be12139EFfFb',
        l1FxBaseRootTunnel: '0x91f8490eC27cbB1b2FaEdd29c2eC23011d7355FB',
        l1PosRootChainManager: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
        l1PosPredicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
        l2MessengerProxy: '0xa5A33aB9063395A90CCbEa2D86a62EcCf27B5742',
        bridgeDeployedBlockNumber: 27606309
      },
      arbitrum: {
        l1CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l1MessengerWrapper: '0x43A24BF6AAE1F8FE86528C13A5236153172a6863',
        l2CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l2CanonicalToken: '0x17078F231AA8dc256557b49a8f2F72814A71f633',
        l2Bridge: '0x86cA30bEF97fB651b8d866D45503684b90cb3312',
        l2HopBridgeToken: '0x30E344C8F517becAEEd04245ceD2e7301f06f21b',
        l2AmmWrapper: '0x32219766597DFbb10297127238D921E7CCF5D920',
        l2SaddleSwap: '0x83f6244Bd87662118d96D9a6D44f09dffF14b30E',
        l2SaddleLpToken: '0xaD884FacB295EBfF185e215b52346909C7C3198E',
        bridgeDeployedBlockNumber: 97011
      },
      optimism: {
        l1CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l1MessengerWrapper: '0xA49600627D913B61714fF2a205Fb1096f1bceAb2',
        l2CanonicalBridge: '0x4200000000000000000000000000000000000010',
        l2CanonicalToken: '0xCB4cEeFce514B2d910d3ac529076D18e3aDD3775',
        l2Bridge: '0x76b22b8C1079A44F1211D867D68b1eda76a635A7',
        l2HopBridgeToken: '0x72209Fe68386b37A40d6bCA04f78356fd342491f',
        l2AmmWrapper: '0xfF21e82a4Bc305BCE591530A68628192b5b6B6FD',
        l2SaddleSwap: '0xE4757dD81AFbecF61E51824AB9238df6691c3D0e',
        l2SaddleLpToken: '0xac1621E4C005D2dE18cD0CB226c60a4d94aE474E',
        bridgeDeployedBlockNumber: 407913
      }
    },
    HOP: {
      ethereum: {
        l1CanonicalToken: '0x7191061D5d4C60f598214cC6913502184BAddf18',
        l1Bridge: '0x22B1Cbb8D98a01a3B71D034BB899775A76Eb1cc2',
        bridgeDeployedBlockNumber: 7622715
      },
      polygon: {
        l1CanonicalBridge: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
        l1MessengerWrapper: '0xa492d3596e8391E376D4f5a5cBA5C077B890b094',
        l2CanonicalBridge: '0x3F9880B2dF19aE17AdbdcD6a91a16fCd4a1A9D3D',
        l2CanonicalToken: '0x3F9880B2dF19aE17AdbdcD6a91a16fCd4a1A9D3D',
        l2Bridge: '0x843267C9aEd0eCC57124FE5Fc717e14F7B7DAb31',
        l2HopBridgeToken: '0x3F9880B2dF19aE17AdbdcD6a91a16fCd4a1A9D3D',
        l2AmmWrapper: '0x0000000000000000000000000000000000000000',
        l2SaddleSwap: '0x0000000000000000000000000000000000000000',
        l2SaddleLpToken: '0x0000000000000000000000000000000000000000',
        l1FxBaseRootTunnel: '0xa492d3596e8391E376D4f5a5cBA5C077B890b094',
        l1PosRootChainManager: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
        l1PosPredicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
        l2MessengerProxy: '0x262531C7CACe5a0095bf12c238cb805a147AC002',
        bridgeDeployedBlockNumber: 28188499
      },
      arbitrum: {
        l1CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l1MessengerWrapper: '0x2A11a98e2fCF4674F30934B5166645fE6CA35F56',
        l2CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l2CanonicalToken: '0xB1ea9FeD58a317F81eEEFC18715Dd323FDEf45c4',
        l2Bridge: '0x2A11a98e2fCF4674F30934B5166645fE6CA35F56',
        l2HopBridgeToken: '0xB1ea9FeD58a317F81eEEFC18715Dd323FDEf45c4',
        l2AmmWrapper: '0x0000000000000000000000000000000000000000',
        l2SaddleSwap: '0x0000000000000000000000000000000000000000',
        l2SaddleLpToken: '0x0000000000000000000000000000000000000000',
        bridgeDeployedBlockNumber: 325937
      },
      optimism: {
        l1CanonicalBridge: '0x0000000000000000000000000000000000000000',
        l1MessengerWrapper: '0x0460352b91D7CF42B0E1C1c30f06B602D9ef2238',
        l2CanonicalBridge: '0x4200000000000000000000000000000000000010',
        l2CanonicalToken: '0xa5A33aB9063395A90CCbEa2D86a62EcCf27B5742',
        l2Bridge: '0x7aC115536FE3A185100B2c4DE4cb328bf3A58Ba6',
        l2HopBridgeToken: '0xa5A33aB9063395A90CCbEa2D86a62EcCf27B5742',
        l2AmmWrapper: '0x0000000000000000000000000000000000000000',
        l2SaddleSwap: '0x0000000000000000000000000000000000000000',
        l2SaddleLpToken: '0x0000000000000000000000000000000000000000',
        bridgeDeployedBlockNumber: 1245791
      }
    }
  }
}
