const express = require("express");
import { providers } from "ethers";
const { Hop } = require("@hop-protocol/sdk");

const port = process.env.PORT || 8000;
const app = express();
const hop = new Hop("mainnet");

hop.setChainProviders({
  ethereum: new providers.StaticJsonRpcProvider(
    "https://eth-mainnet.alchemyapi.io/v2/imF7XWfmReAqqvyVafPOSJxDtY8U8_ZT"
  ),
  polygon: new providers.StaticJsonRpcProvider(
    "https://bold-winter-surf.matic.quiknode.pro/9c226c540f9c66f92f4ef21af6e3dfa257c91d68/"
  ),
  optimism: new providers.StaticJsonRpcProvider(
    "https://optimism-mainnet.infura.io/v3/029bfb981dc748b1affa9e77eb0e5477"
  ),
  arbitrum: new providers.StaticJsonRpcProvider(
    "https://arb-mainnet.g.alchemy.com/v2/imF7XWfmReAqqvyVafPOSJxDtY8U8_ZT"
  ),
});

app.get("/quote", async (req, res) => {
  const { amount, token, fromChain, toChain, slippage } = req.query;

  try {
    const bridge = hop.bridge(token);
    const amountBn = bridge.parseUnits(amount);
    const data = await bridge.getSendData(amountBn, fromChain, toChain);
    const { totalFee, amountOut, estimatedReceived } = data;
    const amountOutMin = bridge.calcAmountOutMin(amountOut, slippage);

    res.json({
      bonderFee: totalFee.toString(),
      amountOutMin: amountOutMin.toString(),
      estimatedRecieved: estimatedReceived.toString(),
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/status", async (req, res) => {
  const { token, transferId, transactionHash } = req.query;

  try {
    const bridge = hop.bridge(token);
    const status = await bridge.getTransferStatus(
      transferId || transactionHash
    );
    res.json(status);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/build-tx", async (req, res) => {
  const { token, amount, fromChain, toChain, recipient } = req.query;

  try {
    const bridge = hop.bridge(token);
    const amountBn = bridge.parseUnits(amount);
    const tx = await bridge.populateSendTx(amountBn, fromChain, toChain, {
      recipient,
    });
    res.json({
      tx,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/approval/check-allowance", async (req, res) => {
  const { token, amount, fromChain, account } = req.query;

  try {
    const bridge = hop.bridge(token);
    const amountBn = bridge.parseUnits(amount);
    const needsApproval = await bridge.needsApproval(
      amountBn,
      fromChain,
      account
    );
    res.json({
      needsApproval,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/approval/build-tx", async (req, res) => {
  const { token, amount, fromChain } = req.query;

  try {
    const bridge = hop.bridge(token);
    const amountBn = bridge.parseUnits(amount);
    const tx = await bridge.populateSendApprovalTx(amountBn, fromChain);
    res.json({
      tx,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
