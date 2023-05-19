import React from "react";
import IRootNodes from "../interfaces/IRootNodes";
import TreeNode from "./TreeNode";

const Tree: React.FC<IRootNodes> = ({ rootNodes }) => {
  return (
    <div className="tree">
      <h1 className="root">Root Hub</h1>
      <div className="branches">
        {rootNodes.map((rootNode) => (
          <TreeNode key={rootNode.id} node={rootNode} />
        ))}
      </div>
    </div>
  );
};

export default Tree;
