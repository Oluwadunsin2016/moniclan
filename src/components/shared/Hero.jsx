/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";
import useTransaction from "../../store/Global";
import countries from "../../lib/countries";
import { formatCurrency } from "../../lib/utils";

const formatNumber = (value) => {
  const parts = value.split(".");
  const integerPart = parts[0].replace(/,/g, ""); 
  const decimalPart = parts[1] ? "." + parts[1] : ""; 
  const formattedInteger = Number(integerPart).toLocaleString("en-US");
  return formattedInteger + decimalPart;
};

const countriesData = countries;
const Hero = () => {
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [to, from] = useTransaction(
    useShallow((state) => [state.data.to, state.data.from, state.updateData])
  );
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)
  const fromCountry = countriesData[from];
  const toCountry = countriesData[to];

    useEffect(() => {
      const getData=async()=>{
        const result = await handleCalculate(amount??0);
        
        setConvertedAmount(result);
      }
      
      getData()
    }, [amount,from, to]);


    useEffect(() => {
      const getData=async()=>{
        const result = await handleCalculate(1);
        console.log("result: " + result);
        setExchangeRate(result);
      }
      
      getData()
    }, [to, from,]);
    
    


  
  const handleCalculate = async (amount) => {
      try {
        console.log("from",from)
        console.log("To",to)
        setLoading(true)
        const response = await axios.get("https://dashboard-backend-hazel-five.vercel.app/api/get-rate", {
          params: { fromCountryCode: fromCountry?.code, toCountryCode: toCountry?.code },
        });
        console.log('response:',response);
        if (response.status === 200) {
          const exchangeRate = response.data.rate;
          const calculatedAmount = parseFloat(amount) * exchangeRate;
          setLoading(false)
          return calculatedAmount.toFixed(2);
        } else {
          setLoading(false)
          return 0;
        }
      } catch (err) {
        // notifier({message:err.response.data.error,type:'error'});
        setLoading(false)
     return 0;
      }
    };


  const handleChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9.,]/g, "");
    const formattedValue = formatNumber(sanitizedValue);
    setAmount(formattedValue);
  };

  const handleSelect = (item, index) => {
    setAmount(item);
    setSelectedIndex(index);
  }

  console.log(exchangeRate);
  




  // const handleKeyDown = (event) => {
  //   if (
  //     event.key === "ArrowUp" ||
  //     event.key === "ArrowDown" ||
  //     event.key === "e"
  //   ) {
  //     event.preventDefault();
  //   }
  // };
  return (
    <section className=" bg-[#D3EAEC] pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center  justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="sm:w-2/3 flex flex-col items-center justify-center">
            <Button size="lg" radius="sm" color="primary" className="mb-4">
              New customer offer
            </Button>
            <strong className="text-4xl text-center">
              Send money from {fromCountry?.name} to {toCountry?.name}
            </strong>
            <p className="text-xl  mt-4 text-center">
              Enjoy a special exchange rate on your first transfer, and no fees
              on all transfers
            </p>
          </div>
        </div>
        <div>
          <Card className="bg-white  mt-10 sm:mt-0 sm:w-[500px] shadow-inner py-11 relative mx-auto sm:mx-0  sm:top-[10%] flex flex-col gap-4 rounded-3xl px-6">
            <strong>You Send</strong>
            <div className="flex h-[50px] gap-2 items-center">
              <Input
                required=""
                // className="bg-transparent  px-3 py-1 rounded-l-lg focus:outline-none w-full"
                pattern="^[0-9,]*$"
                id="currency-input"
                name="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="1,234,567.89"
              />
              <span className="mr-2">{fromCountry?.currencyCode}</span>
            </div>
            <p className="">Or select an amount</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 sm:gap-3 gap-1">
              {[100,200, 500, 1000].map((item, index) => (
                <Button
                  key={index}
                  onPress={() => handleSelect(item, index)}
                  className={`${selectedIndex==index?'bg-gray-100':'bg-white'} w-full h-[45px] rounded-2xl border shadow-sm transition-all duration-150  ease-in-out`}
                >
                  {item} {fromCountry?.currencyCode}
                </Button>
              ))}
            </div>
            <strong>They receive</strong>
            <div className="flex h-[50px] gap-2 items-center">
              <Input
                required=""
                // className="bg-transparent  px-3 py-1 rounded-l-lg focus:outline-none w-full"
                pattern="^[0-9,]*$"
                id="currency-input"
                name="text"
                readOnly
                type="text"
                value={loading?'Please wait...':formatCurrency(countries[to]?.currencyCode,convertedAmount)}
                 placeholder="1,234,567.89"
              />
              <span className="mr-2">{toCountry?.currencyCode}</span>
            </div>
            <div>
              <p className="text-[#862796]">Special rate</p>
           {!loading&&exchangeRate==0? <div>
            <p>No exchange rate available between {fromCountry?.name} and {toCountry?.name}</p>
           </div> : <div>
              <span className="font-bold">{formatCurrency(countries[from]?.currencyCode,1)}</span> = <span className="font-bold">{loading?<Spinner size="sm" color="primary" />:formatCurrency(countries[to]?.currencyCode,exchangeRate)}</span> 
              </div>}
              {/* <div className="mt-3 flex flex-col gap-2">
                <span className="flex justify-between font-bold ">
                  <span>Fee</span>
                  <span className="text-primary-600 ">Zero fees</span>
                </span>
                <span className="flex justify-between font-bold">
                  <span>Total cost</span>
                  <span>100.00 USD</span>
                </span>
              </div> */}
            </div>
            {/* <Button size="lg" radius="sm" color="primary">
              Get this rate
            </Button> */}
          </Card>
        </div>
      </div>
      <div className="text-center text-md sm:px-36 py-6">
        New customers only. One per customer. Limited time offer. Any rates
        shown are subject to change. Promotional FX rate applies to first 500.00
        USD sent. See Terms and Conditions for details.
      </div>
    </section>
  );
};

export default Hero;
