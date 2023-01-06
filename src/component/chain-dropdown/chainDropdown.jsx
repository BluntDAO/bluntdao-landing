import React, { useState } from "react";
import classes from "./chainDropdown.module.css";
import dropdownIcon from "../../assets/imgs/angle-down.svg";

const ChainDropown = () => {
  const [state, setState] = useState({
    togglePriceFilter: false,
    filter: "all",
  });

  const { filter, togglePriceFilter } = state;

  const filters = {
    all: "All",
    near: "Near",
    solana: "Solana",
  };

  const handleSetState = (payload) => {
    setState((states) => ({ ...states, ...payload }));
  };

  const filterPropertyUpdate = (filterProp) => {
    handleSetState({ filter: filterProp, togglePriceFilter: false });
    // onPriceFilter(filter);
  };
  return (
    <div className={classes.priceDropdown}>
      <div
        onClick={() =>
          handleSetState({ togglePriceFilter: !togglePriceFilter })
        }
        className={classes.selectedPrice}
      >
        Blockchain
        <div className={classes.priceInfo}>
          <span>{filters[filter]}</span>
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
        {filter != "near" && (
          <div onClick={() => filterPropertyUpdate("all")}>
            <div className={classes.priceInfo}>
              <span>Near</span>
            </div>
          </div>
        )}
        {filter != "solana" && (
          <div onClick={() => filterPropertyUpdate("all")}>
            <div className={classes.priceInfo}>
              <span>Solana</span>
            </div>
          </div>
        )}
        {/* {filter != "high" && (
          <div onClick={() => filterPropertyUpdate("high")}>
            <div className={classes.priceInfo}>
              <span>High to Low</span>
            </div>
          </div>
        )}

        {filter != "newest" && (
          <div onClick={() => filterPropertyUpdate("newest")}>
            <div className={classes.priceInfo}>
              <span>Newest</span>
            </div>
          </div>
        )}
        {filter != "oldest" && (
          <div onClick={() => filterPropertyUpdate("oldest")}>
            <div className={classes.priceInfo}>
              <span>Oldest</span>
            </div>
          </div>
        )}
        {filter != "ascAlphabet" && (
          <div onClick={() => filterPropertyUpdate("ascAlphabet")}>
            <div className={classes.priceInfo}>
              <span>A-Z </span>
            </div>
          </div>
        )}

        {filter != "descAlphabet" && (
          <div onClick={() => filterPropertyUpdate("descAlphabet")}>
            <div className={classes.priceInfo}>
              <span>Z-A</span>
            </div>
          </div>
        )} */}

        {/* {filter != "txVolume" && (
          <div onClick={() => filterPropertyUpdate("txVolume")}>
            <div className={classes.priceInfo}>
              <span>Transaction Volume</span>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ChainDropown;
