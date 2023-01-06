import { ReactComponent as SolanaIcon } from "../../assets/imgs/icon-solana.svg";
import axios from "axios";

export function fetchNFT(NFT: any, idx: Number) {
  const fetch = async (resolve: any, reject: any) => {
    try {
      const data = await axios(NFT.uri);
      const nftData = data.data;

      const nftObj = {
        id: idx,
        title: "",
        address: "",
        addressIcon: generateGrad(),
        image: "",
        description: "",
        attributes: [],
        properties: {},
        creators: [],
        mintAddress: "",
        metadataAddress: "",
        mintDate: "Jan, 12 2022",
        symbol: "",
        link: "",
        chain: <SolanaIcon />,
      };
      nftObj.title = nftData.name;
      nftObj.description = nftData.description;
      nftObj.image = nftData.image;
      nftObj.attributes = nftData.attributes;
      nftObj.properties = nftData.properties;
      nftObj.symbol = nftData.symbol;
      nftObj.creators = NFT.creators;
      nftObj.address = NFT.address;
      nftObj.mintAddress = NFT.mintAddress.toString();
      nftObj.metadataAddress = NFT.metadataAddress.toString();
      nftObj.link = `https://bluntdao.holaplex.market/nfts/${NFT.metadataAddress.toString()}`;

      resolve(nftObj);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  };
  return new Promise((resolve, reject) => {
    fetch(resolve, reject);
  });
}

export const getSingleNfts = async (props: any) => {
  const { dispatch, setNFTs, singleNfts } = props;
  const responses = await Promise.allSettled(
    singleNfts.map((NFT: any, idx: Number) => fetchNFT(NFT, idx))
  );
  const nftArr: any = [];
  // removing rejected responses
  const nftsObj: any = {
    red: null,
    green: null,
    blue: null,
  };
  responses.forEach((element) => {
    if (element?.status === "fulfilled") {
      nftArr.push(element.value);

      nftsObj[element.value.id] = element.value;
    }
  });
  dispatch(setNFTs(nftArr));
  return nftArr;
};

let hexString = "0123456789abcdef";
export const generateGrad = () => {
  const colorOne = randomColor();
  const colorTwo = randomColor();
  const angle = Math.floor(Math.random() * 360);
  const outputColor = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  return outputColor;
};
let randomColor = () => {
  let hexCode = "#";
  let i;
  for (i = 0; i < 6; i++) {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  }
  return hexCode;
};

export async function fetchSingle(NFT: any) {
  try {
    const nftObj = {
      title: "",
      address: "",
      addressIcon: generateGrad(),
      image: "",
      description: "",
      attributes: [],
      properties: {},
      creators: [],
      mintAddress: "",
      metadataAddress: "",
      mintDate: "Jan, 12 2022",
      symbol: "",
      link: "",
      chain: <SolanaIcon />,
    };
    nftObj.title = NFT.name;
    nftObj.description = NFT.json.description;
    nftObj.image = NFT.json.image;
    nftObj.attributes = NFT.json.attributes;
    nftObj.properties = NFT.json.properties;
    nftObj.symbol = NFT.symbol;
    nftObj.creators = NFT.creators;
    nftObj.address = NFT.address;
    nftObj.mintAddress = NFT.mintAddress.toString();
    nftObj.metadataAddress = NFT.metadataAddress.toString();
    nftObj.link = `https://bluntdao.holaplex.market/nfts/${NFT.metadataAddress.toString()}`;
    return nftObj;
  } catch (err) {
    console.log(err);
  }
}
