  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { useContext } from "react";
  import { DarkModeContext } from "../context/DarkModeContext";

  const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [borderCountries, setBorderCountries] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await fetch(`https://restcountries.com/v3.1/name/${id}`);
          const result = await resp.json();
          const finalResult = result.map((country) => ({
            flag: country.flags.png,
            name: country.name?.common || "No Name",
            population: country.population || "No population",
            region: country.region || "No region",
            capital: country.capital?.[0] || "No capital available",
            subregion: country.subregion || "No subregion available",
            area: country.area || "No area",
            nativename:
              Object.values(country.name?.nativeName || {})[0]?.common || "no data found",
            languages: country.languages || {},
            currency: Object.values(country.currencies || {})[0]?.name || "no curreny",
            borders: country.borders || [],
            tld: country.tld || "no tld",
          }));
          setData(finalResult);

          if(finalResult.length > 0 && finalResult[0].borders && finalResult[0].borders[0]!=="No Coutries "){

            const borderCodes =   finalResult[0].borders.join(',');
            const bordersResp = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
            const borderData = await bordersResp.json();


            if(Array.isArray(borderData)){
              const borderNames = borderData.map((borderCountry)=>({
                name:borderCountry.name.common
            
             }));
             setBorderCountries(borderNames);
            }
            // setBorderCountries(borderNames);
          }else{
            setBorderCountries([{ name: "No borders available" }]);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }, []);

    return (
      <div className="h-[1000px]">
        <button
          className="border p-2 m-2 bg-gray-400 rounded-lg"
          onClick={() => navigate("/")}
        >
          ← Go Back
        </button>
        {data.map((country) => (
          <div
            className=" border border-black flex flex-col gap-4 mx-9 my-9 rounded-xl md:flex-row  md:justify-around  "
            key={country.name}
          >
            <img src={country.flag} className=" rounded-md"></img>
            <div className="m-2 grid gap-2 mb-9">
              <div>
                <p className="font-bold text-xl">{country.name}</p>
              </div>
              <div className=" flex flex-col gap-6 md:flex-row md:justify-around">
                <div className="flex flex-col gap-2">
                  <p>
                    <strong>Native Name : </strong>
                    {country.nativename}
                  </p>
                  <p>
                    <strong>Population : </strong>
                    {country.population}
                  </p>
                  <p>
                    <strong>Region : </strong>
                    {country.region}
                  </p>
                  <p>
                    <strong>subRegion : </strong>
                    {country.subregion}
                  </p>
                  <p>
                    <strong>Capital : </strong>
                    {country.capital}
                  </p>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                  <p>
                    <strong> Top Level Domain : </strong>
                    {country.tld.map((lang) => (
                      <span> {lang} </span>
                    ))}
                  </p>
                  <p>
                    <strong> Currency : </strong>
                    {country.currency}
                  </p>
                  <p>
                    <strong> Languages : </strong>
                    {Object.values(country.languages).map((lang) => (
                      <span> {lang},</span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mt-4">
                <strong className="pt-4"> Border Countries :</strong>
                <div className="flex flex-wrap">
                  {borderCountries.map((bord,index) => (
                    <span key={index} className="m-2 p-2 bg-gray-200 text-black">
                      {bord.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const Detail = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    return (
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
        <DetailPage />
      </div>
    );
  };

  export default Detail;
