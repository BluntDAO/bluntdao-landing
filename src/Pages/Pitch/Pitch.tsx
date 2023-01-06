import { useState } from "react";
import classes from "./Pitch.module.css";
import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";
import SignIn from "../../component/sign-in/signIn.jsx";

const Pitch = () => {
  const footerProps = { backgroundColor: "#000000" };
  const [toggle, setToggle] = useState(true);

  return toggle ? (
    <SignIn setToggle={setToggle} />
  ) : (
    <>
      <Navbar />
      <div className={classes.container}>
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vRR9pXSeJu9huK6zkRY6x18wK6CGgZ78C9rFJf7Z4X0P4-Z1PiFPaxh24L-eBRgVE3jq3zvsiNnxVJJ/embed?start=false&loop=false&delayms=3000"
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

export default Pitch;
