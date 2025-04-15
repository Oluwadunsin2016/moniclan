
import { useState,useRef } from "react";
import { Progress } from "@nextui-org/react";
import { motion } from "framer-motion";
import TransferAmount from "../components/transfer/TransferAmount";
import DeliveryMethod from "../components/transfer/DeliveryMethod";
import RecipientBank from "../components/transfer/RecipientBank";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoMdArrowBack } from "react-icons/io";
import RecipientAccountDetails from "../components/transfer/RecipientAccountDetails";
import RecipientInformation from "../components/transfer/RecipientInformation";
import RecipientNotification from "../components/transfer/RecipientNotification";
import SenderReason from "../components/transfer/SenderReason";
import SenderInformation from "../components/transfer/SenderInformation";
import SenderAddress from "../components/transfer/SenderAddress";
import SenderContact from "../components/transfer/SenderContact";
import AddPaymentCard from "../components/transfer/AddPaymentCard";
import CardDetails from "../components/transfer/CardDetails";
import Preview from "../components/transfer/Preview";

const stepVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const SendMoney = () => {
 const swiperRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  const goNext=()=>{
  if(swiperRef.current){
  setCurrentStep(prevStep=>prevStep+1)
  swiperRef.current?.slideNext()
  }
  }
  const goBack=()=>{
  if(swiperRef.current){
  setCurrentStep(prevStep=>prevStep-1)
  swiperRef.current?.slidePrev()
  }
  }

  const completed=()=>{
    setCurrentStep(0)
    swiperRef.current?.slideTo(0)
  }

    const SwiperSteps = [
      { id: 0, content: <TransferAmount goNext={goNext}/> },
      { id: 1, content: <DeliveryMethod goNext={goNext}/>},
      { id: 2, content: <RecipientBank goNext={goNext}/> },
      { id: 3, content: <RecipientAccountDetails goNext={goNext}/> },
      { id: 4, content: <RecipientInformation goNext={goNext}/> },
      { id: 5, content: <RecipientNotification goNext={goNext}/> },
      { id: 6, content: <SenderReason goNext={goNext}/> },
      { id: 7, content: <SenderInformation goNext={goNext}/> },
      { id: 8, content: <SenderAddress goNext={goNext}/> },
      { id: 9, content: <SenderContact goNext={goNext}/> },
      { id: 10, content: <AddPaymentCard goNext={goNext}/> },
      { id: 11, content: <CardDetails goNext={goNext}/> },
      { id: 12, content: <Preview completed={completed}/> },
  ];
  

  const totalSteps = SwiperSteps.length;
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <section className="my-4">
      <div className="px-6 pt-4">
        <button onClick={goBack} className="flex items-center gap-1 ms-10 p-2 my-4 rounded bg-blue-400 hover:bg-blue-500 text-white shadow"><IoMdArrowBack size={20} /> Back</button>
        <div className="w-full">
      <Progress size="sm" color="primary" isStriped value={progressPercentage} />
          {/* {steps[currentStep]} */}
            <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Save swiper instance in ref
        }}
        spaceBetween={50}
        slidesPerView={1}
        className="h-auto"
      >
        {SwiperSteps.map((step) => (
          <SwiperSlide key={step.id}>
              {step.content}
          </SwiperSlide>
        ))}
      </Swiper>

          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SendMoney;
