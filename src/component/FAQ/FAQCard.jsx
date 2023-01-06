import React from "react";
import classes from "./FAQCard.module.css";
import openIcon from "../../assets/imgs/close-icon.svg";
import closeIcon from "../../assets/imgs/open-icon.svg";

const FQACard = ({
  dropdown,
  id,
  handleSetState,
  FAQ: { question, answer },
}) => {
  const handleDropdown = () => {
    if (String(id) === dropdown) return handleSetState({ dropdown: "" });
    handleSetState({ dropdown: String(id) });
  };

  return (
    <div className={classes.container} onClick={handleDropdown}>
      <div
        className={`${classes.question} ${
          dropdown === String(id) && classes.active
        }`}
      >
        <p className={classes.title}>{question}</p>
        <span>
          {dropdown === String(id) ? (
            <img src={closeIcon} alt="" />
          ) : (
            <img src={openIcon} alt="" />
          )}
        </span>
      </div>
      <div
        className={`${classes.answer} ${
          dropdown === String(id) && classes.active
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default FQACard;
