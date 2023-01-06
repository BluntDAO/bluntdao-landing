import genActionTypes from "./gen.types";
export const setConnector = (connector) => ({
  type: genActionTypes.SET_CONNECTOR,
  payload: connector,
});
export const setProvider = (connector) => ({
  type: genActionTypes.SET_PROVIDER,
  payload: connector,
});

export const setChainId = (chainId) => ({
  type: genActionTypes.SET_CHAIN_ID,
  payload: chainId,
});

export const setProposedChain = (chain) => ({
  type: genActionTypes.SET_PROPOSED_CHAIN,
  payload: chain,
});

export const setAccount = (account) => ({
  type: genActionTypes.SET_ACCOUNT,
  payload: account,
});

export const setNotification = (notification) => ({
  type: genActionTypes.SET_NOTIFICATION,
  payload: notification,
});

export const setSwitchWalletNotification = (notification) => ({
  type: genActionTypes.SET_SWITCH_WALLET_NOTIFICATION,
  payload: notification,
});

export const setClipboard = (message) => ({
  type: genActionTypes.SET_CLIPBOARD,
  payload: message,
});
export const setMainnet = (mainnet) => ({
  type: genActionTypes.SET_MAINNET,
  payload: mainnet,
});
export const setToggleWalletPopup = (state) => ({
  type: genActionTypes.TOGGLE_WALLET_POPUP,
  payload: state,
});
export const setWeb3auth = (connector) => ({
  type: genActionTypes.SET_WEB3AUTH,
  payload: connector,
});
export const setNFTs = (NFTs) => ({
  type: genActionTypes.SET_NFTS,
  payload: NFTs,
});
