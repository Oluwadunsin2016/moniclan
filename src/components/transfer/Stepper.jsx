
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Stepper() {
 const swiperRef = useRef(null);

  const steps = [
    { id: 1, title: 'Step 1', content: 'This is the content for Step 1.' },
    { id: 2, title: 'Step 2', content: 'This is the content for Step 2.' },
    { id: 3, title: 'Step 3', content: 'This is the content for Step 3.' },
  ];

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Save swiper instance in ref
        }}
        spaceBetween={50}
        slidesPerView={1}
        className="h-auto"
      >
        {steps.map((step) => (
          <SwiperSlide key={step.id}>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">{step.title}</h2>
              <p>{step.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* External Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()} // Navigate to the previous slide
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()} // Navigate to the next slide
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
