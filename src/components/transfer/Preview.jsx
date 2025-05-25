/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Summary from "./transaction_preview/Summary";
import AmountDelivery from "./transaction_preview/AmountDelivery";
import RecipientDetails from "./transaction_preview/RecipientDetails";
import SenderDetails from "./transaction_preview/SenderDetails";
import { Button, useDisclosure } from "@nextui-org/react";
import { IoMdArrowDown } from "react-icons/io";
import InfoUpdateModal from "./InfoUpdateModal";
import { useDataStore } from "../../store/Global";
import PaymentModal from "../hub/PaymentModal";
import StripeModal from "../hub/StripeModal";
import SuccessModal from "../hub/SuccessModal";

const Preview = ({completed}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data,clearData}=useDataStore()
  const scrollContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  // Function to scroll down slightly
  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 200, behavior: "smooth" });
    }
  };

  // Function to check if the user has scrolled to the bottom
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setShowScrollButton(false); // Hide button when at the bottom
      } else {
        setShowScrollButton(true); // Show button otherwise
      }
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    const scrollableDiv = scrollContainerRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", checkScrollPosition);
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const handleSubmit=async()=>{
    console.log(data);
    
    if(data.paymentMethod==="Transfer"){
      setIsPaymentModalOpen(true)
      return
    }else{
      setIsModalOpen(true)
    }
//     const {card_details,...rest}=data
//     const payload={
//       ...rest, type:'Transfer'
//     }
// await makePayment(payload,{
//   onSuccess:()=>{
//     notifier({message:'Transaction successful',type:'success'})
//     clearData()
//     completed()
//   },
//   onError:(error)=>{
//     notifier({message:error.response.message??'There is an error making the transaction',type:'error'})
//     console.log(error);
//   }
// })
  }

  
  const handleComplete=()=>{
    clearData()
    completed()
  }


  return (
    <div className="relative h-[82vh] bg-white">
      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="h-full overflow-auto flex flex-col p-8 gap-10"
      >
        <Summary />
        <AmountDelivery onOpen={onOpen} />
        <RecipientDetails onOpen={onOpen} />
        <SenderDetails onOpen={onOpen} />

        <div>
        <p className="my-4">
            <b>Note:</b> Do your due deligence before you proceed. Your action is irreversible.
          </p>
          <Button
            color="primary"
            size="lg"
            className="rounded w-full text-lg py-2"
            onPress={handleSubmit}
          >
            Send Money
          </Button>
          <p className="my-4">
            By selecting <b>Send Money</b>, you agree to Cross over&apos;s{" "}
            <a className="text-blue-500 underline" href="">
              User Agreement, Privacy policy
            </a>
            and to receive communications according to the
            <a className="text-blue-500 underline" href="">
              E-sign Disclosure and Consent Notice
            </a>
          </p>
        </div>
      </div>

      {/* Floating Scroll Down Button */}
      {showScrollButton && 
      <button
        onClick={scrollDown}
        className="fixed top-[70%] hover:animate-none animate-bounce right-6 bg-blue-500/40 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <IoMdArrowDown size={24} />
      </button>
      }
 <PaymentModal handleComplete={handleComplete} isOpen={isPaymentModalOpen} onClose={()=>setIsPaymentModalOpen(false)} />
    <StripeModal handleComplete={handleComplete} onOpenSuccess={() => setIsSuccessModalOpen(true)} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
<InfoUpdateModal onOpenChange={onOpenChange} isOpen={isOpen} onClose={onClose}/>
      </div>
  );
};

export default Preview;

