import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./dashboardContent.module.css";
// Icons
import { ReactComponent as MemberIcon } from "../../assets/imgs/members-vector.svg";
import { ReactComponent as OnboardIcon } from "../../assets/imgs/onboards-vector.svg";
import { ReactComponent as ChartIcon } from "../../assets/imgs/chart-vector.svg";
import { ReactComponent as TooltipIcon } from "../../assets/imgs/icon-tooltip.svg";
import { ReactComponent as Feed } from "../../assets//imgs/dashboard/feed.svg";
import { ReactComponent as TriUp } from "../../assets/imgs/tri-up.svg";
import { ReactComponent as TriDown } from "../../assets/imgs/tri-down.svg";
// components
import ReactTooltip from "react-tooltip";
// data
import { topLeftTab } from "./Utils";

const DashboardTopSection = () => {
  const history = useHistory();
  const [currentFilter, setCurrentFilter] = useState("");

  return (
    <div className={style.cardCotnainer}>
      <div className={style.cardWrapper}>
        <div className={style.card}>
          <ChartIcon />
          <div className={style.titleCard}>
            <div>25.71%</div>
            <p>
              Sesh Score <TooltipIcon data-tip data-for="sesh-score" />
            </p>
          </div>
          <ReactTooltip
            id={"sesh-score"}
            className="tooltip tooltip-dark"
            place="bottom"
            effect="solid"
          >
            Sesh score is number of people who were onboarded from all the
            people who were validated by people you validated over the number of
            total validators.
          </ReactTooltip>
        </div>
        <div className={style.card}>
          <OnboardIcon />
          <div className={style.titleCard}>
            <div>500</div>
            <p>My Onboards</p>
          </div>
        </div>
        <div className={style.card}>
          <MemberIcon />
          <div className={style.titleCard}>
            <div>12,200</div>
            <p>BluntDAO Members</p>
          </div>
        </div>
      </div>
      <div className={style.feedContainer}>
        <div className={style.header}>
          <p>
            <Feed /> Validation Feeds
          </p>
          <div
            onClick={() => history.push(`/dashboard/feed`)}
            className={style.viewAll}
          >
            View All
          </div>
        </div>
        <div className={style.tabWrapper}>
          <div className={style.tableHeader}>
            <div>
              Validator
              <div className={style.controller}>
                <TriUp
                  className={
                    currentFilter === "validator-ascend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("validator-ascend");
                    topLeftTab.sort((a, b) =>
                      a.validator.localeCompare(b.validator)
                    );
                  }}
                />
                <TriDown
                  className={
                    currentFilter === "validator-descend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("validator-descend");
                    topLeftTab.sort((a, b) =>
                      b.validator.localeCompare(a.validator)
                    );
                  }}
                />
              </div>
            </div>
            <div>Action</div>
            <div>
              Validatee
              <div className={style.controller}>
                <TriUp
                  className={
                    currentFilter === "validatee-ascend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("validatee-ascend");
                    topLeftTab.sort((a, b) =>
                      a.validatee.localeCompare(b.validatee)
                    );
                  }}
                />
                <TriDown
                  className={
                    currentFilter === "validatee-descend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("validatee-descend");
                    topLeftTab.sort((a, b) =>
                      b.validatee.localeCompare(a.validatee)
                    );
                  }}
                />
              </div>
            </div>
            <div>
              Blockchain
              <div className={style.controller}>
                <TriUp
                  className={
                    currentFilter === "blockchain-ascend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("blockchain-ascend");
                    topLeftTab.sort((a, b) =>
                      a.blockchain.localeCompare(b.blockchain)
                    );
                  }}
                />
                <TriDown
                  className={
                    currentFilter === "blockchain-descend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("blockchain-descend");
                    topLeftTab.sort((a, b) =>
                      b.blockchain.localeCompare(a.blockchain)
                    );
                  }}
                />
              </div>
            </div>
            <div>
              Chapter
              <div className={style.controller}>
                <TriUp
                  className={
                    currentFilter === "chapter-ascend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("chapter-ascend");
                    topLeftTab.sort((a, b) =>
                      a.chapter.localeCompare(b.chapter)
                    );
                  }}
                />
                <TriDown
                  className={
                    currentFilter === "chapter-descend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("chapter-descend");
                    topLeftTab.sort((a, b) =>
                      b.chapter.localeCompare(a.chapter)
                    );
                  }}
                />
              </div>
            </div>
            <div>
              How Long Ago
              <div className={style.controller}>
                <TriUp
                  className={
                    currentFilter === "time-ascend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("time-ascend");
                    topLeftTab.sort((a, b) => a.time.localeCompare(b.time));
                  }}
                />
                <TriDown
                  className={
                    currentFilter === "time-descend" ? style.active : ""
                  }
                  onClick={() => {
                    setCurrentFilter("time-descend");
                    topLeftTab.sort((a, b) => b.time.localeCompare(a.time));
                  }}
                />
              </div>
            </div>
          </div>
          {topLeftTab.map((elem) => (
            <div className={style.tableItemWrapper} key={elem.validator}>
              <div>
                <img src={elem.validatorIcon} alt="" />
                {elem.validator}
              </div>
              <div>{elem.action}</div>
              <div>
                <img src={elem.validateeIcon} alt="" />
                {elem.validatee}
              </div>
              <div>{elem.blockchain}</div>
              <div>{elem.chapter}</div>
              <div>{elem.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTopSection;
