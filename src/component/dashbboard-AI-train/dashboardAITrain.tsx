import React from "react";
import style from "./dashboardAITrain.module.css";
import { ReactComponent as TrainAI } from "../../assets/imgs/dashboard/train-ai.svg";

const DashboardAITrain = (props: any) => {
  const { handleSetState } = props;
  return (
    <div className={style.container}>
      <div className={style.header}>
        <p> Welcome to Train A.I</p>
        <div>
          You can earn for training our A.I models too and help make Blunt
          detection fraud proof Let’s get the A.I working and onboard people IRL
        </div>
      </div>
      <div className={style.wrapper}>
        <div className={style.grid}>
          <div>
            <div className={style.title}>Train Our A.I Model</div>
            <div className={style.descriptpion}>
              Train our Blunt detection models and earn $BLUNT tokens. You will
              be presented a series of images from our Machine learning model
              and asked to correctly classify the image.
            </div>
          </div>
          <TrainAI />
        </div>
        <div className={style.line}></div>
        <div
          onClick={() => handleSetState({ questionsStatus: true })}
          className={style.btn}
        >
          Start Task
        </div>
      </div>
    </div>
  );
};

export default DashboardAITrain;
