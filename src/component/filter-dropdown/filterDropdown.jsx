import React, { useState } from "react";
import classes from "./filterDropdown.module.css";
import dropdownIcon from "../../assets/imgs/angle-down.svg";

const FilterDropdown = ({ data }) => {
  const [state, setState] = useState({
    togglePriceFilter: false,
    filter: data[0].value,
  });

  const { filter, togglePriceFilter } = state;

  const handleSetState = (payload) => {
    setState((states) => ({ ...states, ...payload }));
  };

  const filterPropertyUpdate = (filterProp) => {
    handleSetState({ filter: filterProp, togglePriceFilter: false });
    // onPriceFilter(filter);
  };
  console.log(data);
  console.log(data.filter((elem) => elem.value === filter)[0].labe);
  console.log(data[0].value);
  return (
    <div className={classes.priceDropdown}>
      <div
        onClick={() =>
          handleSetState({ togglePriceFilter: !togglePriceFilter })
        }
        className={classes.selectedPrice}
      >
        Filter:
        <div className={classes.priceInfo}>
          <span>{data.filter((elem) => elem.value === filter)[0].label}</span>
          <img
            src={dropdownIcon}
            alt=""
            className={`${classes.dropdownIcon} ${
              togglePriceFilter && classes.active
            }`}
          />
        </div>
      </div>
      <div
        className={`${classes.dropdown} ${togglePriceFilter && classes.active}`}
      >
        {data.map((elem) => (
          <>
            {filter !== elem.value && (
              <div
                key={elem.value}
                onClick={() => filterPropertyUpdate(elem.value)}
              >
                <div className={classes.priceInfo}>
                  <span>{elem.label}</span>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;
