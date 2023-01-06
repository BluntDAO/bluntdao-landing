import { useEffect, useRef } from "react";
import style from "./stickSelect.module.css";
import ReactTooltip from "react-tooltip";
import { ReactComponent as CloseIcon } from "../../assets/imgs/icon-close.svg";
import { ReactComponent as TooltipIcon } from "../../assets/imgs/icon-tooltip.svg";
import data from "./stickSelect-script";

const StickSelect = ({ handleSetState, toggle, typeSelect }) => {
  const cardRef = useRef();

  const handleClickOutside = (event) => {
    if (!cardRef?.current?.contains(event.target)) {
      handleSetState({
        typeSelect: { ...typeSelect, toggle: false },
      });
    }
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  // }, []);
  return (
    <div
      className={`${style.selectContainer} ${
        typeSelect.toggle && style.active
      }`}
    >
      <div className={`${style.container}  ${toggle && style.deactive}`}>
        <div className={style.card} ref={cardRef}>
          <div className={style.iconContainer}>
            <CloseIcon
              onClick={() => {
                handleSetState({
                  typeSelect: { ...typeSelect, toggle: false },
                });
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
                handleSetState({
                  typeSelect: { ...typeSelect, toggle: false },
                  detectionToggle: true,
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
