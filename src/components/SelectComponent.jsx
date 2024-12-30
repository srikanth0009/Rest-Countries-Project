import React from "react";

const SelectComponent = ({name, values, handleOnChange}) => {
  return (
    <select
      className="border p-2 rounded-lg text-black"
      name={name}
      id={name}
      onChange={(e)=>handleOnChange(e.target.value)}
    >
      <option value="">Enter the {name}</option>
      {values.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
