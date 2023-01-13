import { useEffect, useContext } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";
// pages
import Home from "./Pages/Home";
import Docs from "./Pages/Docs/Docs";
import PartnerForm from "./Pages/PartnerForm/PartnerForm";
import Pitch from "./Pages/Pitch/Pitch";
import Tokenomics from "./Pages/Tokenomics/Tokenomics";
import Fallback from "./Pages/fallback/fallback";
import POS from "./Pages/POS/POS";
import DashboardOverview from "./Pages/Dashboard/DashboardOverview";
import DashboardNFTpage from "./Pages/Dashboard/DashboardNFTpage";
import DashboardFeedsPage from "./Pages/Dashboard/DashboardFeedsPage";
import DashboardSettingsPage from "./Pages/Dashboard/DashboardSettingsPage";
import DashbaordMembersPage from "./Pages/Dashboard/DashbaordMembersPage";
import DashboardNFTSingle from "./Pages/Dashboard/DashboardNFTSingle";
import DashboardTrainAI from "./Pages/Dashboard/DashboardTrainAI";
import Links from "./Pages/Links/Links";
import Schedule from "./Pages/Schedule/Schedule";
import RPOS from "./Pages/RPOS/RPOS";
// styles
import "./App.css";
import "./styles/Slider.scss";
import "./styles/Fonts.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// web 3 auth
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { GenContext } from "./gen-state/gen.context";
import { setWeb3auth, setProvider } from "./gen-state/gen.actions";
// Utils
import Notification from "./component/Notification/Notification";

const TRACKING_ID = "UA-203278283-2"; // OUR_TRACKING_ID
const clientId = process.env.REACT_APP_VERCEL_ENV_WEB3AUTH_CLIENT_ID;

const App = () => {
  const { dispatch } = useContext(GenContext);

  // Google Analytics
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window?.location.pathname + window?.location.search);
  }, []);

  // Web3auth
  useEffect(() => {
    const init = async () => {
      try {
        if (!clientId) {
          throw Error("Client ID is undefined");
        }
        const web3auth = new Web3Auth({
          clientId,
          // type uiConfig
          uiConfig: {
            appLogo: "/img/logo-web3auth.png",
            theme: "dark",
            loginMethodsOrder: ["facebook", "google", "twitter", "github"],
          },
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.SOLANA,
            chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
            rpcTarget: "https://rpc.ankr.com/solana", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network:
              process.env.NODE_ENV === "development" ? "testnet" : "mainnet", // "testnet", "mainnet" or "cyan"
            clientId,
            // type WhiteLabelData
            whiteLabel: {
              name: "bluntDAO",
              dark: true, // true or false
              theme: { primary: "#d70411" },
              defaultLanguage: "de",
            },
          },
        });

        web3auth.configureAdapter(openloginAdapter);

        // const torusWalletAdapter = new TorusWalletAdapter({
        //   initParams: {
        //     // type WhiteLabelParams
        //     whiteLabel: {
        //       theme: {
        //         isDark: true,
        //         colors: { torusBrand1: "#FFA500" },
        //       },
        //       logoDark: "https://images.web3auth.io/web3auth-logo-w.svg",
        //       logoLight: "https://images.web3auth.io/web3auth-logo-w-light.svg",
        //       topupHide: true,
        //       featuredBillboardHide: true,
        //       disclaimerHide: true,
        //       defaultLanguage: "en",
        //     },
        //   },
        // });

        // web3auth.configureAdapter(torusWalletAdapter);
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              // setting it to false will hide all social login methods from modal.
              showOnModal: true,
            },
            [WALLET_ADAPTERS.TORUS_SOLANA]: {
              label: "openlogin",
              // setting it to false will hide all social login methods from modal.
              showOnModal: false,
            },
          },
        });

        dispatch(setWeb3auth(web3auth));
        console.log(web3auth.provider);

        if (web3auth.provider) {
          dispatch(setProvider(web3auth.provider));
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/pitch" component={Pitch} />
          <Route exact path="/tokenomics" component={Tokenomics} />
          <Route exact path="/partner" component={PartnerForm} />
          <Route exact path="/docs" component={Docs} />
          <Route exact path="/pos" component={POS} />
          <Route exact path="/rpos" component={RPOS} />
          {/* dashboard */}
          <Route
            exact
            path="/dashboard/overview"
            component={DashboardOverview}
          />
          <Route exact path="/dashboard/nft" component={DashboardNFTpage} />
          <Route
            exact
            path="/dashboard/nft/:id"
            component={DashboardNFTSingle}
          />
          <Route exact path="/dashboard/feed" component={DashboardFeedsPage} />
          <Route
            exact
            path="/dashboard/settings"
            component={DashboardSettingsPage}
          />
          <Route
            exact
            path="/dashboard/members"
            component={DashbaordMembersPage}
          />
          <Route
            exact
            path="/dashboard/train-ai"
            component={DashboardTrainAI}
          />
          <Route exact path="/links" component={Links} />
          <Route exact path="/schedule" component={Schedule} />
          <Route
            exact
            path="/market"
            component={() => {
              window.location.replace("https://bluntdao.holaplex.market/");
              return null;
            }}
          ></Route>
          <Route
            exact
            path="/hack"
            component={() => {
              window.location.replace("https://cannabis.devpost.com/");
              return null;
            }}
          ></Route>
          <Route
            exact
            path="/discord"
            component={() => {
              window.location.replace("https://discord.com/invite/e3cGSTzyWp");
              return null;
            }}
          ></Route>
          <Route exact path="/" component={Home} />
          {/* <Route path="/tickets" component={Tickets} /> */}
          {/* <Route exact path="/calendar" component={Calendar} /> */}
          <Route component={Fallback} />
        </Switch>
      </div>
      <Notification />
    </BrowserRouter>
  );
};

export default App;
