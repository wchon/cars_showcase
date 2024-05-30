"use client";
import { CarCard, CustomFilter, SearchBar, ShowMore } from "@/components";
import Hero from "@/components/Hero";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading , setLoading] = useState(false);  

  // search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  // pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        model: model || '',
        year: year || 2022,
        fuel: fuel || '', 
        limit: limit || 10
    
      });
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  console.log("data emp? ", !Array.isArray(allCars), allCars.length, !allCars);
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y
      max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Car Catalog
          </h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar 
            setManufacturer={setManufacturer}
            setModel={setModel}
          />
          <div className="home__filter-container">
            <CustomFilter 
              title="fuel" 
              options={fuels}
              setFilter={setFuel}
              />
            <CustomFilter 
              title="year" 
              options={yearsOfProduction}
              setFilter={setYear}
              />
          </div>
        </div>
        {allCars.length > 0 ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car: object) => (
                  <CarCard car={car} />
                ))}
              </div>
              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image 
                    src="/loader.svg"
                    alt="loader"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}

              <ShowMore
                pageNumber={limit / 10}
                isNext={limit  > allCars.length}
                setLimit={setLimit}
              />
            </section>
          ):(
            <div className="home_error-container">
              <h2 className="text-back text-xl font-bold"> 
                Oops, no results
              </h2>
              <p>{allCars?.message}</p>
            </div>
          )}
          {/* start here */}
      </div>
    </main>
  );
}
