import React, { useState } from "react";
import style from "./Dropdown.module.css";
import { ReactComponent as DropdownIcon } from "../../assets/imgs/angle-down.svg";

const Dropdown = ({ props }: any) => {

  const { typeSelect, options, handleSetState } = props;

  const [toggle, setToggle] = useState(false);

  
  return (
    <div className={`${style.container} ${toggle ? style.active : ""}`}>
      <div className={style.current} onClick={()=>setToggle(!toggle)}>
        <p>{typeSelect.value}</p>
        <DropdownIcon className={`${style.dropdownIcon} ${toggle ? style.active : ""}`} />
      </div>
      <div className={`${style.valueList} ${toggle ? style.active : ""}`}>
        {options?.map((option: any) => (
          <div  onClick={()=>{
            setToggle(!toggle);
            handleSetState({typeSelect:{
              value:option,
              toggle:typeSelect.toggle
            }})
          }}>{option}</div>
        ))}
      </div>
    </div>
  );
};
export default Dropdown;
