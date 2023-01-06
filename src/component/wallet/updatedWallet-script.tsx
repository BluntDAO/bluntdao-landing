import { setAccount } from "../../gen-state/gen.actions";
import RPC from "../../solanaRPC";

export const login = async (props: any) => {
  const { web3auth, dispatch, setProvider, setAccount } = props;
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const web3authProvider = await web3auth.connect();

  dispatch(setProvider(web3authProvider));
  console.log("wallet connected");
  await getAccounts({
    dispatch,
    provider: web3authProvider,
    setAccount,
  });
};

export const getUserInfo = async (props: any) => {
  const { web3auth } = props;
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const user = await web3auth.getUserInfo();
  console.log(user);
  return user;
};

export const logout = async (props: any) => {
  const { web3auth, dispatch, setProvider } = props;
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  dispatch(setProvider(null));
  dispatch(setAccount(null));
};

export const getAccounts = async (props: any) => {
  const { provider, dispatch, setAccount } = props;
  console.log("test");

  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  dispatch(setAccount(address[0]));
  console.log(address);
  return address;
};

export const getBalance = async (props: any) => {
  const { provider } = props;
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const balance = await rpc.getBalance();
  console.log(balance);
  return balance;
};

export const sendTransaction = async (props: any) => {
  const { provider } = props;
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const receipt = await rpc.sendTransaction();
  console.log(receipt);
  return receipt;
};

export const signMessage = async (props: any) => {
  const { provider } = props;
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const signedMessage = await rpc.signMessage();
  console.log(signedMessage);
  return signedMessage;
};

export const getPrivateKey = async (props: any) => {
  const { provider } = props;
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const privateKey = await rpc.getPrivateKey();
  console.log(privateKey);
  return privateKey;
};
export const breakAddress = (address = "", width = 6) => {
  if (address) return `${address?.slice(0, width)}...${address?.slice(-width)}`;
};


export const setNetwork = (web3auth: any, network: string) => {
  if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
  if (network == "mainnet") {
    web3auth.options.chainConfig.chainId = "0x1"; 
  } else if (network == "testnet") {
    web3auth.options.chainConfig.chainId = "0x2"; 
  }
  console.log(`Switched to ${network} at ${web3auth.options.chainConfig.chainId}`)
}

// export const getChainId = async (props: any) => {
//   const { provider } = props;
//   if (!provider) {
//     console.log("provider not initialized yet");
//     return;
//   }
//   const rpc = new RPC(provider);
//   const chainId = await rpc.getChainId();
//   console.log(chainId);
// };
