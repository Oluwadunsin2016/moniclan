/* eslint-disable react/prop-types */
import { Tooltip } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { useDataStore } from "../../../store/Global";
import { formatCurrency } from "../../../lib/utils";

const AmountDelivery = ({onOpen}) => {
    const {data,setEditMode}=useDataStore()

    const handleEdit=(fieldName)=>{
      setEditMode({status:true,fieldName})
      onOpen()
    }
    
    
  return (
    <div>
      <h1 className="font-semibold text-2xl border-b-2">Amount and Delivery</h1>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <div>
              <p>Amount</p>
              <span className="font-semibold">{formatCurrency(data?.from,data?.amount)??'N/A'}</span>
            </div>
            <div>
              <p>They receive</p>
              <span className="font-semibold">{formatCurrency(data?.to,data?.convertedAmount)??'N/A'}</span>
            </div>
          </div>

          <Tooltip content='Edit'>
          <CiEdit size={28} onClick={()=>handleEdit('Transfer Amount')} className="cursor-pointer" />
          </Tooltip>
        </div>
        <hr />
        <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Delivery Method</p>
              <span className="font-semibold">{data?.paymentMethod??'N/A'}</span>
            </div>

          <Tooltip content='Edit'>
          <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Delivery Method')} />
          </Tooltip>
        </div>
        <hr />
        <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Bank</p>
              <span className="font-semibold">{data?.recipient_accountDetails?.bank_name??'N/A'}</span>
            </div>

          <Tooltip content='Edit'>
          <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Recipient Bank')}  />
          </Tooltip>
        </div>
        <hr />
        <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">NUBAN</p>
              <span className="font-semibold">{data?.recipient_accountDetails?.account_number??'N/A'}</span>
            </div>

          <Tooltip content='Edit'>
          <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Account Number')} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AmountDelivery;
