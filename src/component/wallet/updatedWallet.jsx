import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
// Style
import style from "./wallet.module.css";
// Icons
import userIcon from "../../assets/imgs/icon-user.svg";
import copyIcon from "../../assets/imgs/icon-copy.svg";
import disconnectIcon from "../../assets/imgs/icon-disconnect.svg";
import { ReactComponent as ChevronDown } from "../../assets/imgs/angle-left-solid.svg";
import { ReactComponent as SolanaIcon } from "../../assets/imgs/icon-solana.svg";
// wallet script
import { breakAddress, login, logout, setNetwork } from "./updatedWallet-script";
import { GenContext } from "../../gen-state/gen.context";
import { setAccount, setProvider } from "../../gen-state/gen.actions";

function ConnectWallet() {
  const history = useHistory();
  const clipboardRef = useRef();
  const { dispatch, account, toggleWalletPopup, web3auth, provider } =
    useContext(GenContext);

  const [state, setState] = useState({
    toggleDropdown: false,
    clipboardState: "Copy Address",
    network: "mainnet",
    overrideWalletConnect: false,
    test: false,
  });

  const { toggleDropdown, clipboardState, network } = state;

  const handleSetState = (payload) => {
    setState((state) => ({ ...state, ...payload }));
  };

  const walletProps = {
    dispatch,
    web3auth,
    provider,
    setAccount,
    setProvider,
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
      <div onClick={() => logout(walletProps)} className={style.option}>
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
      <SolanaIcon className={style.chain} />
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
      <div className={style.networkDrop}>
        {network === "mainnet" 
        ? (<div onClick={() => {setNetwork(web3auth, "testnet"); handleSetState({ network: "testnet" })}}>Switch to testnet</div>) 
        : (<div onClick={() => {setNetwork(web3auth, "mainnet"); handleSetState({ network: "mainnet" })}}>Switch to mainnet</div>)}
      </div>
    </div>
  );

  return (
    <>
      <div className={`${style.popupContainer} `}></div>
      {account ? (
        <div className={style.container}>
          {connected}
          {changeNetwork}
          {/* {goToDashboard} */}
        </div>
      ) : (
        <div
          className={style.connect}
          onClick={async () => {
            handleSetState({ test: true });
            await login(walletProps);
          }}
        >
          Connect Wallet
        </div>
      )}
    </>
  );
}

export default ConnectWallet;
