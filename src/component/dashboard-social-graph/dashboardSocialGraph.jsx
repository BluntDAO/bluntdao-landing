import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "react-flow-renderer";
import style from "./dashboardSocialGraph.module.css";
import { initialEdges, initialNodes } from "./dashboardSocialGraph-script";
import { ReactComponent as IconSearch } from "../../assets//imgs/icon-search.svg";

const DashboardSocialGraph = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p>BluntDAO OG Social Graph</p>
        <div className={style.searhBar}>
          <IconSearch />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      ></ReactFlow>
    </div>
  );
};

export default DashboardSocialGraph;
