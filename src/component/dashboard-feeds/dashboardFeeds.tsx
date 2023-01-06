import React, { useState } from "react";
import style from "./dashboardFeeds.module.css";
import { ReactComponent as Feed } from "../../assets//imgs/dashboard/feed.svg";
import { ReactComponent as TriUp } from "../../assets/imgs/tri-up.svg";
import { ReactComponent as TriDown } from "../../assets/imgs/tri-down.svg";
import { topLeftTab } from "../dashnoard-content/Utils";
import FilterDropdown from "../filter-dropdown/filterDropdown";
import ReactPaginate from "react-paginate";

const DashboardFeeds = () => {
  const [currentFilter, setCurrentFilter] = useState("");
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const perPage = 10;
  const pageVisited = pageNumber * perPage;

  const PageCount = (gameList: any) => {
    return Math.ceil(gameList.length / perPage);
  };

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p>
          <Feed /> Feeds
        </p>
        <FilterDropdown
          data={[
            {
              label: "Most Recent",
              value: "recent",
            },
            {
              label: "Most Views",
              value: "views",
            },
          ]}
        />
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
                  topLeftTab.sort((a, b) => a.chapter.localeCompare(b.chapter));
                }}
              />
              <TriDown
                className={
                  currentFilter === "chapter-descend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("chapter-descend");
                  topLeftTab.sort((a, b) => b.chapter.localeCompare(a.chapter));
                }}
              />
            </div>
          </div>
          <div>
            How Long Ago
            <div className={style.controller}>
              <TriUp
                className={currentFilter === "time-ascend" ? style.active : ""}
                onClick={() => {
                  setCurrentFilter("time-ascend");
                  topLeftTab.sort((a, b) => a.time.localeCompare(b.time));
                }}
              />
              <TriDown
                className={currentFilter === "time-descend" ? style.active : ""}
                onClick={() => {
                  setCurrentFilter("time-descend");
                  topLeftTab.sort((a, b) => b.time.localeCompare(a.time));
                }}
              />
            </div>
          </div>
        </div>
        {topLeftTab.slice(pageVisited, pageVisited + perPage).map((elem) => (
          <div className={style.tableItemWrapper}>
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
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={PageCount(topLeftTab)}
        onPageChange={changePage}
        containerClassName="pagination"
        previousLinkClassName="page-prev"
        nextLinkClassName="page-next"
        disabledClassName="pagination-disabled"
        activeClassName="active-page"
        pageLinkClassName="page-number"
      />
    </div>
  );
};

export default DashboardFeeds;
