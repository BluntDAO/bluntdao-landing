// import React from "react";
// import Footer from "../../component/Footer/Footer";
// import { useMemo } from "react";
// import {
//   getPhantomWallet,
//   getSolflareWallet,
//   getSolletWallet,
//   getMathWallet,
// } from "@solana/wallet-adapter-wallets";
// import { clusterApiUrl } from "@solana/web3.js";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { ThemeProvider, createTheme } from "@material-ui/core";
// import * as anchor from "@project-serum/anchor";
// import Home from "../../Minter";
// import style from "./Tickets.module.css";

// const Tickets = () => {
//   const theme = createTheme({
//     palette: {
//       type: "dark",
//     },
//   });
//   const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
//     ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
//     : undefined;

//   const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

//   const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
//   const connection = new anchor.web3.Connection(rpcHost);

//   const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

//   const txTimeout = 30000; // milliseconds (confirm this works for your project)

//   const endpoint = useMemo(() => clusterApiUrl(network), []);

//   const wallets = useMemo(
//     () => [
//       getPhantomWallet(),
//       getSolflareWallet(),
//       getSolletWallet(),
//       getMathWallet(),
//     ],
//     []
//   );

//   const footerProps = { backgroundColor: "#f5f0ea" };
//   return (
//     <>
//       {/* <div className={style.container}>
//         <div className={`${style.section} section`}>
//           <img className={style.img1} src="/img/Blunt1.png" alt="" />

//           <div className={style.description}>
//             <div className={style.header}>
//               LA Solana Hacker <br /> House Blunt
//             </div>
//             <div className={style.content}>
//               BluntDAO Are 1/1 unique strain giving love to the world's greatest
//               blunt lovers... light up and join the fam! token holders are given
//               BluntNFTs so sesh’ing with current members.
//             </div>

//             <div className={style.connect}>
//               <div className={style.title}> 112 / 240 Minted</div>
//               <div className={style.subtitle}>1 BluntNFT cost 0.01 SOL</div>
//               <input
//                 className={style.input}
//                 type="text"
//                 placeholder="Enter NFT amount"
//               />

//               <ThemeProvider theme={theme}>
//                 <ConnectionProvider endpoint={endpoint}>
//                   <WalletProvider wallets={wallets} autoConnect>
//                     <WalletDialogProvider>
//                       <Home
//                         candyMachineId={candyMachineId}
//                         connection={connection}
//                         startDate={startDateSeed}
//                         txTimeout={txTimeout}
//                         rpcHost={rpcHost}
//                       />
//                     </WalletDialogProvider>
//                   </WalletProvider>
//                 </ConnectionProvider>
//               </ThemeProvider>
//               <div className={style.connectWallet}>CONNECT WALLET</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer {...footerProps} /> */}
//     </>
//   );
// };

// export default Tickets;
export {};
