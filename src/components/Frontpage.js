import React, { useState } from "react";
import GridItem from "./GridItem";

import data from "../data/jsonData.json";

const Frontpage = () => {
  // const [pointsData, setPointsData] = useState([]);
  const [selectedMainObject, setSelectedMainObject] = useState(null);
  const [subItems, setSubItems] = useState([]);
  const [clickedItems, setClickedItems] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleClick = (unit, index) => {
    console.log("Oggetto clickato: ", unit);
    setClickedItems((prevItems) => [...prevItems, unit]);
  };

  const handleMainObjectSelect = (mainObject) => {
    const obj = data.find((i) => i.faction === mainObject);
    setSelectedMainObject(obj);
    console.log("Selezionato:", obj.faction);
    setSubItems(obj.units);
    setTotalPoints(0);
  };

  // const handleSubItemAdd = (subItem) => {
  //   setSubItems([...subItems, subItem]);
  //   setTotalPoints(totalPoints + subItem.points);
  // };

  // const handleSubItemRemove = (subItem) => {
  //   const newSubItems = subItems.filter((item) => item !== subItem);
  //   setSubItems(newSubItems);
  //   setTotalPoints(totalPoints - subItem.points);
  // };

  console.log("data lenght: ", data.length);

  return (
    <div>
      <h1>Frontpage</h1>
      <p>Select a main object to add sub items:</p>
      <select
        className="select-container"
        onChange={(ev) => handleMainObjectSelect(ev.target.value)}
      >
        {data.map((mainObject) => (
          <option
            key={mainObject.faction}
            value={mainObject.faction}
            className="option1"
          >
            {mainObject.faction}
          </option>
        ))}
      </select>
      {selectedMainObject && (
        <>
          <h2>{selectedMainObject.faction}</h2>
          <p>Add sub items:</p>
          <div className="grid-container">
            {subItems.map((subItem, index) => (
              // <div key={subItem.unit} className="">
              //   <label>{subItem.unit}</label>
              //   {subItem.unit && (
              //     <select>
              //       {subItem.profiles.map((prof, ind) => (
              //         <option key={ind} value={prof.profile}>
              //           {prof.profile}
              //         </option>
              //       ))}
              //     </select>
              //   )}
              // </div>
              <GridItem
                key={index}
                unit={subItem.unit}
                onClick={() => handleClick(subItem, index)}
              />
            ))}
          </div>
          {/* <form
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
          </form> */}
          <div>
            <h2>Clicked Items:</h2>
            <ul>
              {clickedItems.map((item, index) => (
                <li key={index}>
                  {item.unit}{" "}
                  <select>
                    {item.unit &&
                      item.profiles.map((prof, ind) => (
                        <option key={ind} value={prof.profile}>
                          {prof.profile}
                        </option>
                      ))}
                  </select>
                </li>
              ))}
            </ul>
          </div>
          <p>Total points needed: {totalPoints}</p>
        </>
      )}
    </div>
  );
};

export default Frontpage;
