import React, { MouseEventHandler } from "react";

export type CustomButtonProps = {
    title: string;
    btnType?: "button" | "submit";
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    textStyles?: string;
    rightIcon?: string;
    isDisabled? : boolean;
}

export type SearchManufacturerProps = {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}

export type CarProps = {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export type FilterProps = {
    manufacturer: string;
    model: string;
    year: number;
    fuel: string;
    limit: number;
}

export type OptionProps = {
    title: string;
    value: string;
}

export type CustomFilterProps = {
    title: string;
    options: OptionProps[];
    setFilter: (value: string) => void;
}

export type ShowMoreProps = {
    pageNumber: number;
    isNext: boolean;
    setLimit: (newLimit: number) => void;
}