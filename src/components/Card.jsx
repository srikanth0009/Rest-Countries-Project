import React from "react";
import Detail from "../pages/Detail";
import { useNavigate } from "react-router-dom";

const Card = ({country}) => {

  const navigate = useNavigate();
  console.log("Hi "+country);

  if(country==="No countries"){
    return (
      <div className="flex justify-center">
        <p className="m-9">No countries available</p>
      </div>
    )
  }

  // if(country){

    return (
      <div
        className="border border-black grid gap-2 mx-auto my-9 rounded-xl cursor-pointer"
        key={country.name.common}
        onClick={() => navigate(`Details/${country.name}`)}
      >
        <img src={country.flag} className="w-[250px] h-[150px] rounded-md"></img>
        <div className="m-2 grid gap-2 mb-9">
          <p className="font-bold text-xl w-[230px]">{country.name}</p>
          <p>
            <strong>Population : </strong>
            {country.population}
          </p>
          <p>
            <strong>Region : </strong>
            {country.region}
          </p>
          <p>
            <strong>Capital : </strong>
            {country.capital}
          </p>
          <p>
            <strong>subRegion : </strong>
            {country.subregion}
          </p>
          <p>
            <strong>Area : </strong>
            {country.area}
          </p>
        </div>
      </div>
    );

//   }else{
//     <p> No countries available </p>
//   }

  
 };

export default Card;
