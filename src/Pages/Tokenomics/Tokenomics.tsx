import classes from "./Tokenomics.module.css";
import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";

const Tokenomics = () => {
  const footerProps = { backgroundColor: "#ffffff" };
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRZS4KSuGYpkpeqFgmtF4O0LYa4w31PtdeBL0baoKXYa5F49yEI32iO43u7xHKXY9GzLNg-zg0olcfR/pubhtml?widget=true&amp;headers=false"
          width="100%"
          // height="70vh"
          frameBorder="0"
          title="form"
          allowFullScreen={true}
          className={classes.form}
        >
          Loading…
        </iframe>
      </div>
      <Footer {...footerProps} />
    </>
  );
};

export default Tokenomics;
