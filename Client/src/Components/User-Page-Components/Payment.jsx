// import React, { useState } from 'react'
// import axiosInstance from '@/utils/AxiosInstance';
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/shadUI/ui/card"
// import { Button } from '@/shadUI/ui/button';
// import { Input } from '@/shadUI/ui/input';
// import { Label } from '@/shadUI/ui/label';
// import { Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//  } from '@/shadUI/ui/select';

// const months = ["January","Febuary","March","April","June","July","September","October","November","December"];
// const Years = ["2024","2025","2026","2027","2028","2029"];

// const Payment = ({Details,setPaymentComp}) => {
//     const [] = useState();
//     console.log('Payment:',Details);
//     const Back = () =>{
//         console.log('simon go back')
//         setPaymentComp({open:false,Details:{}})
//     }
//     const enrollUser = async () =>{
//       const data = {User_id :Details.User_id,}
//     }
//   return (
//   <Card className={'m-8 bg-neutral-900 border-0 shadow-sm shadow-gray-500 w-96 pt-8'}>
//   <CardHeader className={'p-2 rounded-md w-full text-center text-white '}>
//      <div className='flex'>
//      <div className='w-full'><img src="/logo one.png" alt="" className='w-64' /></div>
//      <Button variant="ghost" size="sm" onClick={Back}>Back</Button>
//      </div>
//     <CardTitle className={'bg-indigo-500 p-2'}>{Details.CourseName}</CardTitle>
//     <CardDescription className={'text-white'}></CardDescription>
//   </CardHeader>
//   <CardContent>
//     <div className='my-2'>
//     <Label className={'text-white'} htmlFor="Cardno">Email</Label>
//     <Input id = 'Email' type="email" placeholder="xyz@gmail.com" />
//     </div>
//     <div className='my-2'>
//     <Label className={'text-white'} htmlFor="Cardno"> Card No:</Label>
//     <Input id = 'Cardno' type="Text" placeholder="Card no." />
//     </div>
//     <div className='flex justify-between my-5'>
//       <div>
//       <Label className={'text-white'} htmlFor="Expires"> Expires</Label>
//       <div>
//           <Select>
//           <SelectTrigger>
//                 <SelectValue placeholder="Month" />
//           </SelectTrigger>
//           <SelectContent>
//           {months.map(m => <SelectItem value={m}>{m}</SelectItem>)}
//           </SelectContent>
//           </Select>
//       </div>
//       </div>
//       <div>
//       <Label className={'text-white'} htmlFor="Years"> Years</Label>
//       <div>
//           <Select>
//           <SelectTrigger>
//                 <SelectValue placeholder="Year" />
//           </SelectTrigger>
//           <SelectContent>
//           {Years.map(y => <SelectItem value={y}>{y}</SelectItem>)}              
//           </SelectContent>
//           </Select>
//       </div>
//       </div>
//       <div className='w-12'>
//       <Label className={'text-white'} htmlFor="CVC"> CVC</Label>
//       <Input id = 'CVC' type="Text" placeholder="123" />
//       </div>
//     </div>
//   </CardContent>
//   <CardFooter className={'flex justify-between'}>
//     <div className='text-white'>Rs{Details.Price}</div>
//     <Button variant="indigo" size="sm">Pay</Button>
//   </CardFooter>
// </Card>
//   )
// }

// export default Payment
import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/shadUI/ui/card"
import { Button } from '@/shadUI/ui/button';
import { Input } from '@/shadUI/ui/input';
import { Label } from '@/shadUI/ui/label';
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from '@/shadUI/ui/select';
import axiosInstance from '@/utils/AxiosInstance';
const months = ["January","Febuary","March","April","June","July","September","October","November","December"];
const Years = ["2024","2025","2026","2027","2028","2029"];

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  cardNumber: Yup.string().required('Card no is required'),
  expiryMonth: Yup.string().required('required'),
  expiryYear: Yup.string().required('required'),
  cvc: Yup.string().required('CVC is required'),
});

const PaymentCard = ({ Details,setPaymentComp }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const Back = () =>{
            console.log('simon go back')
            setPaymentComp({open:false,Details:{}})
        }
  const EnrollUser = async(data) => {
    // Handle payment processing here
    console.log(data);
    const enrolldata = {
      ...data,
      User_id : Details.User_id,
      Course_id :Details.Course_id,
      CourseName : Details.CourseName,
      Amount :Details.Price
    }
    try {
      const res = await axiosInstance.post('Enroll/enrollUser',enrolldata)
      console.log(res)
      navigate("/YourCourses")
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <Card className={'m-8 bg-neutral-900 border-0 shadow-sm shadow-gray-500 w-96 pt-8'}>
      <CardHeader className={'p-2 rounded-md w-full text-center text-white '}>
        <div className='flex'>
          <div className='w-full'><img src="/logo one.png" alt="" className='w-64' /></div>
          <Button variant="ghost" size="sm" onClick={Back}>Back</Button>
        </div>
        <CardTitle className={'bg-indigo-500 p-2'}>{Details.CourseName}</CardTitle>
        <CardDescription className={'text-white'}></CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(EnrollUser)}>
          <div className='my-2'>
            <Label className={'text-white'} htmlFor="Email">Email</Label>
            <Input
              id='Email'
              type="email"
              placeholder="xyz@gmail.com"
              {...register('email')}
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div className='my-2'>
            <Label className={'text-white'} htmlFor="Cardno">Card No:</Label>
            <Input
              id='Cardno'
              type="text"
              placeholder="Card no."
              {...register('cardNumber')}
            />
            {errors.cardNumber && <p className='text-red-500'>{errors.cardNumber.message}</p>}
          </div>
          <div className='flex justify-between my-5'>
            <div>
              <Label className={'text-white'} htmlFor="Expires">Expires</Label>
              <Select {...register('expiryMonth')} onValueChange={value => setValue('expiryMonth', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.expiryMonth && <p className='text-red-500'>{errors.expiryMonth.message}</p>}
            </div>
            <div>
              <Label className={'text-white'} htmlFor="Years">Years</Label>
              <Select {...register('expiryYear')} onValueChange={value => setValue('expiryYear', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.expiryYear && <p className='text-red-500'>{errors.expiryYear.message}</p>}
            </div>
            <div className='w-12'>
              <Label className={'text-white'} htmlFor="CVC">CVC</Label>
              <Input
                id='CVC'
                type="text"
                placeholder="123"
                {...register('cvc')}
              />
              {errors.cvc && <p className='text-red-500'>{errors.cvc.message}</p>}
            </div>
          </div>
          <CardFooter className={'flex justify-between p-0 mt-8'}>
            <div className='text-white'>Rs{Details.Price}</div>
            <Button type="submit" variant="indigo" size="sm">Pay</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
