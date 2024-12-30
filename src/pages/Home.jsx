import React, { useContext } from "react";
import { useState, useEffect } from "react";
import SelectComponent from "../components/SelectComponent";
import Card from "../components/Card";
import { DarkModeContext } from "../context/DarkModeContext";

function Page() {
  const [data, setData] = useState([]);
  // const [input, setInput] = useState("");
  // const [reg, setReg] = useState("");
  // const [subreg, setSubReg] = useState("");
  // const [sortByValue, setSortByValue] = useState("");
  // const [orderBy, setOrderBy] = useState(false);
    const [filters, setFilters] = useState({
      input:"",
      region:"",
      subregion:"",
      sortBy:"",
      ascendingOrder:false
    })

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  console.log("Rendering...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const result = await response.json();
        const finalResult = result.map((country) => ({
          flag: country.flags.png,
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital,
          subregion: country.subregion,
          area: country.area,
        }));
        setData(finalResult);
      } catch (error) {
        console.log("Error occured during fetching data");
      }
    };

    fetchData();
  }, []);

  // function checkInputCondition(country) {
  //   if (country.name.includes(input) && country.region.includes(reg)) {
  //     if (subreg === "") {
  //       return true;
  //     } else {
  //       if (country.subregion && subreg === country.subregion && reg) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   }
  //   return false;
  // }

   const regions = Array.from(new Set(data.map((country) => country.region)));

  const subRegions = Array.from(
    new Set(data.map((country) => country.subregion))
  ).filter(Boolean);

   const sortby = ["population", "area"];

   const InputSearch = () => {
    return data.filter((country)=>{
      const {input, region, subregion} = filters;
      const matchesInput = country.name.toLowerCase().includes(input.toLowerCase());
      const matchesRegion = !region || country.region === region;
      const matchesSubRegion = !subregion || (country.subregion === subregion && region);
      return matchesInput && matchesRegion && matchesSubRegion;
    }).sort((a, b) => {
      const { sortby, ascendingOrder } = filters;
      if (!sortby) return 0;
      const valueA = a[sortby];
      const valueB = b[sortby];
      return ascendingOrder ? valueA - valueB : valueB - valueA;
    });
   }

   const handleFilter = (key,value) => {
    setFilters((prev)=> ({ ...prev,[key]:value }));
   }

  // let InputSearch = data.filter(checkInputCondition);

  // if (sortByValue === "population") {
  //   if (orderBy) {
  //     InputSearch = InputSearch.sort((a, b) => a.population - b.population);
  //   } else {
  //     InputSearch = InputSearch.sort((a, b) => b.population - a.population);
  //   }
  // } else if (sortByValue === "area") {
  //   if (orderBy) {
  //     InputSearch = InputSearch.sort((a, b) => a.area - b.area);
  //   } else {
  //     InputSearch = InputSearch.sort((a, b) => b.area - a.area);
  //   }
  // }

  // if(InputSearch().length>0){
  //   console.log("InputSearch " + InputSearch());

  // }else{
  //   console.log("InputSearch is empty" + InputSearch());
  //   return (
  //     <p>No countries</p>
  //   )

  // }

       console.log("InputSearch length " + InputSearch.length);


  return (
    <div className="flex flex-col md:flex flex-row">
      <div className="flex justify-between mx-16 my-6">
        <h1 className="text-2xl font-bold">Where in the world?</h1>
        <button onClick={toggleDarkMode}>🌒 Dark Mode</button>
      </div>
      <div className="flex justify-between mx-16 flex-col gap-2 md:flex-row md:justify-around">
        <input
          className="border-2 p-2 rounded-lg"
          type="text"
          placeholder="Search for a country"
          value={filters.input}
          onChange={(e) => handleFilter("input", e.target.value)}
        />
        <SelectComponent
          name="regions"
          values={regions}
          handleOnChange={(value) => handleFilter("region", value)}
        />

        <SelectComponent
          name="subregions"
          values={subRegions}
          handleOnChange={(value) => handleFilter("subregion", value)}
        />

        <SelectComponent
          name="sort by"
          values={sortby}
          handleOnChange={(value) => handleFilter("sortby", value)}
        />
        <button onClick={() => handleFilter("ascendingOrder", !filters.ascendingOrder)}>
        {filters.ascendingOrder ? "▴" : "▾"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {InputSearch().length>0 ?
         (InputSearch().map((country) => (
          <Card country={country} />
        ))) : (<Card country={"No countries"} />)}
      </div>
    </div>
  );
}

function HomePage() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
      <Page />
    </div>
  );
}

export default HomePage;
