import React from "react";
import IDevice from "../interfaces/IDevice";
import INode from "../interfaces/INode";

const TreeNode: React.FC<INode> = ({ node }: { node: IDevice }) => {
  const hasChildren = node.children ? node.children.length > 0 : false;

  return (
    <div className="tree-node">
      <span className={`device-container${hasChildren ? " has-children" : ""}`}>
        <div className="node-text">
          <span className="node-title">Vendor Id:</span> {node.vendorId}
        </div>
        <div className="node-text">
          <span className="node-title">Product Id:</span> {node.productId}
        </div>
        <div className="node-text">
          <span className="node-title">Type:</span> {node.type}
        </div>
        {node.description && (
          <span className="node-text">
            <h3 className="node-description">Description:</h3>
            <div>
              <span className="node-title">Manufacturer:</span>{" "}
              {node.description.manufacturer || "N/A"}
            </div>
            <div>
              <span className="node-title">Product:</span>{" "}
              {node.description.product || "N/A"}
            </div>
            <div>
              <span className="node-title">Serial Number:</span>{" "}
              {node.description.serialNumber || "N/A"}
            </div>
          </span>
        )}
      </span>

      {hasChildren && (
        <div className="children-container">
          {node.children?.length &&
            node.children.map((childNode) => (
              <TreeNode key={childNode.id} node={childNode} />
            ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
