import React from "react";
import style from "./Roadmap.module.css";
import cigar from "../../assets/imgs/roadmap-cigar.png";

const Roadmap = () => {
  return (
    <div className={`${style.container} ${style.roadmapContainer}`}>
      <div className={`${style.section} section`}>
        <div className={style.roadmap}>
          <div className={style.header}>Roadmap</div>
          <div className={style.subheader}>
            BluntDAO is on the road to onboarding the next million users via
            Proof of Sesh
          </div>
          <div className={style.roadmapItem}>
            <div className={style.m_heading}>Quarter 1</div>
            <div className={style.m_subheading}>
              THE ROAD TO THE FIRST 420 (January - March 2022)
            </div>
            <ul>
              <li className={style.done}>
                🍃 Formation During Miami Hack Week: Genesis Proof of Sesh
              </li>
              <li className={style.done}>🍃 FireLeaf Collab</li>
              <li className={style.done}>
                🍃 Launch of Discord , Twitter, Telegram
              </li>
              <li className={style.done}>
                🍃 SOLANA Los Angeles Hacker House LA Mint
              </li>
              <li className={style.done}>
                🍃 Events: NYC, Miami, LA Solana Hacker House, Eth Denver
              </li>
              <li className={style.done}>
                🍃 Start of Tokin’ Tuesday in Miami
              </li>
              <li>🍃 Shrimp Society NFT Airdrop</li>
              <li>🍃 ETH Denver Blunts (Unreleased)</li>
              <li>🍃 Begin Seshaverse - VR/ AR Blunt World</li>
              <li className={style.done}>
                🍃 BTC 2022 SESH w/ DROPOUT DAO, MPA, Liberland
              </li>
              <li className={style.done}>
                🍃 Start New York, Denver, LA, San Diego, Miami chapters
              </li>
            </ul>
          </div>

          <div className={style.roadmapItem2}>
            <div className={style.m_heading}>Quarter 2</div>
            <div className={style.m_subheading}>
              SOLANA X NEAR (April - June 2022)
            </div>
            <ul>
              <li className={style.done}>🍃 Daily Sesh Twitter Spaces</li>
              <li className={style.done}>🍃 Mock Up of Proof of Sesh v3</li>
              <li className={style.done}>🍃 Investors & Influencer Pitch Deck</li>
              <li className={style.done}>🍃 BluntDAO Dev Guild Formed</li>
              <li className={style.done}>🍃 Regular Medium Articles</li>
              <li className={style.done}>🍃 NFT DAO Integration through Squads</li>
              <li className={style.done}>🍃 One of First Major Use Case Proof of Sesh v2 with Satori Creator Studio on NEAR(420 validators)</li>
              <li className={style.done}>🍃 Beginning of Partnerships w/ Brands</li>
              <li className={style.done}>🍃 Events: Permissionless, Consensus, NFT NYC, xHacks</li>
              <li className={style.done}>🍃 Start of BluntDAO x NEAR Hacks Tour</li>
              <li>🍃 DAO Listings: Barracuda, DAOHQ, DAOLens, ListofDAOs</li>
              <li className={style.done}>🍃 Discord Verification integration (Solana + NEAR)</li>
              <li className={style.done}>🍃 Beginning of Soul Bound NFT Minter</li>
              <li className={style.done}>🍃 Start Austin, San Antonio, Brazil, Barcelona, Morocco, Lisbon, France, Berlin Chapters</li>
              <li className={style.done}>🍃 Holaplex Solana Marketplace</li>
              <li className={style.done}>🍃 Proof of Sesh w Genadrop</li>
              <li className={style.done}>🍃 BluntDAO on Instagram</li>
            </ul>
          </div>

          <div className={style.roadmapItem}>
            <div className={style.m_heading}>Quarter 3</div>
            <div className={style.m_subheading}>Fundraise + Proof of Sesh v3 (July - September 2022)</div>
            <ul>
              <li>🍃 Mint out 420 NFTs on NEAR; ASTRO DAO Integration</li>
              <li>🍃 Vendored Partnered Events in Miami x New York</li>
              <li>🍃 BluntDAO Event Passes on Solana</li>
              <li>🍃 3rd Blockchain: 420 OG Validators</li>
              <li className={style.done}>🍃 BluntDAO Goes to Europe (ETH CC, NEARCON)</li>
              <li className={style.done}>🍃 BluntDAO Goes to Africa</li>
              <li className={style.done}>🍃 BluntDAO Merch Store</li>
              <li>🍃 Call for Advisors</li>
              <li className={style.done}>🍃 BluntDAO Mailing List, LinkedIn</li>
              <li>
                🍃 Introduction of JointsDAO, SpliffDAO, subDAOs powered by
                Proof of Sesh
              </li>
              <li className={style.done}>
                🍃 Transition Website {"->"} Web App
              </li>
            </ul>
          </div>
          <div className={style.roadmapItem2}>
            <div className={style.m_heading}>Ounce 1</div>
            <div className={style.m_subheading}>
              BluntDAO Goes International / SubDAOs (October- December 2022)
            </div>
            <ul>
              <li className={style.done}>🍃 SpliffDAO Launches with SOAP on Solana at Breakpoint</li>
              <li>🍃 JointsDAO Launches in the U.S</li>
              <li>
                🍃 Search for the BluntDAO Strain (A Sativa that makes you
                onboard others into Web3)
              </li>
              <li>🍃 Branded Activations / Proof of Seshes</li>
              <li>
                🍃 Bluntcubator. Incubator for BluntDAO member projects
              </li>
            </ul>
          </div>
          <img className={style.backgroundImg} src={cigar} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
