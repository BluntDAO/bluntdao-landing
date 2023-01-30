import { useRef } from "react";
import style from "./stickSelect.module.css";
import ReactTooltip from "react-tooltip";
import { ReactComponent as CloseIcon } from "../../assets/imgs/icon-close.svg";
import { ReactComponent as TooltipIcon } from "../../assets/imgs/icon-tooltip.svg";
import data from "./stickSelect-script";

const StickSelect = ({ handleSetState, typeSelect, toggleUpdate }) => {
  const cardRef = useRef();

  return (
    <div
      className={`${style.selectContainer} ${
        typeSelect.toggle && style.active
      }`}
    >
      <div className={style.container}>
        <div className={style.card} ref={cardRef}>
          <div className={style.iconContainer}>
            <CloseIcon
              onClick={() => {
                toggleUpdate();
              }}
              className={style.closeIcon}
            />
          </div>

          <div className={style.heading}>
            <h3>A smoking stick was detected</h3>
            <p>
              Pick the stick that you just scanned <TooltipIcon />
            </p>
          </div>

          <div className={style.wrapper}>
            {data.map((type) => (
              <div
                data-tip
                data-for={type.name}
                key={type.name}
                onClick={() => {
                  handleSetState({
                    typeSelect: { ...typeSelect, value: type.name },
                  });
                }}
                className={`${style.typeCard} ${
                  typeSelect.value === type.name && style.active
                }`}
              >
                <img src={type.img} alt="" />
                <p>{type.name}</p>
                <ReactTooltip
                  id={type.name}
                  className="tooltip"
                  place="top"
                  effect="solid"
                >
                  {type.tooltip}
                </ReactTooltip>
              </div>
            ))}
          </div>
          {typeSelect.value && (
            <div
              onClick={() => {
                toggleUpdate("scan");
                handleSetState({
                  typeSelect: { ...typeSelect, toggle: false },
                });
              }}
              className={style.btn}
            >
              continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickSelect;
