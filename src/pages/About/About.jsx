import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default function About() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        loop={true}
        navigation={true}
        modules={[ Pagination, Navigation]}
        id='about'
        className='aboutSwiper'
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 900px
          1000: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide >
        <div class="flex flex-col w-[350px] h-[350px] font-medium justify-start items-center
          bg-white shadow-2xl gap-4 rounded-[7px]  hover:scale-[1.023] 
          hover:shadow-2xl transition-transform duration-500 ease-in-out hover:font-semibold">
              <div>
                  <p class="text-center text-3xl font-bold flex justify-center items-start h-[50px] m-5">
                      About Company
                  </p>
                  <p class='text-base px-3'>
                      NinjaTech is a technology company based in Ahmedabad, 
                      offering services in AI, machine learning, web and mobile app development,
                      and custom software solutions. They have a strong team of developers and are
                      known for their cost-effective services, flexibility, and clear communication 
                      with clients.
                  </p>

              </div>

            </div>
        </SwiperSlide>
        <SwiperSlide className='swiperClass'>
        <div class="flex flex-col w-[350px] h-[350px] font-medium justify-start items-center
          bg-white shadow-2xl gap-4 rounded-[7px]  hover:scale-[1.023] 
          hover:shadow-2xl transition-transform duration-500 ease-in-out hover:font-semibold">
              <div>
                  <p class="text-center text-3xl font-bold flex justify-center items-start h-[50px] m-5">
                      Goals
                  </p>
                  <p class='text-base px-3'>
                  Their mission focuses on empowering businesses through advanced technology
                   and fostering positive impacts worldwide. By constantly pushing the boundaries
                    of innovation, NinjaTech seeks to become a leader in creating solutions that 
                    not only meet current business demands but also anticipate future needs. They
                     plan to expand their team of skilled professionals and deliver high-quality,
                    software solutions.​
                  </p>

              </div>

            </div>
        </SwiperSlide>
        <SwiperSlide className='swiperClass'>
        <div class="flex flex-col w-[350px] h-[350px] font-medium justify-start items-center
          bg-white shadow-2xl gap-4 rounded-[7px]  hover:scale-[1.023] 
          hover:shadow-2xl transition-transform duration-500 ease-in-out hover:font-semibold">
              <div>
                  <p class="text-center text-3xl font-bold flex justify-center items-start h-[50px] m-5">
                      Technology used
                  </p>
                  <p class='text-base p-3'>
                      1. Artificial Intelligence (AI) and Machine Learning (ML)<br/><br/>
                      2. Blockchain <br/><br/>
                      3. Cloud and DevOps <br/><br/>
                      4. Mobile App Development <br/><br/>
                      5. E-commerce Development
                  </p>

              </div>

            </div>
        </SwiperSlide>
        <SwiperSlide className='swiperClass'>
        <div class="flex flex-col w-[350px] h-[350px] font-medium justify-start items-center
          bg-white shadow-2xl gap-4 rounded-[7px]  hover:scale-[1.023] 
          hover:shadow-2xl transition-transform duration-500 ease-in-out hover:font-semibold">
              <div>
                  <p class="text-center text-3xl font-bold flex justify-center items-start h-[50px] m-5">
                      Clients
                  </p>
                  <p class='text-base p-3'>
                  NinjaTech, based in Ahmedabad, India, serves a diverse range of 
                  clients across multiple industries, including eCommerce, real estate,
                  entertainment, IT, medical, and more. The company offers custom software,
                   web, and mobile app development services to clients ranging from startups
                    to large enterprises, with notable expertise in eCommerce and IoT solutions.
                     
                  </p>

              </div>

            </div>
            </SwiperSlide>

            <SwiperSlide className='swiperClass'>
            <div class="flex flex-col w-[350px] h-[350px] font-medium justify-start items-center
          bg-white shadow-2xl gap-4 rounded-[7px]  hover:scale-[1.023] 
          hover:shadow-2xl transition-transform duration-500 ease-in-out hover:font-semibold">
              <div>
                  <p class="text-center text-3xl font-bold flex justify-center items-start h-[50px] m-5">
                      Company's Portfolio
                  </p>
                  <p class='text-base p-3'>
                  1. SecureSight <br/><br/>
                  2. Referrix <br/><br/>
                  3. NextGen Coach <br/><br/>
                  4. Brand Spotlight <br/><br/>
                  5. Reality Insight Estate
                     
                  </p>

              </div>

            </div>
        </SwiperSlide>
        
      </Swiper>
    </>
  );
}
