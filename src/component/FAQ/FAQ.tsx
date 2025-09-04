import React, { useState } from "react";
import NewsLetter from "../NewsLetter/NewsLetter";
import classes from "./FAQ.module.css";
import FQACard from "./FAQCard";
import Media from "../Media/Media";
import useAnalyticsEventTracker from "../../utils/useAnalyticsEventTracker";

const FQA = () => {
  const [state, setState] = useState({
    dropdown: "",
  });
  const { dropdown } = state;

  const gaEventTracker = useAnalyticsEventTracker("Join Discord");

  const handleSetState = (payload: any) => {
    setState((states) => ({ ...states, ...payload }));
  };

  const FAQS = [
    {
      id: 1,
      question: "How do I join the BluntDAO?",
      answer:
        "You join the BluntDAO by officially sesh'ing with DAO member via Proof of Sesh (IRL SESH) We are building a dApp for Proof of Sesh (Coming soon)",
    },

    {
      id: 2,
      question: "Where do you have BluntDAO Chapters & Members?",
      answer:
        "Active chapters everywhere. Tune into sesh.day for the 420 Celebration",
    },
    
    {
      id: 3,
      question: "What blockchain is BluntDAO on?",
      answer:
        "The BluntDAO is initally on the Solana blockchain with sesh mints across multiple blockchains and plans to port governance tokens onto multiple blockchains. There is now a set of 420 OG Validators on NEAR protocol. POAPs on Gnosis, Soulbound Seshes on EVM chains supported by GenaDrop, and NFT based DAOs on Solana (SQDS), NEAR (AstroDAO), and Polygon (SNAPSHOT).",
    },
    // {
    //     question: "When is the mint date?",
    //     answer: ['The mint is live on ', <a href="www.bluntdao.com">bluntdao.com</a>, " right now"]
    // },
    {
      id: 4,
      question: "How many BluntNFTs are part of the first mint?",
      answer:
        "420 Blunts are part of OG mint on Solana. We have a series of POAPs, events, and 1 of 1s that have been minted to Solana, Polygon, & NEAR. We also have a set of 420 OG Validators on NEAR. The plan is 420 SESH Validators on every blockchain ever.",
    },

    {
      id: 4,
      question: "What is the difference between Sesh Fund Treasury + NFT and the OG Validators",
      answer:
        "Our IRL onboarding and OG validators NFTs come from ONLY onboarding via IRL. However to pay and scale for the Sesh we have launched a regular noun-ish (NounsDAO inspired) auction that goes towards a treasurey run by blunts.wtf minters. This is to allow anyone to increase the Sesh. OGs still need to vlaidate IRL.",
    },
    {
      id: 5,
      question: "How do I vote in the BluntDAO?",
      answer: (
        <p> 
        <a
          href="https://bluntdao.org/dao-sol"
          target="_blank"
          rel="noreferrer"
        >
          Vote with YOUR SOLANA OG NFT   - 
         </a>
        <a
          href="https://bluntdao.org/dao-near/"
          target="_blank"
          rel="noreferrer"
        >
           - or with YOUR NEAR OG NFT 
        </a>
        <a
          href="https://bluntdao.org/snapshot"
          target="_blank"
          rel="noreferrer"
        >
          -   or with your POAP (Polygon)
        </a>
        </p>
      ),
    },
    {
      id: 6,
      question: "What if I can’t smoke blunts?",
      answer:
        "We will make special exempt cases for those who have medical conditions like asthma, but who compensate through other means like joints or edibles and have been verified through a “Proof of Sesh” by OG DAO members. Solely a substitute substance will not qualify for a NFT/DAO membership, and considerable value must be added to the DAO for this new member to qualify UPDATE: post-Eth Denver 2023 (click the DAO Denver button on the media section to see announcement) we have opened up onboarding to all IRL Seshes.",
    },
    {
      id: 7,
      question: "Where can I find a links about BluntDAO?",
      answer: (
        <a href="https://bluntdao.org/links" target="_blank" rel="noreferrer">
          BluntDAO Links
        </a>
      ),
    },
    {
      id: 8,
      question:
        "I still have a question not answered in this FAQ, how can I find out?",
      answer:
        "Head over to the ❓-support channel on Discord. We will make sure to address any additional questions you may have as soon as possible!",
    },
  ];

  return (
    <div className={classes.container}>
      <Media />
      <div className={`${classes.section}`}>
        <div className={classes.heading}>Frequently Asked Questions</div>
        {/* <div className={classes.subHeading}>
          Browse through most questions raise by users
        </div> */}
        <div className={`${classes.FQAs} section`}>
          {FAQS.map((FAQ, index) => (
            <FQACard
              key={FAQ.id}
              FAQ={FAQ}
              id={index}
              dropdown={dropdown}
              handleSetState={handleSetState}
            />
          ))}
        </div>
        <NewsLetter />

        <div className={`${classes.joinDiscord} section`}>
          <div className={classes.head1}>
            Want to Join the IRL movement onboarding the next million users to
            Web3?
          </div>
          <div className={classes.head2}>Join our Discord Server</div>
          <a
            href="https://discord.com/invite/e3cGSTzyWp"
            target="_blank"
            rel="noreferrer"
            onClick={() => gaEventTracker("click", "join-discord")}
          >
            {" "}
            <div className={classes.discord}>Join Discord</div>{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FQA;
