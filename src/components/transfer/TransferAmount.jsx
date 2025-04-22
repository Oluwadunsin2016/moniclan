/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react'
import { Button, Popover, PopoverTrigger, PopoverContent, Spinner, Input } from "@nextui-org/react";
import useTransaction, { useDataStore } from '../../store/Global';
import { useShallow } from 'zustand/react/shallow';
import axios from 'axios';
import countries from '../../lib/countries';
import CountryFlag from '../ui/CountryFlag';
import { cn, formatCurrency, notifier } from '../../lib/utils';
import { useAuth } from '../../lib/AuthContext';


const TransferAmount = ({goNext,editMode}) => {
   const { user } = useAuth();
   const [loading, setLoading] = useState(false)
  const {data,updateData}=useDataStore()
  const [to, from] = useTransaction(
    useShallow((state) => [state.data.to, state.data.from])
  );
  // const [selectedMethod, setselectedMethod] = useState('auto')
  // const [exchangeRate, setExchangeRate] = useState('')
  
  
    useEffect(() => {
      const getData=async()=>{
        if (data.amount) {
          // const result = await fetchConvertedAmount(data.amount);
          const result = await handleCalculate(data.amount);
          updateData({convertedAmount:result});
        }
      }

      getData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.amount, from, to]);

    useEffect(() => {
      updateData({from:countries[from]?.currencyCode,to:countries[to]?.currencyCode});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to])
    


    useEffect(() => {
      const getData=async()=>{
        // const result = await fetchConvertedAmount(1);
        const result = await handleCalculate(1);
        console.log("exchange rate:",result);
        
        updateData({exchangeRate:result});
      }

      getData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to]);
  
    // const fetchConvertedAmount = async (num) => {
    //   if (!num) return;
    //   if (selectedMethod=='mannual') {
    //     const convertedAmount=exchangeRate*num
    //     return convertedAmount
    //   }else{
    //     try {
    //       const response = await fetch(
    //         `/api/convert?amount=${num}&from=${countries[from]?.currencyCode}&to=${countries[to]?.currencyCode}`
    //       );
    //       const data = await response.json();
          
          
    //       return data?.convertedAmount;
    //       // setConvertedAmount(data.convertedAmount?.toFixed(2) || "Error");
    //     } catch (error) {
    //       console.error("Conversion Error:", error);
    //     }
    //   }
  
    // };

    // const fetchExchangeRate = async (num) => {
    //   if (!num) return;
  
    //   try {
    //     const response = await fetch(
    //       `/api/convert?amount=${num}&from=${countries[from]?.currencyCode}&to=${countries[to]?.currencyCode}`
    //     );
    //     const data = await response.json();
        
    //     return data?.convertedAmount;
    //   } catch (error) {
    //     console.error("Conversion Error:", error);
    //   }
    // };

const continuePayment=()=>{
    if (user) {
      goNext()
    }else{
      notifier({message:'Sign in to continue',type:'error'})
    }

}

// const handleSelect = (e)=>{
//   setselectedMethod(e.currentKey)
// }

const handleCalculate = async (amount) => {
  console.log('from:',countries[from],'to:',countries[to])
  try {
    setLoading(true)
    const response = await axios.get("https://dashboard-backend-hazel-five.vercel.app/api/get-rate", {
      params: { fromCountryCode: countries[from]?.code, toCountryCode: countries[to]?.code },
    });
    console.log("response:",response);
    
    if (response.status === 200) {
      const exchangeRate = response.data.rate;
      
      const calculatedAmount = parseFloat(amount) * exchangeRate;
      setLoading(false)
      return calculatedAmount;
      // return calculatedAmount.toFixed(2);
    } else {
      setLoading(false)
      return 0
    }
  } catch (error) {
      //  notifier({message:err.response.data.error,type:'error'});
            setLoading(false)
         return 0;
  }
};

  return (
      <div>
        {/* <CurrencyConverter /> */}
      <div className="bg-gray-300 my-4 p-6">
      {/* <div className='mb-2'>
      <label htmlFor="" className='mb-4'>Select Exchange Method</label>
         <Select onSelectionChange={(e)=>handleSelect(e)}>
        <SelectItem key='auto' value='auto'>
          Automatic
        </SelectItem>
        <SelectItem key='mannual' value='mannual'>
          Mannual
        </SelectItem>
    </Select>

    {selectedMethod==='mannual' && <div  className='my-4'>
      <label htmlFor="" className='mb-4'>Exchange rate</label>
     <Input
          size='lg'
            type="number"
            placeholder='Enter the exchange rate'
            value={exchangeRate}
            onChange={(e) => setExchangeRate(e.target.value)}
          />
    </div> 
        }
    </div> */}
        <div>
          <strong className="font-light">You send</strong>
          <div className="flex items-center  bg-white border p-2">
            <p className="bg-inherit">
              {/* <CountryFlag
                rounded
                code={countries[from]?.code}
                className=" rounded-md w-10 h-7"
              /> */}
              <SelectCountries  indacator="from" />
            </p>
            <Input
              clearable
              bordered={false}
              className="!outline-none !text-xl !rounded-none bg-inherit"
              fullWidth
              type="number"
              onWheel={(e) => e.target.blur()}
              value={data.amount}
        onChange={(e) => updateData({amount:e.target.value})}
              placeholder="Enter amount"
              css={{
                "& input": {
                  paddingLeft: 0,
                },
              }}
            />
            {countries[from]?.currencyCode}
          </div>
        </div>

        <div className=" mt-4">
          <strong className="font-light">They recieve</strong>
          <div className="flex items-center bg-white border p-2">
            <Button disabled className="bg-inherit">
              <CountryFlag
                rounded
                code={countries[to]?.code}
                className=" rounded-md w-10 h-7"
              />
            </Button>
            <Input
              clearable
              bordered={false}
              className="!outline-none !text-xl !rounded-none bg-inherit"
              fullWidth
              type="number"
              readOnly
              onWheel={(e) => e.target.blur()}
              value={data.convertedAmount}
              placeholder="Enter amount"
              css={{
                "& input": {
                  paddingLeft: 0,
                },
              }}
            />
            {countries[to]?.currencyCode}
          </div>
        </div>
      </div>
      <div className="bg-white p-6  my-3 rounded-sm">
        <p className="text-lg">Current exchange rate</p>
     { !loading&&data.exchangeRate==0? <div>
            <p>No exchange rate available between {countries[from]?.name} and {countries[to]?.name}</p>
           </div> :   <div>
        {loading? <div className="h-[3rem] flex items-center justify-center">
            <Spinner color="primary" />
            </div>:
        <strong>
          {/* {countries[from]?.currencyCode} 1 = {fetchExchangeRate(1)} {countries[to]?.currencyCode}{" "} */}
          {formatCurrency(countries[from]?.currencyCode,1)} = {formatCurrency(countries[to]?.currencyCode,data.exchangeRate)}
        </strong>
            }
        </div>}
      </div>
      <hr className="border-2 w-[98%] block mx-auto" />
      <button className="bg-gray-300  p-4 w-[98%] rounded-sm mt-3 mx-auto block ">
        <span className="flex text-lg py-2 justify-between">
          <span>Flat free</span>
          <span>000</span>
        </span>
        <hr className="border" />
        <div className="flex text-lg py-2 justify-between">
          <span>Total</span>
          <span>{formatCurrency(countries[from]?.currencyCode,data.amount||0)}</span>
        </div>
      </button>
{!editMode&&
      <div>
      <Button 
        onPress={continuePayment}
        size="md"
        className="bg-primary w-full transition-all hover:scale-100 text-white rounded-md my-6 text-lg py-6"
      >
        Continue
      </Button>

      <p className="text-lg font-Inter mt-4">
        <span className="font-bold italic">New customer offer applied</span>:
        promotional exchange rate for the first 500 USD of this transfer.
        Standard rate applies to the remainder of this transfer.
      </p>
      </div>
}
    </div>
  )
}

export default TransferAmount


const SelectCountries = ({ indacator }) => {
  const [open, setOpen] = useState(false);
  const [to, from, updateData] = useTransaction(
    useShallow((state) => [state.data.to, state.data.from, state.updateData])
  );
  const data = indacator === "from" ? from : to;

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
            code={countries[data]?.code}
            className=" rounded-md w-10 h-7"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
        <div className="px-4 py-2 w-[200px] gap-4 grid grid-cols-1 overflow-y-scroll  custom-scrollbar">
          {countries.map((country, index) =>
            index === (indacator === "from" ? to : from) ? null : (
              <Button
                key={index}
                onPress={() => {
                  updateData({ [indacator]: index });
                  setOpen(false);
                }}
                className={cn(
                  "flex flex-col h-11 gap-1 items-stretch rounded-md hover:bg-primary-500 hover:text-white",
                  { "border-2 border-primary-500": data === index }
                )}
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