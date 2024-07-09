import React, { useRef, useEffect,useState } from "react";
import { Coursecard } from "../../Components/User-Page-Components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Instructor from "../../Components/User-Page-Components/Instructor";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const sliderRef = useRef(null);
  const [course, setCourse] = useState(null);
  useEffect(() => {
    const res = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/Course/AllCourses",
          { withCredentials: true }
        );
        // console.log(response)
        setCourse(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    res();
  }, []);


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
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the autoplay speed (in milliseconds)
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-black p-5  ">
      //heropage Top
      <div className="w-full flex justify-center">
        <div className=" bg-black p-16 mt-20 font-serif text-indigo-100 border-x rounded-lg hover:shadow-md hover:shadow-indigo-400">
          <p className="text-5xl font-bold md:text-8xl">
            Navigate the Nexus of{" "}
            <span className="block text-indigo-500">Technology</span>{" "}
            <span className="text-xl block my-3 p-1">
              Ignite Your Future with Our Exclusive Courses!
            </span>
          </p>
          <div className="flex mt-24 mb-5 justify-center ">
            <Link to={'/Courses'}>
             <p className="p-3 mx-5 font-semi-bold  text-lg rounded-xl border-x border-emerald-900 whitespace-nowrap hover:shadow-lg hover:shadow-emerald-900">View Courses</p>
             </Link>
            <a
              href="#"
              className="p-3 mx-5 text-lg font-semi-bold rounded-xl  border border-emerald-900 whitespace-nowrap hover:shadow-lg hover:shadow-emerald-900"
            >
              View Updates  
            </a>
          </div>
        </div>
      </div>
      //Live Lectures this section will be made dynamic when live lecture
      functionality will be added in this application
      <div className="flex flex-col justify-center my-20 p-5 text-white lg:mx-80   ">
        <div className=" flex flex-row justify-center mx-auto text-indigo-500">
          <p className="m-5 p-2 text-3xl w-full font-semibold">
            Ongoing Live Batches
          </p>
        </div>
        <div className="rounded-2xl p-5 bg-neutral-900 shadow-sm shadow-slate-200">
        <Slider {...settings} ref={sliderRef}>
          {
              course && course.filter((itmes)=>itmes.Name.includes('live')).map((liveCourse)=>(
                <Coursecard
                Name={liveCourse.Name}
                Img={liveCourse.Thumbnail}
                Description = {liveCourse.Description}
                Level={liveCourse.Level}
                Css="w-96 mx-auto"
                Duration={liveCourse.Duration}
                Price = {liveCourse.Price}
                _id = {liveCourse._id}
              />
              ))
              
          }
          </Slider>
        </div>
      </div>
      <div className="grid grid-cols-12 p-2 m-2">
        <hr className="col-start-3 col-span-8 m-8" />
      </div>
      //for recorded lectures
      <div className="flex flex-col justify-center my-20 p-5 text-white lg:mx-80   ">
        <div className=" flex flex-row justify-center mx-auto text-indigo-500">
          <p className="m-5 p-2 text-3xl w-full font-semibold">
            Recorded Lectures
          </p>
        </div>
        <div className="rounded-2xl p-5 bg-neutral-900 shadow-sm shadow-slate-200">
          <Slider {...settings} ref={sliderRef}>
            {course && course.filter((itmes) => !itmes.Name.includes('live')).map((recorded) => (
              <Coursecard
                Name={recorded.Name}
                Img={recorded.Thumbnail}
                Description = {recorded.Description}
                Level={recorded.Level}
                Css="w-96 mx-auto"
                Duration={recorded.Duration}
                Price = {recorded.Price}
                _id = {recorded._id}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className="grid grid-cols-12 p-2 m-2">
        <hr className="col-start-3 col-span-8 m-8" />
      </div>
      //features
      <div
        className="w-full font-serif shadow-sm rounded-2xl hover:shadow-xl shadow-yellow-100  text-xl flex-col justify-center p-5 mt-24 text-white  border-y-slate-50
        md:flex  
        md:flex-row md:flex-no-wrap mx-auto"
      >
        <div className="p-4 px-10 m-5 text-center rounded-2xl border-x border-blue-900  shadow-md hover:shadow-md shadow-blue-300">
          <p className="whitespace-nowrap text-3xl font-semi-bold p-2 mb-4 text-blue-200">
            Instustry ready
          </p>
          <p className="block text-lg text-wrap justify-center text-justify ">
            These Courses are made by and taught by the industry experts who
            have worked and familiar with all the real life use-cases and the
            tech world,which not only leads to build right kind of skills but
            takes you one step ahead of others.
          </p>
        </div>
        <div className="p-4 px-10 m-5 text-center rounded-2xl  border-emerald-900  shadow-md hover:shadow-md shadow-emerald-600 ">
          <p className="whitespace-nowrap text-3xl font-semi-bold p-2 mb-4 text-emerald-200">
            Curated Course
          </p>
          <p className="block text-lg text-wrap justify-center text-justify">
            Our Courses are formed and curated in such a manner that you just
            need to be consistent, these courses follow sortest path to get
            things done in most impactful way that makes your fundametal strong
            and also lives with life long learning to grow exponentially in
            coming future.Whole curcirulum is made by peoples who have years of
            expertise.
          </p>
        </div>
        <div className="p-4 px-10 m-5 text-center rounded-2xl border-red-900  shadow-md hover:shadow-md shadow-red-900">
          <p className="whitespace-nowrap text-3xl font-semi-bold p-2 mb-4 text-red-300">
            Industry ready
          </p>
          <p className="block text-lg text-wrap  text-justify">
            These Courses are made by and taught by the industry experts who
            have worked and familiar with all the real life use-cases and the
            tech world,which not only leads to build right kind of skills but
            takes you one step ahead of others.
          </p>
        </div>
        <div className="p-4 px-10 m-5 text-center rounded-2xl border-yellow-900  shadow-md hover:shadow-md shadow-yellow-100">
          <p className="whitespace-nowrap text-3xl font-semi-bold p-2 mb-4 text-yellow-100 ">
            References
          </p>
          <p className="block text-lg text-wrap  text-justify">
            Our student are working on wide range of companies from MAANG to
            early start-ups ,where you can be refered on basis of your
            performance and caliber .We try too bring every possible opportunity
            on your door to sky rocket your journey.
          </p>
        </div>
      </div>

      //tutors and mentors  //flex flex-wrap justify-center
      <div className=" my-20 text-white p-5 bg-neutral-900 lg:mx-80">
        <p className="p-5 text-4xl font-bold text-indigo-500 text-center">Our Instructor</p>
        <Instructor />
      </div> 
    </div>
  );
};

export default Home;
