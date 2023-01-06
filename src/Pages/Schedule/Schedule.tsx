import classes from "./Schedule.module.css";
import { InlineWidget } from "react-calendly";
import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";

const Schedule = () => {
  const footerProps = { backgroundColor: "#f5f0ea" };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <InlineWidget url="https://calendly.com/minorityprogrammers/BluntDAO" />
      </div>
      <Footer {...footerProps} />
    </>
  );
};

export default Schedule;
