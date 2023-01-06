import classes from "./docs.module.css";
import Navbar from "../../component/Navbar/Navbar";

const Docs = () => {
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <iframe
          title="docs"
          src="https://doc.clickup.com/30981999/d/xhfvf-20/bluntifesto"
          scrolling="yes"
        ></iframe>
      </div>
    </>
  );
};

export default Docs;
