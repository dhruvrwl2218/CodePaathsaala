import React, { useEffect, useState } from "react";
import { Coursecard } from "../../Components/User-Page-Components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axiosInstance from '../../utils/AxiosInstance';

const Courses = () => {
  // Settings for React Slick carousel
  const navigate = useNavigate();
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

  const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  };

  const [course, setCourse] = useState(null);
  useEffect(() => {
    const res = async () => {
      try {
          const response = await axiosInstance.get('Course/AllCourses')
        setCourse(response.data.data);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
    res();
  }, []);

  const checkout = async (Price, _id, Name) => {
    const auth = JSON.parse(localStorage.getItem("AuthState"));

    if (!auth.islogin) {
      navigate("/Login");
    }

    const enrolldata = { User_id: auth.User_id, Course_id: _id };

    localStorage.setItem("EnrollUser", JSON.stringify(enrolldata));

    await loadRazorpay();

    try {
      // const res = await axios.post(
      //   `${process.env.url}/Enroll/getKey`,
      //   enrolldata
      // );
      const res = await axiosInstance.post('Enroll/getKey',enrolldata)
      // console.log(res.data.data.key)
      if (res.status !== 200) {
        throw res;
      }

      const key = res.data.data.key;

      // const res2 = await axios.post(`${process.env.url}/Enroll/checkout`, {
      //   amount: Price,
      // });
      const res2 = await axiosInstance.post('Enroll/checkout',{amount : Price});

      if (res2 !== 200) {
        throw res2;
      }

      const order = res2.data.data.order;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "CodePathsaala",
        description: `Get access to our exclusive ${Name} course`,
        image: "/logohead.png",
        order_id: order.id,
        // callback_url:"http://localhost:8000/api/v1/Utility/paymentverification",
        handler: async (response) => {
          const paymentResponse = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            ...enrolldata,
          };

          try {
            // const enrolled = await axios.post(
            //   `${process.env.url}/Enroll/paymentVerification`,
            //   paymentResponse
            // );
            const enrolled = await axiosInstance.post('/Enroll/paymentVerification',paymentResponse)
            if (enrolled.status === 200) {
              toast.success(enrolled.response.data.message);
              navigate("/YourCourses");
            }
          } catch (error) {
            // console.log(error)
            toast.error(error.response.data.message);
          }
        },
        prefill: {
          name: "razorpay user",
          email: "razorpayuser@gmail.com",
          contact: "1234567890",
        },
        notes: {
          address: "Jaipur,Rajasthan",
        },
        theme: {
          color: "#4169E1",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
                  <div className="" key={beginner._id}>
                    <Coursecard
                      Name={beginner?.Name}
                      Img={beginner?.Thumbnail}
                      Description={beginner?.Description}
                      Level="Begginer"
                      Css=""
                      Duration={beginner?.Duration}
                      Price={beginner?.Price}
                      _id={beginner?._id}
                      checkout={checkout}
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
                .map(
                  ({ Name, Thumbnail, Description, Duration, _id, Price }) => (
                    <div className="" key={_id}>
                      <Coursecard
                        Name={Name}
                        Img={Thumbnail}
                        Description={Description}
                        Level="Intermediate"
                        Css=""
                        Duration={Duration}
                        Price={Price}
                        _id={_id}
                        checkout={checkout}
                      />
                    </div>
                  )
                )}
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
                .map(
                  ({ Name, Thumbnail, Description, Duration, _id, Price }) => (
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
                        Price={Price}
                        _id={_id}
                        checkout={checkout}
                      />
                    </div>
                  )
                )}
            </Slider>
          </div>

          <div className=" col-start-11 col-span-2 align-middle justify-center p-5"></div>
        </section>
      </div>
    </>
  );
};

export default Courses;
