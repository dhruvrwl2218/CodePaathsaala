import React, { useEffect, useState } from "react";
import Coursecard from "../Components/Coursecard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Courses = () => {
  // Settings for React Slick carousel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
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

  {
    /* {course?.map((cor)=>console.log(cor))} */
  }
  return (
    <>
      <div className="bg-black">
        <section className="grid grid-cols-12 gap-5" id="beginner">
          <div className="m-2 text-3xl p-2 col-start-3 col-span-6 font-semibold underline text-indigo-400">
            Begginer's
          </div>
          <div className=" col-start-1 col-span-2 align-middle justify-center p-5"></div>
          <div className="col-span-8 align-middle justify-center p-2">
            {/* <div className = "w-5"><button>1</button></div>          */}
            <Slider {...settings}>
            {course
              ?.filter((cor) => cor?.Level === "Beginner")
              .map((beginner) => (
                <div className = "" key={beginner._id}>
                  <Coursecard
                    Name={beginner?.Name}
                    Img={beginner?.Thumbnail}
                    Description = {beginner?.Description}
                    Level="Begginer"
                    Css=""
                    Duration={beginner?.Duration}
                    Price = {beginner?.Price}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* <div className = "w-20"><button>1</button></div> */}
          <div className=" col-start-11 col-span-2 align-middle justify-center p-5"></div>
        </section>

        <div className="grid grid-cols-12 p-2 m-2">
          <hr className="col-start-3 col-span-8 m-12 " />
        </div>

        <section className="grid grid-cols-12" id="beginner">
          <div className="m-2 text-3xl p-2 col-start-3 col-span-6 font-semibold underline text-indigo-400">
            Intermediate
          </div>
          <div className=" col-start-1 col-span-2 align-middle justify-center p-5"></div>
          <div className="col-span-8 align-middle justify-center p-2">
          <Slider {...settings}>
          {course
            ?.filter((cor) => cor?.Level === "Intermediate")
            .map(({ Name, Thumbnail, Description, Duration, _id, Price }) => (
              <div
                className=""
                key={_id}
              >
                <Coursecard
                  Name={Name}
                  Img={Thumbnail}
                  Description ={Description}
                  Level="Intermediate"
                  Css=""
                  Duration={Duration}
                  Price = {Price}
                />
              </div>
            ))}
            </Slider>
          </div>
          <div className=" col-start-11 col-span-2 align-middle justify-center p-5"></div>
        </section>

        <div className="grid grid-cols-12 p-2 m-2">
          <hr className="col-start-3 col-span-8 m-12" />
        </div>

        <section className="grid grid-cols-12" id="beginner">
          <div className="m-2 text-3xl p-2 col-start-3 col-span-6 font-semibold underline text-indigo-400">
            Advance
          </div>
          <div className=" col-start-1 col-span-2 align-middle justify-center p-5"></div>
          <div className="col-span-8 align-middle justify-center p-2">
          <Slider {...settings}>
          {course
            ?.filter((cor) => cor?.Level === "Advance")
            .map(({ Name, Thumbnail,Description, Duration, _id,Price }) => (
              <div
                className="col-start-3 col-span-3 align-middle justify-center p-5"
                key={_id}
              >
                <Coursecard
                  Name={Name}
                  Img={Thumbnail}
                  Description={Description}
                  Level="Advance"
                  Css=""
                  Duration={Duration}
                  Price = {Price}
                />
              </div>
            ))}
            </Slider>
          </div>

<div className=" col-start-11 col-span-2 align-middle justify-center p-5"></div>
        </section>
      </div>
    </>
  );
};

export default Courses;

// const sliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3, // Number of slides to show at once
//   slidesToScroll: 1, // Number of slides to scroll
//   autoplay: true,
//   autoplaySpeed: 2000,
//   responsive: [
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//       },
//     },
//   ],
// };


// <div className="bg-slate-300">
//   <section className="grid grid-cols-12" id="beginner">
//     <div className="m-2 text-3xl p-2 col-start-3 col-span-6 font-semibold underline">
//       Begginer's
//     </div>
//     <Slider {...settings}>
//     <div className="col-start-3 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//     <div className="col-start-6 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//     <div className="col-start-9 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//     </Slider>
//   </section>

//

//   <section className="grid grid-cols-12" id="Intermediate">
//     <div className="m-2 text-3xl p-2 col-start-3 col-span-6 font-semibold underline">
//       Intermediate
//     </div>
//     <div className="col-start-3 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//     <div className="col-start-6 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//     <div className="col-start-9 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//   </section>

//   <div className="grid grid-cols-12 p-2 m-2">
//     <hr className="col-start-3 col-span-9 " />
//   </div>

//   <section className="grid grid-cols-12" id="Intermediate">
//     <div className="m-2 text-3xl p-2 col-start-3 col-span-6 font-semibold underline">
//       Advance
//     </div>
//     <div className="col-start-3 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//     <div className="col-start-6 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//     <div className="col-start-9 col-span-3 align-middle justify-center p-5">
//       <Coursecard
//         Name="Python"
//         Img="https://cdn.pixabay.com/photo/2023/12/18/14/30/winter-8456170_960_720.png"
//         Discription="With this setup, the Coursecard component will receive the
//      props Name, Discription, Level, and Img from the Courses
//     component and render them accordingly. Make sure to adjust
//     the props and values according to your actual data and requirements."
//         Level="Begginer"
//         Css=""
//         Duration="3 Month"
//       />
//     </div>
//   </section>
// </div>
