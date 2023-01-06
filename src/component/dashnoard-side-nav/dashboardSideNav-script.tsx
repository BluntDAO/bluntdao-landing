import { ReactComponent as Feed } from "../../assets/imgs/dashboard/feed.svg";
import { ReactComponent as NFT } from "../../assets/imgs/dashboard/image.svg";
import { ReactComponent as Main } from "../../assets/imgs/dashboard/main.svg";
import { ReactComponent as Member } from "../../assets/imgs/dashboard/member.svg";
import { ReactComponent as Settings } from "../../assets/imgs/dashboard/settings.svg";
import { ReactComponent as TrainAI } from "../../assets/imgs/dashboard/train-ai.svg";

const data = [
  { title: "Dashboard", icon: <Main />, route: "overview" },
  { title: "NFT", icon: <NFT />, route: "nft" },
  { title: "Members", icon: <Member />, route: "members" },
  { title: "Feed", icon: <Feed />, route: "feed" },
  { title: "Train A.I", icon: <TrainAI />, route: "train-ai" },
  { title: "Settings", icon: <Settings />, route: "settings" },
];

export default data;
