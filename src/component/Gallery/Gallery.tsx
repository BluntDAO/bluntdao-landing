import style from "./gallery.module.css";
import CardSlider from "./CardSlider";

const Gallery = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={`${style.sliderSection} slider-section`}>
          <div className={style.header}>BluntDAO Gallery</div>
          <div className={style.subheader}>
            This section contains the the master list of all the NFT drops that
            have been minted or we got too high to mint.
          </div>

          <div className={style.itemContainer}>
            <CardSlider />
          </div>
        </div>
      </div>
      <div className={style.separateRough}></div>
    </div>
  );
};

export default Gallery;
