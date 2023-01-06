import style from "./Medium.module.css";
import MediumSlider from "./MediumSlider";

const Medium = () => {
  return (
    <div className={`${style.container} reviews-section`}>
      <div className="section">
        <div className={style.header}>BluntBlog</div>
        <div className={style.subheader}>
          Catch up with the latest news for BluntDAO
        </div>
        <MediumSlider />
      </div>
      <div className={style.separateRough}></div>
    </div>
  );
};

export default Medium;
