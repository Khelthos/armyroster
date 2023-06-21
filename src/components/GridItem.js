import React from "react";

const GridItem = ({ unit, onClick }) => {
  return (
    <div className="button" onClick={onClick}>
      {unit}
    </div>
  );
};

export default GridItem;
