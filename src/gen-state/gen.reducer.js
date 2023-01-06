import genActionTypes from "./gen.types";

export const INITIAL_STATE = {
  chainId: "",
  proposedChain: null,
  account: "",
  connector: null,
  provider: null,
  web3auth: null,
  notification: {
    message: "",
    type: "", // warning, error, success, default
  },
  switchWalletNotification: false,
  clipboardMessage: "",
  mainnet: false,
  toggleWalletPopup: false,
  NFTs: [],
};

export const genReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case genActionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case genActionTypes.SET_CHAIN_ID:
      return {
        ...state,
        chainId: action.payload,
      };

    case genActionTypes.SET_PROPOSED_CHAIN:
      return {
        ...state,
        proposedChain: action.payload,
      };
    case genActionTypes.SET_CONNECTOR:
      return {
        ...state,
        connector: action.payload,
      };
    case genActionTypes.SET_PROVIDER:
      return {
        ...state,
        provider: action.payload,
      };
    case genActionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case genActionTypes.SET_SWITCH_WALLET_NOTIFICATION:
      return {
        ...state,
        switchWalletNotification: action.payload,
      };
    case genActionTypes.SET_CLIPBOARD:
      return {
        ...state,
        clipboardMessage: action.payload,
      };
    case genActionTypes.TOGGLE_WALLET_POPUP:
      return {
        ...state,
        toggleWalletPopup: action.payload,
      };
    case genActionTypes.SET_MAINNET:
      return {
        ...state,
        mainnet: action.payload,
      };
    case genActionTypes.SET_WEB3AUTH:
      return {
        ...state,
        web3auth: action.payload,
      };
    case genActionTypes.SET_NFTS:
      return {
        ...state,
        NFTs: action.payload,
      };

    default:
      return state;
  }
};
