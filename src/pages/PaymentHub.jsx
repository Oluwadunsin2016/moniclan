/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { FaCcVisa } from "react-icons/fa";
import { FaSync } from "react-icons/fa";
import { PaystackButton } from "react-paystack";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Spinner, } from "@nextui-org/react";
import { DatePicker, Select } from "antd";
import PaymentModal from "../components/hub/PaymentModal";
import { useCalculateCurrencyMutation } from "../apis/calculate";
import { useAuth } from "../lib/AuthContext";
import { formatCurrency, notifier } from "../lib/utils";
import { useDataStore } from "../store/Global";
import FileUpload from "../components/shared/FileUpload";
import { useCancelSubscription, useGetActiveSubscription } from "../apis/transaction";
import { services } from "../lib/data";
import axios from "axios";
import StripeModal from "../components/hub/StripeModa";
import SuccessModal from "../components/hub/SuccessModal";

const PaymentHubPage = () => {
  const { user } = useAuth();
  const [isLoading,setIsLoading]=useState(false)
  const [isStripeLoading,setIsStripeLoading]=useState(false)
  const [service, setService] = useState("");
  const [plan, setPlan] = useState("onetime-off");
  const [period, setPeriod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [usdAmount, setUsdAmount] = useState('');
  const [checkoutLink, setCheckoutLink] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [nairaAmount, setNairaAmount] = useState('');
const [exchangeRate, setExchangeRate] = useState('')
const [idCard, setIdCard] = useState('')
const [bvn, setIdBvn] = useState('')
const [error, setError] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);
const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  
const {data}=useGetActiveSubscription(user?._id)

  const {mutateAsync, isPending}=useCalculateCurrencyMutation()
   const {updateData}=useDataStore()
  ;

  const handleConvert = async() => {
   const {convertedAmount,exchangeRate} = await mutateAsync({amount:usdAmount, from:'US', to:'NG'})
   setExchangeRate(exchangeRate)
   setNairaAmount(convertedAmount)
  };

  // const handleGetConvertedAmount=async()=>{
  //   const data = await handleConvert(usdAmount)
  //   setNairaAmount(data)
  // }

  console.log("nairaAmount:",nairaAmount);
  const notAvailable=plan=="onetime-off"?!bvn:!idCard || !bvn || !period
  const disable=!service || !nairaAmount || !startDate || notAvailable || error

  // useEffect(() => {
  //   const fetchExchangeRate = async () => {
  //     const data = await handleConvert(1)
  //   setExchangeRate(data)
  //   }
  //   fetchExchangeRate()
  // }, [])
  

  useEffect(() => {
    updateData({
      service,
      convertedAmount: nairaAmount,
      amount: usdAmount,
      paymentMethod: "Transfer",
      from: "USD",
      to: "NGN",
      exchangeRate,
      plan,
      bvn,
      startDate,
      period,
      reason:'Payment for service',
      type:'Payment Hub',
      recipient_accountDetails: {
        account_name: "Moniclan Payment Platform",
        account_number: "0216662574",
        bank_name: "Guranty Trust Bank",
        email: "cittiescitties@gmail.com",
        phone_number: "08178654389"
      },
      senderDetails: user,
    });
  }, [service,nairaAmount,plan,bvn,period,startDate])


  
  
  

  // Paystack configuration
  const publicKey = "pk_test_bc994b313ae14fef8d8f893742a7a68f283527b9"; // Replace with your Paystack public key
  const paystackAmount = nairaAmount * 100; // Convert to kobo

  const componentProps = {
    email:user?.email,
    amount: paystackAmount,
    currency: "NGN",
    publicKey,
    text: "Pay with Paystack",
    metadata: {
      service: service, // Netflix, Spotify, etc.
      checkoutLink: checkoutLink, // Product link if available
    },
    onSuccess: () => alert("Payment successful!"),
    onClose: () => alert("Payment canceled"),
  };


const handleSelect=(e)=>{
console.log("Selected plan:", e);
setPlan(e)
}
const handleSelectPeriod=(e)=>{
console.log("Selected period:", e);
setPeriod(e)
}

const handleSelectService=(e)=>{
const existed =  data?.data?.subscriptions?.find(sub=>sub.service==e)

if (existed) {
  notifier({message:`You have already subscribed for ${e}`,type:'error'})
}else{
  console.log("Selected service:", e);
  setService(e)
}
}
  
const handleComplete=()=>{
  setUsdAmount('')
  setNairaAmount('')
  setExchangeRate('')
  setIdCard('')
  setIdBvn('')
  setPlan('onetime-off')
  setService('')
}

const handleMakeTransfer=async()=>{
  if (!user) return  notifier({message:'Sign in to continue the transactions',type:'error'})
  try {
if (idCard) {
  setIsLoading(true)
  const formData = new FormData()
  formData.append('media',idCard)
  const response = await axios.post('https://backendurl.cittis.co/user/upload_media',formData)
  console.log(response.data.data);
  updateData({idCard:response.data.data})
  setIsLoading(false)
}
    setIsOpen(true) 
  } catch (error) {
    notifier({message:'An error occurred while uploading Id card',type:'error'})
  }
}


const handleStripePaymentOpen=async()=>{
  if (!user) return  notifier({message:'Sign in to continue the transactions',type:'error'})
  try {
if (idCard) {
  setIsStripeLoading(true)
  const formData = new FormData()
  formData.append('media',idCard)
  const response = await axios.post('https://backendurl.cittis.co/user/upload_media',formData)
  console.log(response.data.data);
  updateData({idCard:response.data.data})
  setIsStripeLoading(false)
}
setIsModalOpen(true) 
  } catch (error) {
    notifier({message:'An error occurred while uploading Id card',type:'error'})
  }
}






const handleBVNChange = (e) => {
  const val = e.target.value;
  if (/^\d{0,11}$/.test(val)) {
    setIdBvn(val);
    if (val.length === 11) {
      setError(""); // valid
    }
  }
};

const handleBlur = () => {
  if (bvn.length !== 11) {
    setError("Enter your eleven digit BVN");
  } else {
    setError("");
  }
};
const onChange = (_, dateString) => {
  console.log(dateString);
  
  setStartDate(dateString);
}


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      {/* ATM Card UI */}
      <div className="relative w-96 h-56 bg-blue-700 text-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between">
          <span className="text-xl font-semibold">UBA</span>
          <FaCcVisa className="text-3xl text-white" />
        </div>
        <div className="mt-6 text-lg tracking-wider">**** **** **** 4321</div>
        <div className="mt-4 space-y-2">
          <span className="text-sm">Card Holder</span>
          {/* <div className="text-xl font-semibold">{fullName || "Your Name"}</div> */}
          <div className="text-xl font-semibold">{user?.firstName} {user?.lastName}</div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-white mt-8 p-6 rounded-lg shadow-md w-full">
        <div className="flex items-center justify-end">
     <ActiveSubScription subscriptions={data?.data?.subscriptions} />
        </div>
        <h2 className="text-lg font-semibold mb-4 whitespace-nowrap">Pay for your services</h2>

     <label className="block mt-4 font-medium text-gray-700">
            Plan
          </label>
          <Select
            style={{
              width: "100%",
            }}
            placeholder="Please select plan"
            value={plan}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            name="plan"
            size="large"
            className="w-full"
            onChange={(e) => handleSelect(e)}
            options={[{value:'onetime-off', label:'One-time Off'},{value:'recurrence', label:'Recurrence'}]}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          />

<div>

{plan!=='onetime-off' &&  <div>

  <label className="block mt-4 font-medium text-gray-700">
            Period
          </label>
          <Select
            style={{
              width: "100%",
            }}
            placeholder="Please select plan"
            value={period}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            name="period"
            size="large"
            className="w-full"
            onChange={(e) => handleSelectPeriod(e)}
            options={[{value:'3', label:'Three Months'},{value:'6', label:'Six Months'},{value:'12', label:'Twelve Months'}]}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          />
  </div>}

<label className="block mt-4 font-medium text-gray-700">
            Start date
          </label>
<DatePicker    style={{
              width: "100%",
              height: '40px'
            }} onChange={onChange} />
<label className="block mt-4 font-medium text-gray-700">
            BVN
          </label>
          <Input
        radius="sm"
        variant="bordered"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={bvn}
        onChange={handleBVNChange}
        onBlur={handleBlur}
        maxLength={11}
        isInvalid={!!error}
        errorMessage={error}
        classNames={{
          inputWrapper:
            "border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm",
        }}
        placeholder="Enter 11-digit BVN"
      />
</div>
<div className={`${plan=='onetime-off'&&'hidden'}`}>
<label className="block mt-4 font-medium text-gray-700">
            ID Card
          </label>
          <p className="text-xs text-gray-500  mb-2">Provide a valid ID card e.g voter&apos;s card, driver&apos;s licence etc</p>
          <FileUpload plan={plan} setIdCard={setIdCard}/>
</div>
  
        {/* Select Service */}
        <label className="block mt-4 font-medium text-gray-700">Select Service</label>
        <Select
          showSearch
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select service"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            name="plan"
            size="large"
            className="w-full"
            value={service}
            onChange={(e) => handleSelectService(e)}
            options={services}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          />
        {/* <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose a service</option>
          {services.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select> */}

        {/* USD Amount */}
        <label className="block mt-4 font-medium text-gray-700">Amount in USD</label>
        <input
          type="number"
          value={usdAmount}
          onChange={(e) => setUsdAmount(e.target.value)}
          placeholder="Enter amount in USD"
          className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={usdAmount === ""||isPending}
          className="flex items-center justify-center w-full mt-4 bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isPending? <span className="flex item-center justify-center gap-1"><FaSync className="w-5 h-5 ml-2 animate-spin duration-500" /> Converting</span> :'Convert to Naira'}
        </button>

        {/* Naira Amount */}
        <label className="block mt-4 font-medium text-gray-700">Amount in Naira</label>
        <input
          type="text"
          value={nairaAmount?formatCurrency('NGN',nairaAmount):''}
          readOnly
          className="w-full mt-1 p-2 border bg-gray-100 rounded-lg"
        />

        {/* Checkout Link */}
        <label className="block mt-4 font-medium text-gray-700">Product Checkout Link</label>
        <input
          type="text"
          value={checkoutLink}
          onChange={(e) => setCheckoutLink(e.target.value)}
          placeholder="Paste checkout link"
          className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Paystack Payment Button */}
        <div className="mt-6 flex flex-col gap-4">
          <PaystackButton
            {...componentProps}
            disabled={disable}
            className="w-full bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white p-2 rounded-lg hover:bg-green-700 transition"
          />

          <Button isDisabled={disable} onPress={handleStripePaymentOpen} className="w-full text-center bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition">
          
           {isStripeLoading? <span className="flex items-center gap-2 justify-center"><Spinner size="sm" color="white" /> Please wait...</span> :" Pay with Stripe"}
          </Button>
          
          <Button isDisabled={disable} onPress={handleMakeTransfer} className="w-full text-center bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-800 transition">
           {isLoading? <span className="flex items-center gap-2 justify-center"><Spinner size="sm" color="white" /> Please wait...</span> :"Pay with transfer"}
          </Button>
        </div>

        <PaymentModal handleComplete={handleComplete} isOpen={isOpen} onClose={()=>setIsOpen(false)} />
        <StripeModal handleComplete={handleComplete} onOpenSuccess={() => setIsSuccessModalOpen(true)} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
      </div>
    </div>
  );
};


const ActiveSubScription=({subscriptions})=>{
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({})
 
  const handleCancelSubscription=(sub)=>{
    setSelected(sub);
    setOpenModal(true)
    setOpen(false);
  }

return (
<div>
       <Popover
              isOpen={open}
              onOpenChange={setOpen}
              placement="bottom-end"
              showArrow={true}
              radius="sm"
              
            >
              <PopoverTrigger>
              <Button color="primary" radius="sm" className="">Active Subscriptions</Button>
              </PopoverTrigger>
              <PopoverContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
                <div className="px-4 py-2 w-[200px] gap-4 grid grid-cols-1 overflow-y-scroll  custom-scrollbar">
                  {subscriptions?.length>0?subscriptions?.map((sub, index) => (
                      <Button
                        key={index}
                        onPress={() =>handleCancelSubscription(sub)}
                        className={`flex flex-col h-11 gap-1 items-stretch rounded-md hover:bg-primary-500 hover:text-white ${sub._id === selected?._id && "border-2 border-primary-500"}
                        `}
                      >
                        <div className="flex flex-row gap-2 items-center">
                     
                          <p className="text-sm font-medium">{sub.service}</p>
                        </div>
                      </Button>
                    )
                  ):<p className="text-center">No subscription</p>}
                </div>
              </PopoverContent>
            </Popover>

            <ConfirmModal id={selected?._id} isOpen={openModal} onOpenChange={()=>setOpenModal(!openModal)} onClose={()=>setOpenModal(false)} />
</div>
)
}



const ConfirmModal = ({ onOpenChange, isOpen, onClose,id }) => {
  const { user } = useAuth();
    const {mutateAsync:cancelSubscription, isPending}= useCancelSubscription(user?._id)

  const confirm = async() => {
    await cancelSubscription(id,{
      onSuccess:(data)=>{
        notifier({message:data?.data?.message??'Subscription successfully cancelled',type:'success'})
        onClose()
      },
      onError:(error)=>{
        notifier({message:error.response.message??'There is an error making the transaction',type:'error'})
        console.log(error);
      }
    })
    onClose();
  };
  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Do you want to cancel this subsription?</ModalHeader>
        <ModalBody>
          <p>
            Your actions can not be undone once executed
          </p>
        </ModalBody>
        <ModalFooter className="flex items-center justify-end gap-4">
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            className="rounded-md"
          >
            No
          </Button>
          <Button isDisabled={isPending} color="primary" onPress={confirm} className="rounded-md">
           {isPending? <span className="flex items-center gap-2 justify-center"><Spinner color="white" size="sm" /> Please wait...</span>:'Yes'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentHubPage