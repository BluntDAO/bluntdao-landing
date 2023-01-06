import React from "react";
import style from "./BuiltWith.module.css";
import data from "./data";

const BuiltWith = () => {
  return (
    <div className={style.container}>
      <div className={`${style.section} section`}>
        <div className={style.header}>Built With</div>
        <div className={style.subheader}>
          BluntDAO's infrastructure is powered by the following blockchains,
          frameworks, tools, and integrations
        </div>
        <div className={style.TechWrapper}>
          {data.map((tech) => (
            <a key={tech.url} href={tech.url} target="_blank" rel="noreferrer">
              <img src={tech.img} alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuiltWith;
