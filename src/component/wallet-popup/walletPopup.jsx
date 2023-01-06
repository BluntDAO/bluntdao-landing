import style from "./walletPopup.module.css";
import { ReactComponent as CloseIcon } from "../../assets/imgs/icon-close.svg";
import metamaskIcon from "../../assets/imgs/icon-metamask.svg";
import walletConnectIcon from "../../assets/imgs/icon-wallet-connect.svg";
import { useContext, useEffect, useState } from "react";
import { GenContext } from "../../gen-state/gen.context";
import {
  setProposedChain,
  setToggleWalletPopup,
} from "../../gen-state/gen.actions";
import supportedChains from "../../utils/supportedChains";

const WalletPopup = ({ handleSetState }) => {
  const { dispatch, mainnet, connectFromMint } = useContext(GenContext);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showConnectionMethods, setConnectionMethods] = useState(false);
  const [activeChain, setActiveChain] = useState(null);
  const [showMetamask, setMetamask] = useState(true);

  let connectOptions = [];
  for (let key in supportedChains) {
    if (key !== "4160") {
      connectOptions.push(supportedChains[key]);
    }
  }
  // connectOptions.unshift(supportedChains[4160]);
  const handleChain = (chainId, isComingSoon = undefined) => {
    if (isComingSoon) return;
    if (chainId === 4160) {
      setMetamask(false);
    } else {
      setMetamask(true);
    }
    setActiveChain(chainId);
    setConnectionMethods(true);
  };

  const handleProposedChain = async () => {
    dispatch(setProposedChain(activeChain));
    dispatch(setToggleWalletPopup(false));
    setConnectionMethods(false);
  };

  const handleMetamask = async () => {
    handleSetState({ connectionMethod: "metamask" });
    handleProposedChain();
  };

  const handleWalletConnect = async () => {
    handleSetState({ connectionMethod: "walletConnect" });
    handleProposedChain();
  };

  useEffect(() => {
    setShowMoreOptions(false);
    setConnectionMethods(false);
  }, []);

  useEffect(() => {
    if (!connectFromMint?.chainId) return;
    dispatch(setToggleWalletPopup(true));
    handleChain(connectFromMint.chainId, connectFromMint.isComingSoon);
  }, [connectFromMint]);

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.iconContainer}>
          <CloseIcon
            onClick={() => {
              dispatch(setToggleWalletPopup(false));
              setShowMoreOptions(false);
              setConnectionMethods(false);
            }}
            className={style.closeIcon}
          />
        </div>

        <div className={style.heading}>
          <h3>{showConnectionMethods ? "Connect Wallets" : "Link Wallets"}</h3>
          <p>
            {showConnectionMethods
              ? "Connect with one of our available wallet providers."
              : "Select any of our supported blockchain to connect your wallet."}{" "}
          </p>
        </div>

        <div className={style.wrapper}>
          <div
            className={`${style.chains} ${
              showConnectionMethods && style.active
            }`}
          >
            {connectOptions
              .filter((chain) => false === chain.isMainnet)
              .filter((_, idx) => showMoreOptions || idx <= 3)
              .map((chain, idx) => (
                <div
                  onClick={() => handleChain(chain.networkId, chain.comingSoon)}
                  key={idx}
                  className={`${style.chain} ${
                    chain.comingSoon && style.comingSoon
                  }`}
                >
                  <img src={chain.icon} alt="" />
                  <div className={style.name}>
                    <h4>
                      {chain.label}{" "}
                      {chain.comingSoon ? <span>Coming soon</span> : ""}
                    </h4>
                    <p className={style.action}>
                      connect to your {chain.name} wallet
                    </p>
                  </div>
                </div>
              ))}
            <div className={style.viewBtnContainer}>
              <div
                className={style.viewBtn}
                onClick={() => setShowMoreOptions(!showMoreOptions)}
              >
                View {showMoreOptions ? "less" : "more"} options
              </div>
            </div>
          </div>
          <div
            className={`${style.connectionMethods} ${
              showConnectionMethods && style.active
            }`}
          >
            <div
              onClick={handleMetamask}
              className={`${style.connectionMethod} ${style.metamask} ${
                showMetamask && style.active
              }`}
            >
              <img src={metamaskIcon} alt="" />
              <h3>MetaMask</h3>
              <p>Connect to you MetaMask Wallet</p>
            </div>
            <div
              onClick={handleWalletConnect}
              className={style.connectionMethod}
            >
              <img src={walletConnectIcon} alt="" />
              <h3>WalletConnect</h3>
              <p>Scan with WalletConnect to connect</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;
