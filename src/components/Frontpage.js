import React, { useState, useEffect } from "react";
import data from "../data/jsonData.json";

const Frontpage = () => {
  const [pointsData, setPointsData] = useState([]);
  const [selectedMainObject, setSelectedMainObject] = useState(null);
  const [subItems, setSubItems] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleMainObjectSelect = (mainObject) => {
    setSelectedMainObject(mainObject);
    setSubItems([]);
    setTotalPoints(0);
  };

  const handleSubItemAdd = (subItem) => {
    setSubItems([...subItems, subItem]);
    setTotalPoints(totalPoints + subItem.points);
  };

  const handleSubItemRemove = (subItem) => {
    const newSubItems = subItems.filter((item) => item !== subItem);
    setSubItems(newSubItems);
    setTotalPoints(totalPoints - subItem.points);
  };

  console.log("data lenght: ", data.length);

  return (
    <div>
      <h1>Frontpage</h1>
      <p>Select a main object to add sub items:</p>
      <ul>
        {data.map((mainObject) => (
          <li
            key={mainObject.faction}
            onClick={() => handleMainObjectSelect(mainObject)}
          >
            {mainObject.faction}
          </li>
        ))}
      </ul>
      {selectedMainObject && (
        <>
          <h2>{selectedMainObject.faction}</h2>
          <p>Add sub items:</p>
          <ul>
            {selectedMainObject.units.map((subItem) => (
              <li key={subItem.unit}>
                {subItem.unit} {subItem.profiles} ({subItem.points} points)
                <button onClick={() => handleSubItemRemove(subItem)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const newSubItem = {
                name: event.target.subItemName.value,
                points: parseInt(event.target.subItemPoints.value),
              };
              handleSubItemAdd(newSubItem);
              event.target.subItemName.value = "";
              event.target.subItemPoints.value = "";
            }}
          >
            <label>
              Sub item name:
              <input type="text" name="subItemName" />
            </label>
            <label>
              Sub item points:
              <input type="number" name="subItemPoints" />
            </label>
            <button type="submit">Add</button>
          </form>
          <p>Total points needed: {totalPoints}</p>
        </>
      )}
    </div>
  );
};

export default Frontpage;
