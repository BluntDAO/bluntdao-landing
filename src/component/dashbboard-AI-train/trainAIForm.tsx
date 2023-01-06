import React, { useState } from "react";
import style from "./trainAIForm.module.css";
import { ReactComponent as TickMark } from "../../assets/imgs/tick​MarkIcon.svg";

const TrainAIForm = () => {
  const [state, setState] = useState({
    selectedType: "",
  });
  const { selectedType } = state;
  const handleSetState = (payload: any) => {
    setState((state) => ({ ...state, ...payload }));
  };
  const options = ["Blunt", "Joint", "Spliff", "Cigar"];
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <p>
            <span>Daily:</span> Sticks Categorization
          </p>
          <div>
            02/50
            <div className={style.progressWrapper}>
              <div className={style.progressPrg}></div>
            </div>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.label}>Please classify the following image</div>
          <img src="/img/dashboard-imgs/Blunts.png" alt="" />
          <div className={style.grid}>
            {options.map((option) => (
              <div
                onClick={() => handleSetState({ selectedType: option })}
                className={option === selectedType ? style.active : ""}
              >
                {option} <TickMark />
              </div>
            ))}
          </div>
          <textarea
            className={style.textArea}
            placeholder="Others(Please Specify)"
            cols={30}
            rows={5}
          ></textarea>
          <div className={style.btnWrapper}>
            <div>Back</div>
            <p>Continue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainAIForm;
