import React, { useLayoutEffect, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "./fallback.module.css";
import notFound from "../../assets/imgs/404.svg";
import Navbar from "../../component/Navbar/Navbar";
import { ReactComponent as GobackArrow } from "../../assets/imgs/icon-goback-arrow.svg";
import { ReactComponent as HomeIcon } from "../../assets/imgs/icon-home.svg";
// web 3 auth
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { SolanaWallet } from "@web3auth/solana-provider";

const Fallback = () => {
  // const [changeImage, setChangeImage] = useState(homeWhite);
  const history = useHistory();

  useLayoutEffect(() => {
    const hideFooter = document.getElementById("hide-footer");
    if (hideFooter) {
      hideFooter.style.display = "none";
    }
  }, []);
  // useEffect(() => {
  //   (async function wallerInit() {
  //     const web3auth = new Web3Auth({
  //       clientId:
  //         "BILeYx2aOwNRH7_XK5vgcDQI4bgVsHgAK19d61LZWzTl8i-Cf55ub8il9Ki1aYugixhlJbmGXAo8xY4Qb1ChpGU", // get it from Web3Auth Dashboard
  //       chainConfig: {
  //         chainNamespace: CHAIN_NAMESPACES.SOLANA,
  //         chainId: "0x2", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
  //       },
  //     });
  //     await web3auth.initModal();

  //     const web3authProvider = await web3auth.connect();
  //     const solanaWallet = new SolanaWallet(web3authProvider); // web3auth.provider
  //     const user = await web3auth.getUserInfo();
  //     console.log(user);
  //   })();
  // }, []);
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes["not-found"]}>
          <img src={notFound} alt="" />
          <h1>Oh No! Page Not Found.</h1>
          <div className={classes.text}>
            <span>you have seemed to have lost your blunt</span>
          </div>
        </div>
        <div className={classes["button-container"]}>
          <div onClick={() => history.goBack()} className={classes["go-back"]}>
            <GobackArrow />
            Go Back
          </div>
          <div
            onFocus
            onBlur
            onClick={() => history.push("/")}
            className={classes.home}
          >
            <HomeIcon />
            Take Me Home
          </div>
        </div>
      </div>
    </>
  );
};

export default Fallback;
