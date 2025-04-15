/* eslint-disable react/prop-types */
import { useDataStore } from '../../store/Global';
import { Button, Select, SelectItem } from '@nextui-org/react'

const SenderReason = ({goNext,editMode}) => {
 const {updateData}=useDataStore()
 const paymentReasons = [
    { key: "savings", value: "Savings" },
    { key: "familySupport", value: "Family Support" },
    { key: "insurancePayment", value: "Insurance Payment" },
    { key: "realEstatePurchase", value: "Real Estate Purchase" },
    { key: "education", value: "Education" },
    { key: "medicalPayment", value: "Medical Payment" },
    { key: "travelPayment", value: "Travel Payment" },
    { key: "tradeTransaction", value: "Trade Transaction" },
    { key: "utilityPayment", value: "Utility Payment" },
    { key: "taxPayment", value: "Tax Payment" },
    { key: "loanPayment", value: "Loan Payment" },
  ];

const ContinueToNext=()=>{
goNext()
}

const handleSelect=(e)=>{
  updateData({'reason':e.currentKey})

}
  return (
               <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
                {!editMode&&
   <div className='mb-4'>
      <h1 className="text-2xl font-bold mb-2">Reason for Sending</h1>
   </div>
                }
      <div className="w-full">
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>Reason for Sending</label>
         <Select onSelectionChange={(e)=>handleSelect(e)} label="Select a reason">
      {paymentReasons.map((reason) => (
        <SelectItem key={reason.value} value={reason.value}>
          {reason.value}
        </SelectItem>
      ))}
    </Select>
       <p className='text-sm text-gray-400 mt-2'>We are required by law to collect this information.</p>
      </div>
      
{!editMode
&&
     <Button onPress={ContinueToNext} color='primary' className='mt-8 w-full rounded-md text-medium'>Continue</Button>
}
      </div>
    </div>
  )
}

export default SenderReason