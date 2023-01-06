import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import style from "./wallet.module.css";
import { GenContext } from "../../gen-state/gen.context";
import userIcon from "../../assets/imgs/icon-user.svg";
import switchIcon from "../../assets/imgs/icon-switch.svg";
import copyIcon from "../../assets/imgs/icon-copy.svg";
import { ReactComponent as ChevronDown } from "../../assets/imgs/angle-left-solid.svg";
import disconnectIcon from "../../assets/imgs/icon-disconnect.svg";
import WalletPopup from "../wallet-popup/walletPopup";
import supportedChains from "../../utils/supportedChains";
import {
  setNetworkType,
  connectWallet,
  getConnectedChain,
  breakAddress,
  disconnectWallet,
  connectWithQRCode,
  initializeConnection,
  initConnectWallet,
} from "./wallet-script";
import { setSwitchWalletNotification } from "../../gen-state/gen.actions";

function ConnectWallet() {
  const history = useHistory();
  const { pathname } = useLocation();
  const clipboardRef = useRef();
  const walletProviderRef = useRef(0);
  const {
    dispatch,
    account,
    chainId,
    proposedChain,
    mainnet,
    toggleWalletPopup,
  } = useContext(GenContext);

  const [state, setState] = useState({
    toggleDropdown: false,
    clipboardState: "Copy Address",
    network: null,
    walletConnectProvider: null,
    connectionMethod: null,
    isMetamask: true,
    overrideWalletConnect: false,
    test: false,
    rpc: {
      80001: "https://rpc-mumbai.matic.today",
    },
  });

  const {
    toggleDropdown,
    clipboardState,
    network,
    walletConnectProvider,
    overrideWalletConnect,
    connectionMethod,
    rpc,
    isMetamask,
    test,
  } = state;

  const handleSetState = (payload) => {
    setState((state) => ({ ...state, ...payload }));
  };

  const walletProps = {
    dispatch,
    supportedChains,
    proposedChain,
    mainnet,
    chainId,
    walletConnectProvider,
    connectionMethod,
    walletProviderRef,
    rpc,
    history,
    pathname,
    handleSetState,
  };

  const handleCopy = (props) => {
    const { navigator, clipboard } = props;
    clipboard.select();
    clipboard.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(clipboard.value);
    handleSetState({ clipboardState: "Copied" });
    setTimeout(() => {
      handleSetState({ clipboardState: "Copy Address" });
    }, 850);
  };

  const handleDisconnet = () => {
    disconnectWallet(walletProps);
  };

  const handleNetworkClick = () => {
    dispatch(setSwitchWalletNotification(true));
  };

  useEffect(() => {
    setNetworkType(walletProps);
  }, [chainId]);

  useEffect(() => {
    const isSupported = Object.keys(supportedChains).includes(
      String(proposedChain)
    );
    if (!isSupported) return;
    connectWallet(walletProps);
  }, [proposedChain, connectionMethod]);

  useEffect(() => {
    if (walletProviderRef.current >= 2 || overrideWalletConnect) {
      handleSetState({ overrideWalletConnect: false });
      connectWithQRCode(walletProps);
    } else {
      walletProviderRef.current = +1;
    }
  }, [walletConnectProvider, overrideWalletConnect]);

  useEffect(() => {
    if (test) {
      initializeConnection(walletProps);
    }
  }, [rpc, walletProps.proposedChain]);
  const goToDashboard = (
    <div
      onClick={() => {
        history.push(`/me/${account}`);
      }}
      className={style.user}
    >
      <img src={userIcon} alt="" />
    </div>
  );

  const dropdown = (
    <div className={`${style.dropdown} ${toggleDropdown && style.active}`}>
      <div
        onClick={() => initConnectWallet(walletProps)}
        className={style.option}
      >
        <img src={switchIcon} alt="" />
        <div>Switch network</div>
      </div>
      <div
        onClick={() =>
          handleCopy({ navigator, clipboard: clipboardRef.current })
        }
        className={style.option}
      >
        <img src={copyIcon} alt="" />
        <div>{clipboardState}</div>
        <input
          style={{ display: "none" }}
          ref={clipboardRef}
          type="text"
          defaultValue={account}
        />
      </div>
      <div onClick={handleDisconnet} className={style.option}>
        <img src={disconnectIcon} alt="" />
        <div>Disconnect</div>
      </div>
    </div>
  );

  const connected = (
    <div
      onMouseLeave={() => handleSetState({ toggleDropdown: false })}
      onMouseOver={() => handleSetState({ toggleDropdown: true })}
      className={`${style.connected} ${toggleDropdown && style.active}`}
    >
      <img className={style.chain} src={getConnectedChain(chainId)} alt="" />
      <div className={style.address}>
        <span>{breakAddress(account)}</span>
      </div>
      {dropdown}
    </div>
  );

  const changeNetwork = (
    <div className={style.network}>
      <div className={style.dot} />{" "}
      <div className={style.activeNetwork}>
        {network === "mainnet" ? "Mainnet" : "Testnet"}
      </div>
      <ChevronDown />
      <div onClick={handleNetworkClick} className={style.networkDrop}>
        {network === "mainnet" ? "Switch to testnet" : "Switch to mainnet"}
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`${style.popupContainer} ${
          toggleWalletPopup && style.active
        }`}
      >
        <WalletPopup isMetamask={isMetamask} handleSetState={handleSetState} />
      </div>
      {account ? (
        <div className={style.container}>
          {connected}
          {changeNetwork}
          {/* {goToDashboard} */}
        </div>
      ) : (
        <div
          className={style.connect}
          onClick={() => {
            handleSetState({ test: true });
            initConnectWallet(walletProps);
          }}
        >
          Connect Wallet
        </div>
      )}
    </>
  );
}

export default ConnectWallet;
