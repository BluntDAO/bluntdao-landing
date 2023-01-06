import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import style from "./dashboardNftSingle.module.css";
// iconss
import { ReactComponent as GoBackICon } from "../../assets/imgs/icon-goback.svg";
import { ReactComponent as FullICon } from "../../assets/imgs/icon-full-screen.svg";
import { ReactComponent as ExportIcon } from "../../assets/imgs/icon-export.svg";
import { ReactComponent as CloseIcon } from "../../assets/imgs/icon-close-circle.svg";
// fetch Signle NFT
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  fetchSingle,
  generateGrad,
} from "../dashboard-nft/dashboardNFT-script";
import { breakAddress } from "../wallet/updatedWallet-script";

type LocationState = { data: string };

const NftSingle = () => {
  const [popupActive, setPopupActive] = useState(false);
  const [nftParam, setNftParam] = useState<any>({});
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    (async function getNFTdata() {
      // check whether NFT is passed
      if (location.state) {
        let { data } = location.state as LocationState;
        setNftParam(JSON.parse(data));
      } else {
        // if not fetch it using the mint address
        const connection = new Connection(
          "https://solana-api.projectserum.com"
        );
        const wallet = Keypair.generate();

        const metaplex = Metaplex.make(connection)
          .use(keypairIdentity(wallet))
          .use(bundlrStorage());

        const nft = await metaplex.nfts().findByMint(new PublicKey(id)).run();
        const nftData = await fetchSingle(nft);
        setNftParam(nftData);
      }
    })();
  }, [id, location.state]);

  return (
    <div className={style.container}>
      <div onClick={() => history.goBack()} className={style.goBack}>
        <GoBackICon />
        <p>Go Back</p>
      </div>
      <div className={style.grid}>
        <div className={style.nftImg}>
          <img
            style={{ backgroundImage: `url("${nftParam.image}")` }}
            src={nftParam.image}
            alt=""
          />
          <div
            onClick={() => setPopupActive(true)}
            className={style.viewFillsScreen}
          >
            <div className={style.viewBtn}>
              <FullICon /> <p>View Fullscreen </p>
            </div>
            <div className={style.viewHover}></div>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.title}>OG 420 Validator</div>
          <div className={style.bluntdao}>
            <img src="/img/Blunt2.png" alt="" />
            <p>BluntDAO</p>
          </div>
          <div className={style.label}>Created By</div>
          <div className={style.createdBy}>
            {nftParam.creators?.map((createAddress: any) => (
              <div className={style.address}>
                <div style={{ background: generateGrad() }} />
                <p>{breakAddress(createAddress.address.toString(), 4)}</p>
              </div>
            ))}
            <div className={style.mintDate}>
              <p>Minted on {nftParam.mintDate}</p>
              <a href={nftParam?.link} target="_blank" rel="noreferrer">
                <ExportIcon />
              </a>
            </div>
          </div>
          <div className={style.label}>Description</div>
          <div className={style.line}></div>
          <div className={style.description}>{nftParam?.description}</div>
          <div className={style.label}>Metadata</div>
          <div className={style.metaData}>
            {nftParam.attributes?.map((prop: any) => (
              <div>
                <div>{prop.trait_type}</div>
                <p>{prop?.value}</p>
              </div>
            ))}
          </div>
          <div
            className={`${style.popupContainer} ${
              popupActive ? style.active : ""
            }`}
          >
            <div className={style.wrapper}>
              <CloseIcon onClick={() => setPopupActive(false)} />
              <img src={nftParam?.image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftSingle;
