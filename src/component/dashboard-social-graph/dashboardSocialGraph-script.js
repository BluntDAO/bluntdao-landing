import style from "./dashboardSocialGraph.module.css";
import userIcon from "../../assets//imgs/dashboard/user-icon.png";

export const initialNodes = [
  {
    id: "horizontal-1",
    sourcePosition: "right",
    type: "input",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.inputBG}></div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 0, y: 240 },
    connectable: false,
    draggable: false,
  },
  //   second row
  {
    id: "horizontal-2",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.nodeBG}>
            <div style={{ width: "80%" }} className={style.progress}></div>
            <div className={style.percentage}>80%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 250, y: 0 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-3",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.nodeBG}>
            <div style={{ width: "76%" }} className={style.progress}></div>
            <div className={style.percentage}>76%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 250, y: 160 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-4",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.nodeBG}>
            <div style={{ width: "82%" }} className={style.progress}></div>
            <div className={style.percentage}>82%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 250, y: 320 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-5",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.nodeBG}>
            <div style={{ width: "62%" }} className={style.progress}></div>
            <div className={style.percentage}>62%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 250, y: 480 },
    connectable: false,
    draggable: false,
  },
  //   Third row
  {
    id: "horizontal-6",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.thiedNodeBG}>
            <div style={{ width: "80%" }} className={style.progress}></div>
            <div className={style.percentage}>80%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 500, y: 0 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-7",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div style={{ width: "76%" }} className={style.progress}></div>
          <div className={style.thiedNodeBG}>
            <div style={{ width: "62%" }} className={style.progress}></div>
            <div className={style.percentage}>76%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 500, y: 160 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-8",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div style={{ width: "82%" }} className={style.progress}></div>
          <div className={style.thiedNodeBG}>
            <div style={{ width: "62%" }} className={style.progress}></div>
            <div className={style.percentage}>82%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 500, y: 320 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-9",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.thiedNodeBG}>
            <div style={{ width: "62%" }} className={style.progress}></div>
            <div className={style.percentage}>62%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 500, y: 480 },
    connectable: false,
    draggable: false,
  },
  //   Fourth row
  {
    id: "horizontal-10",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.FourthNodeBG}>
            <div style={{ width: "80%" }} className={style.progress}></div>
            <div className={style.percentage}>80%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 750, y: 0 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-11",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div style={{ width: "76%" }} className={style.progress}></div>
          <div className={style.FourthNodeBG}>
            <div style={{ width: "62%" }} className={style.progress}></div>
            <div className={style.percentage}>76%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 750, y: 160 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-12",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div style={{ width: "82%" }} className={style.progress}></div>
          <div className={style.FourthNodeBG}>
            <div style={{ width: "62%" }} className={style.progress}></div>
            <div className={style.percentage}>82%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 750, y: 320 },
    connectable: false,
    draggable: false,
  },
  {
    id: "horizontal-13",
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: (
        <div className={style.node}>
          <div className={style.FourthNodeBG}>
            <div style={{ width: "62%" }} className={style.progress}></div>
            <div className={style.percentage}>62%</div>
          </div>
          <div className={style.address}>
            <img src={userIcon} alt="" />
            <p> AHV01.......BSd2qU</p>
          </div>
        </div>
      ),
    },
    style: { background: "transparent", padding: 0 },
    position: { x: 750, y: 480 },
    connectable: false,
    draggable: false,
  },
];

export const initialEdges = [
  // First Edges Group
  {
    id: "horizontal-e1-2",
    source: "horizontal-1",
    target: "horizontal-2",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-3",
    source: "horizontal-1",
    target: "horizontal-3",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-4",
    source: "horizontal-1",
    target: "horizontal-4",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-5",
    source: "horizontal-1",
    target: "horizontal-5",
    style: { stroke: "#36434E" },
  },
  // Second Edges Group
  {
    id: "horizontal-e1-6",
    source: "horizontal-2",
    target: "horizontal-6",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-7",
    source: "horizontal-2",
    target: "horizontal-7",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-8",
    source: "horizontal-2",
    target: "horizontal-8",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-9",
    source: "horizontal-2",
    target: "horizontal-9",
    style: { stroke: "#36434E" },
  },
  // Third Edges Group
  {
    id: "horizontal-e1-10",
    source: "horizontal-6",
    target: "horizontal-10",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-11",
    source: "horizontal-6",
    target: "horizontal-11",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-12",
    source: "horizontal-6",
    target: "horizontal-12",
    style: { stroke: "#36434E" },
  },
  {
    id: "horizontal-e1-13",
    source: "horizontal-6",
    target: "horizontal-13",
    style: { stroke: "#36434E" },
  },
];
