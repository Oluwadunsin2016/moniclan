/* eslint-disable react/prop-types */

import { Button, } from "@nextui-org/react";
import { useDataStore } from '../../store/Global';

const DeliveryMethod = ({goNext,editMode}) => {
  const {updateData}=useDataStore()
const choosePlan=(method)=>{
  updateData({deliveryMethod:method})
  if (!editMode) {
    goNext()  
  }
}
  return (
    <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
     {!editMode&& <strong className="text-xl font-Roboto ">Delivery method</strong>}
      <p className="text-lg font-Inter">Choose the mean in which you want your money to be delivered</p>
      <div className="gap-4">
        <Button color='primary' onPress={()=>choosePlan("Bank Deposit")} className=" mt-4 text-black-200 w-full transition-all hover:scale-100 text-white rounded text-lg py-6">
          Bank deposit
        </Button>
      </div>
  </div>
  )
}

export default DeliveryMethod