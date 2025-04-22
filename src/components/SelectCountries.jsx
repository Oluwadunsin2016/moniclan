/* eslint-disable react/prop-types */
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import CountryFlag from "./ui/CountryFlag";
import useTransaction from "../store/Global";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import countries from "../lib/countries";

const SelectCountries = ({ indacator }) => {
    const [open, setOpen] = useState(false);
    const [to, from, updateData] = useTransaction(
      useShallow((state) => [state.data.to, state.data.from, state.updateData])
    );
    const data = indacator === "from" ? from : to;
   const countriesData =countries
  
  
    return (
      <Popover
        isOpen={open}
        onOpenChange={setOpen}
        placement="bottom-end"
        showArrow={true}
      >
        <PopoverTrigger>
          <Button className="bg-inherit bordered">
            <CountryFlag
              rounded
              code={countriesData[data]?.code}
              className=" rounded-md w-10 h-7"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
          <div className="px-4 py-2 w-[200px] gap-4 grid grid-cols-1 overflow-y-scroll  custom-scrollbar">
            {countriesData.map((country, index) =>
              index === (indacator === "from" ? to : from) ? null : (
                <Button
                  key={index}
                  onPress={() => {
                    updateData({ [indacator]: index });
                    setOpen(false);
                  }}
                  className={`flex flex-col h-11 gap-1 items-stretch rounded-md hover:bg-primary-500 hover:text-white ${data === index && "border-2 border-primary-500"}
                  `}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <CountryFlag
                      rounded
                      code={country.code}
                      className="h-7 w-7"
                    />
                    <p className="text-sm font-medium">{country.name}</p>
                  </div>
                </Button>
              )
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  export default SelectCountries