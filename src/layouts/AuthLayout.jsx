import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Carousel from "../components/AuthCarousel";

const AuthLayout = () => {
  const textArray = ["Employees", "Workforce", "Merchants", "Businesses"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const swiperRef = useRef(null); // Reference to Swiper instance
  const intervalDelay = 5000; 

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // Reset text animation
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length); // Only update state here
        setAnimate(true); // Restart text animation
  
        // Call slideTo *outside* of state update
        if (swiperRef.current) {
          swiperRef.current.slideTo((currentIndex + 1) % textArray.length);
        }
        
      }, 50);
    }, intervalDelay);
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [textArray.length, currentIndex]); 
  return (
    <>
         <div
         className="flex flex-col md:flex-row-reverse w-full min-h-screen">
         <div className="md:w-1/2">
           <div
             className="pattern-4 relative flex h-[18rem] md:h-full flex-col overflow-hidden rounded-b-2xl md:rounded-br-none md:rounded-l-2xl text-white">
             <div className="absolute inset-0 z-[99]">
               <Carousel swiperRef={swiperRef} intervalDelay={intervalDelay} />     
             </div>
           </div>
         </div>
         <div className="flex flex-col flex-1 justify-center items-center md:overflow-y-auto text-xl">      
     <Outlet/>
         </div>
       </div>
    </>
  )
}

export default AuthLayout