import React from "react";
import style from "./BuiltWith.module.css";
import data from "./data";

const BuiltWith = () => {
  // Duplicate the data to create seamless infinite scroll
  const duplicatedData = [...data, ...data];

  return (
    <div className={style.container}>
      <div className={`${style.section} section`}>
        <div className={style.header}>Built With</div>
        <div className={style.subheader}>
          BluntDAO's infrastructure is powered by the following blockchains,
          frameworks, tools, and integrations
        </div>
        <div className={style.scrollContainer}>
          <div className={style.scrollTrack}>
            {duplicatedData.map((tech, index) => (
              <a 
                key={`${tech.url}-${index}`} 
                href={tech.url} 
                target="_blank" 
                rel="noreferrer"
                className={style.techCard}
              >
                <img 
                  src={tech.img} 
                  alt={tech.url} 
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuiltWith;
