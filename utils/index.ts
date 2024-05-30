import { CarProps, FilterProps } from "@/types";

export const fetchCars = async (filters: FilterProps) => {
    const {manufacturer, year, model, limit, fuel} = filters;
    console.log("all filter", manufacturer, year, model, limit, fuel)
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit${limit}&fuel_type=${fuel}`;
    console.log("url", url);
    const headers: HeadersInit = {
	// method: 'GET',
	
		'X-RapidAPI-Key': '6f1f5cc904mshfb2306d32c297a5p1e9eeajsn5e1663138563',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	
    };
    try {
        const response = await fetch(
            `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
            {headers: headers});
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
      
    searchParams.set(type, value);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    return newPathname;
}

// pending
export const generateCarImageUrl = (car: CarProps, angle?: string) => {

}


