import React, { useState } from "react";
import style from "./Dropdown.module.css";
import { ReactComponent as DropdownIcon } from "../../assets/imgs/angle-down.svg";

const Dropdown = ({ props }: any) => {
  console.log(props);

  const { crrentValue, options } = props;
  console.log(crrentValue);

  const [state, setState] = useState();

  return (
    <div className={style.container}>
      <div className={style.current}>
        <p>{crrentValue}</p>
        <DropdownIcon />
      </div>
      <div className={style.valueList}>
        {options?.map((option: any) => (
          <div>{option}</div>
        ))}
      </div>
    </div>
  );
};
export default Dropdown;
