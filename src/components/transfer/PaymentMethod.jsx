/* eslint-disable react/prop-types */

import { useDataStore } from "../../store/Global";
import { BiTransfer } from "react-icons/bi";



const PaymentMethod = ({goNext,editMode}) => {
  const {updateData}=useDataStore()
  const handlePaymentMethod=(method)=>{
    updateData({paymentMethod:method})
    if (!editMode) {
      goNext()  
    }
  }

  return (
    <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
     {!editMode&& <h1 className="text-2xl font-bold mb-4">Payment Method</h1>}
      <div className="w-full flex flex-col gap-6">
    <div className="flex flex-col gap-4">
    <div
          className="border p-4 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-start gap-2"
          onClick={()=>handlePaymentMethod('Card')}
        >
        
        <img alt="" src="https://dqyag3aekzepn.cloudfront.net/narwhal-assets/compressed/fee8e36ec9a9a54c618047ac2fbdfa86.svg" width={50} height={50} />
          <p className="text-lg">Card</p>
        </div>

        <div
          className="border p-4 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-start gap-2"
          onClick={()=>handlePaymentMethod('Transfer')}
        >
        <div className="bg-blue-300 py-1.5 px-4 rounded-lg text-white">
        <BiTransfer size={25} />
        </div>
          <p className="text-lg">Bank Transfer</p>
        </div>
    </div>
        <p className='text-sm'>Credit cards and business debit cards may charge a cash advance fee. To avoid extra fees, use a personal debit card.</p>

        <p className="underline text-blue-500 cursor-pointer mx-auto">Pay with Bank Account instead</p>
      </div>
    </div>
  );
};

export default PaymentMethod;
