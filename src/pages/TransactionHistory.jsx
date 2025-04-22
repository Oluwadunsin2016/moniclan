/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useAuth } from '../lib/AuthContext';
import TransactionHistoryList from '../components/transactionHistory/TransactionHistoryList';
import TransactionDetails from '../components/transactionHistory/TransactionDetails';
import { useGetUserTransactions } from '../apis/transaction';



export default function TransactionHistory() {
  const swiperRef = useRef(null);
const [selected, setSelected] = useState({})

  const goNext=(transaction)=>{
  if(swiperRef.current){
    setSelected(transaction)
  swiperRef.current?.slideNext()
  }
  }
  const goBack=()=>{
  if(swiperRef.current){
  swiperRef.current?.slidePrev()
  }
  }

   const { user } = useAuth();
const {data,isFetching,error}=useGetUserTransactions(user?.email)
console.log(data)

  const SwiperSteps = [
    { id: 0, content: <TransactionHistoryList transactions={data?.transactions} goNext={goNext}/> },
    { id: 1, content: <TransactionDetails transaction={selected} goBack={goBack}/>},
];

  if (!user?.email) {
    return (
      <div className="flex items-center justify-center p-8 min-h-screen">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">Please select a user to view transactions</p>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center p-8 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 min-h-screen">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg min-h-screen">
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
    </div>
  );
}