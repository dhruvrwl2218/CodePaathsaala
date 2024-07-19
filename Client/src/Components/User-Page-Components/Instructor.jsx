import React,{useRef,useEffect} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

const InstructoreDetails = [
    {
        name :"Susmita sen",
        Oualification : " QCS @Adobe, Instructor @d Techiee",
        Img : "https://img.freepik.com/free-photo/smiling-confident-businesswoman-posing-with-arms-folded_1262-20950.jpg?w=996&t=st=1718518339~exp=1718518939~hmac=6a7417d80c1b446fc6a935d6322523ddf35992b6ef31e3614037f9d50ddf9bc5",
        info : "Sen is a Software Engineer and a Youtuber, primarily known for his Coding and Software Engineering skills. He is quite a popular figure among students as well as working professionals on various social media platforms, his YouTube and LinkedIn profiles amassing almost 1M subscribers. He's also mentored 500k+ students so far. He has done his B.Tech (IT) from the Netaji Subhash Institute of Technology (NSIT), Delhi, and worked in Amazon and Microsoft."
    },
    {
        name :"Kabir Das Singh",
        Oualification : "Founder - Code-Help, Ex-Amazon, Ex-Microsoft",
        Img :"https://img.freepik.com/free-photo/portrait-happy-young-man-eyeglasses_171337-4850.jpg?w=1380&t=st=1718518360~exp=1718518960~hmac=551c1aae175814b90b89d0ff49451bf2e3693f3536e5d0a756dcd084efa5ac94",
        info : "kabir is an ace software engineer working in the role of Computer Scientist at Adobe Systems and a popular computer science instructor on CodeHelp Youtube. He is working in the industry for the past 4.5 years, working on different real-world problems. He is well-known among students for his amazingly simplified explanations with real-life examples, enabling students to understand complex topics very easily. Many of his ex-students are now working in top product companies like Microsoft, Amazon, De-Shaw"
    }
]

const Instructor = () => {
    const sliderRef = useRef(null);
    useEffect(() => {
     const interval = setInterval(() => {
       if (sliderRef.current) {
         sliderRef.current.slickNext();
       }
     }, 3000); // Change the interval as needed (in milliseconds)
 
     return () => clearInterval(interval);
   }, []);

    
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the autoplay speed (in milliseconds)
  };

  return (
    <div>
        <Slider  {...settings} ref={sliderRef}>
      {InstructoreDetails.map((details) =>(
        <div className="" key={details.name}>
        <div className='justify-center flex'>
          <img
            src= {details.Img}
            alt=""
            className="rounded-full w-1/2 max-lg:w-full "
          />
        </div>
        <div className=" ">
          <div className="p-2 my-5">
            <div>
              <p className="text-xl font-semibold text-indigo-500 text-center">
                {details.name}
              </p>
              <p className="text-lg font-semibold text-indigo-500 text-center">
                {details.Oualification}
              </p>
            </div>
            <p className="my-4 text-center text-align">
             {details.info}
            </p>
          </div>
        </div>
      </div>
      ))}
      </Slider>
    </div>
  )
}

export default Instructor


