"use client";

import { SearchManufacturerProps } from '@/types'
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition} from '@headlessui/react';
import Image from 'next/image';
import { useState, Fragment } from 'react';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({
    setSelected, 
    selected}
    : SearchManufacturerProps) => {
    
        const [query, setQuery] = useState('');
    
        const filterManufacturers = query === "" ?
            manufacturers: manufacturers.filter((item: string) => (
            item.toLowerCase().replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        ))
  return (
    <div className='search-manufacturer'>
        <Combobox value={selected} onChange={setSelected}>
            <div className='relative w-full'>
                <ComboboxButton className="absolute top-[14px]">
                    <Image 
                    src="/car-logo.svg"
                    width={20}
                    height={20}
                    className="ml-4"
                    alt="Car Logo">

                    </Image>
                </ComboboxButton>
                <ComboboxInput
                    className="search-manufacturer__input"
                    placeholder='Volkswagen'
                    displayValue={(manufacturer: string) => 
                      manufacturer  
                    }
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Transition as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
                >
                    <ComboboxOptions className="max-h-[300px] overflow-y-auto">
                        {filterManufacturers.length === 0 && 
                        query !== "" ? (
                            <ComboboxOption
                            value={query}
                            className="search-manufacturer__option">
                                Create "{query}"
                            </ComboboxOption>
                        ):
                        (
                           filterManufacturers.map((item) => (
                            <ComboboxOption key={item}
                            className={({active}) => `relative search-manufacturer__option
                            ${active ? 'bg-primary-blue text-white': 'text-black-900'} ` }
                            value={item}
                            >
                             {({selected, active}) => (
                                <>
                                    <span
                                    className={`block truncate 
                                    ${selected ? 'font-medium' : 'font-normal'}`}>
                                        {item}
                                    </span>
                                    {selected ? 
                                    (
                                        <span 
                                        className={`absolute
                                        inset-y-0 left-0 flex
                                        items-center pl-3
                                        ${active ? 'text-white' : 'text-teal-600'}`}>

                                        </span>
                                    ): null}
                                </>
                             )}
                            </ComboboxOption> 
                           )) 
                        )}
                    </ComboboxOptions>
                </Transition>

            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer