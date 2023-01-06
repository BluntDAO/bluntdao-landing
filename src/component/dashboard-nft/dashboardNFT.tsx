import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import style from "./dashboardNFT.module.css";
import { ReactComponent as NFT } from "../../assets//imgs/dashboard/image.svg";
import ReactPaginate from "react-paginate";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { breakAddress } from "../wallet/updatedWallet-script";
import { GenContext } from "../../gen-state/gen.context";
import { setNFTs } from "../../gen-state/gen.actions";
import { getSingleNfts } from "./dashboardNFT-script";

const DashboardNFT = () => {
  const history = useHistory();
  // Pagination
  const [validatorNFTs, setValidatorNFTs] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(0);

  const { NFTs, dispatch } = useContext(GenContext);

  const perPage = 8;
  const pageVisited = pageNumber * perPage;

  const PageCount = (gameList: any) => {
    return Math.ceil(gameList?.length / perPage);
  };

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    (async function getNFTs() {
      const connection = new Connection("https://rpc.ankr.com/solana");
      const wallet = Keypair.generate();

      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(wallet))
        .use(bundlrStorage());

      if (NFTs?.length > 0) return setValidatorNFTs(NFTs);
      const mint = new PublicKey(
        "FmBMdM2DFrhhiBtvCD7Vx35JWbQnAxdYqVjWUd1sMYow"
      );
      const nfts = await metaplex.nfts().findAllByCreator(mint).run();
      console.log(nfts);

      const loadedNFTs = await getSingleNfts({
        dispatch,
        setNFTs,
        singleNfts: nfts,
      });
      setValidatorNFTs(loadedNFTs);
    })();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <p>
          <NFT /> Validator NFTs
        </p>
      </div>
      <div className={style.cardHolders}>
        {validatorNFTs.slice(pageVisited, pageVisited + perPage).map((elm) => (
          <div key={elm.id} className={style.card}>
            <div className={style.content}>
              <img src={elm.image} alt="" />
              {elm.chain}
              <div className={style.address}>
                <div style={{ background: elm.addressIcon }} />
                <p>{breakAddress(elm.address.toString(), 4)}</p>
              </div>
            </div>
            <div className={style.title}>{elm.title}</div>
            <div className={style.line}></div>
            <div
              onClick={() =>
                history.push(`/dashboard/nft/${elm.mintAddress}`, {
                  data: JSON.stringify(elm),
                })
              }
              className={style.viewBtn}
            >
              View NFT
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={PageCount(validatorNFTs)}
        onPageChange={changePage}
        containerClassName="pagination"
        previousLinkClassName="page-prev"
        nextLinkClassName="page-next"
        disabledClassName="pagination-disabled"
        activeClassName="active-page"
        pageLinkClassName="page-number"
      />
    </div>
  );
};

export default DashboardNFT;
