import classes from "./PartnerForm.module.css";
import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";

const PartnerForm = () => {
  const footerProps = { backgroundColor: "#f5f0ea" };
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdLGri0msHlYp9DONdW5AaNKlMS02d2KfZjitHUElg5BEBb3Q/viewform?embedded=true"
          width="100%"
          // height="70vh"
          frameBorder="0"
          title="form"
          className={classes.form}
        >
          Loading…
        </iframe>
      </div>
      <Footer {...footerProps} />
    </>
  );
};

export default PartnerForm;
