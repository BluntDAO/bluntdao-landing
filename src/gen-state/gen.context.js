import React, { useReducer, createContext } from "react";
import { genReducer, INITIAL_STATE } from "./gen.reducer";

export const GenContext = createContext();

const GenContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(genReducer, INITIAL_STATE);

  const {
    connector,
    provider,
    chainId,
    proposedChain,
    account,
    notification,
    switchWalletNotification,
    clipboardMessage,
    mainnet,
    toggleWalletPopup,
    web3auth,
    NFTs,
  } = state;

  return (
    <GenContext.Provider
      value={{
        connector,
        provider,
        chainId,
        proposedChain,
        account,
        notification,
        switchWalletNotification,
        clipboardMessage,
        mainnet,
        toggleWalletPopup,
        web3auth,
        NFTs,
        prompt,
        dispatch,
      }}
    >
      {children}
    </GenContext.Provider>
  );
};

export default GenContextProvider;
