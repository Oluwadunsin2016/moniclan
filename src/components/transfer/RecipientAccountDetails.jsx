/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
// import {verifyAccountNumber} from '.../.../lib/api'
import { ImSpinner8 } from "react-icons/im";

import { Button, Input } from "@nextui-org/react";
import { useDataStore } from "../../store/Global";
import { verifyAccountNumber } from "../../apis/account";
import { debounce } from "../../lib/utils";
const RecipientAccountDetails = ({ goNext,editMode }) => {
  const { data,bank, updateData } = useDataStore();
  const [isAccountVerified, setIsAccountVerified] = useState({
    message: "",
    status: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [accountNo, setAccountNo] = useState("");

  const ContinueToNext = () => {
    if (isAccountVerified.status) {
      goNext();
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (accountNo.length <= 11) {
      setAccountNo(value);
    }

    // setValue(name, value);
    // debouncedValidateAccountNumber({
    //   bank_code: bank.code,
    //   account_number: value,
    // });
  };


  const validateAccountNumber = async(payload) => {
    console.log(data);
    console.log(payload);
    setIsLoading(true);
    const response = await verifyAccountNumber(payload);
    if (response.type == "success") {
      setIsLoading(false);
      console.log("result: ", response.result);
      console.log("data:", data);
      console.log("recipient_accountDetails:", data.recipient_accountDetails);

      console.log("recipient_accountDetails:", {
        ...data.recipient_accountDetails,
        ...response.result,
      });
      // const {account_name,...rest} =response.result
      // const accountNameParts = account_name?.toLowerCase().split(" ") || [];
      updateData({
        recipient_accountDetails: {
          ...data.recipient_accountDetails,
          ...response.result
          // ...rest,firstName:accountNameParts[0],lastName:accountNameParts[1]
        },
      });
      setIsAccountVerified({ message: "Correct", status: true });
    } else {
      setIsLoading(false);
      setIsAccountVerified({
        message: "Not a valid account number",
        status: false,
      });
    }
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValidateAccountNumber = useCallback(
    debounce((payload) => {
      validateAccountNumber(payload, data);
    }, 500), // 500ms delay
    []
  );

  useEffect(() => {
    if (accountNo.length == 10 && bank.code) {
      validateAccountNumber({
        bank_code: bank?.code,
        account_number: accountNo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNo, bank]);

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        console.log('backspace or delete key pressed');
    }else if (accountNo.length >= 10) {
      event.preventDefault(); // Prevent further input when length is 10
    }
  };

  // useEffect(() => {
  //   return () => {
  //     debouncedValidateAccountNumber.cancel();
  //   };
  // }, [debouncedValidateAccountNumber]);

  // const verifyAccount=async(value)=>{
  //   setIsLoading(true)
  //   const data=await verifyAccountNumber({account_number:value,bank_code:bank.code})
  //   if(data.type=='success'){
  //   setIsLoading(false)
  //   setAccountDetails(data.result)
  //   setIsAccountVerified({message:'Correct',status:true})
  //   }else{
  //   setIsLoading(false)
  //   setIsAccountVerified({message:'Not a valid account number',status:false})
  //   }
  //   }

  //   const debounce = (func, delay) => {
  //     let timeout;
  //     return (...args) => {
  //       clearTimeout(timeout);
  //       timeout = setTimeout(() => func(...args), delay);
  //     };
  //   };

  //   const handleSearchChange = debounce((e) => verifyAccount(e.target.value), 300);

  return (
    <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
      {!editMode &&
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Recipient Bank Details</h1>
        <p>Enter your recipient&apos;s {data?.recipient_accountDetails?.bank_name} account details.</p>
      </div>
      }
      <div className="w-full">
        <div>
          <label htmlFor="">NUBAN</label>
          <Input
            size="lg"
            type="number"
            placeholder="e.g 1234567890"
            className="mb-4 rounded-md"
            onKeyDown={handleKeyDown}
            onChange={handleSearchChange}
          />

          <p
            className={`${
              isAccountVerified.status ? "text-green-600" : "text-red-500"
            } text-sm font-semibold flex items-center`}
          >
            {isLoading ? (
              <ImSpinner8
                size={15}
                className="animate-spin text-gray-500 mt-2"
              />
            ) : (
              isAccountVerified?.message
            )}
          </p>
        </div>

        <div className="flex items-center gap-4 px-4">
          <RiErrorWarningLine size={25} />
          <p className="text-sm">
            Please verify your recipient&apos;s account information. You can
            lose the transfer amount if incorrect information is provided.
          </p>
        </div>
      {!editMode &&  <Button
          onClick={ContinueToNext}
          color="primary"
          className="mt-8 w-full rounded-md text-medium"
        >
          Continue
        </Button>}
      </div>
    </div>
  );
};

export default RecipientAccountDetails;
