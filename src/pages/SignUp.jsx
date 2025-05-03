/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../apis/auth";
import { notifier } from "../lib/utils";

export function SignUp({onClose}) {
  const { mutateAsync: signup, isPending } = useSignupMutation();

  const navigate=useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const submit = async (values) => {
    const referredBy = sessionStorage.getItem("referralCode");
    try {
      delete values.confirmPassword;
      const {data}= await signup(referredBy?{...values,role:'user',referredBy}:{...values,role:'user'});
      sessionStorage.setItem('email',data.user.email)
      onClose()
      navigate('/verification/?type=register');
      notifier({ message: "Successfully signed up", type:'success' });
    } catch (e) {
      if (e instanceof AxiosError) {
        const message= e.response?.data?.message ?? e.response?.data ?? "Error signing up"
       return  notifier({ message,type:'error' });
      }
      notifier({ message: "Error signing up",type:'error' });
    }
  };
  
    return (
      <section className="flex flex-col items-center w-full">
      {/* <main className=" w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/3 "> */}
      <main className="w-full">
        {/* <h1 className="text-center text-5xl">Moniclan</h1> */}
        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <h3 className="font-[Inter] font-bold text-primary-500 text-2xl my-4 text-center">
            Create an account
          </h3>
         <div className="flex flex-col gap-6 mt-8">
          <div className="flex gap-6 flex-col sm:flex-row">
         <div className="flex flex-col w-full ">
            <label htmlFor="" className="opacity-70">
              First Name
            </label>
            <input
              className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
              name="firstName"
              {...register("firstName", {
                required: "First name is required",
              })}
              placeholder="Enter first name"
              type="text"
              disabled={isPending}
            />
            {errors?.firstName?.message && (
              <p className="text-red-500 text-base italic">
                {errors?.firstName?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="opacity-70">
              Last Name
            </label>
            <input
              className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
              name="lastName"
              {...register("lastName", {
                required: "Last name is required",
              })}
              placeholder="Last Name"
              type="text"
              disabled={isPending}
            />
            {errors?.lastName?.message && (
              <p className="text-red-500 text-base italic">
                {errors?.lastName?.message}
              </p>
            )}
          </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="opacity-70">
              Email Address
            </label>
            <input
              className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
              name="email"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid Email",
                },
              })}
              placeholder="Enter email"
              type="text"
              disabled={isPending}
            />
            {errors?.email?.message && (
              <p className="text-red-500 text-base italic">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
  <label htmlFor="phone" className="opacity-70">
    Phone number
  </label>
  <input
    id="phone"
    className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
    name="phone"
    placeholder="Phone number"
    type="tel"
    disabled={isPending}
    {...register("phone", {
      required: "Phone number is required",
    })}
  />
  {errors?.phone?.message && (
    <p className="text-red-500 text-base italic">{errors.phone.message}</p>
  )}
</div>

     <div className="flex gap-6 flex-col sm:flex-row">
     <div className="flex flex-col w-full">
            <label htmlFor="" className="opacity-70">
              Password
            </label>
            <input
              className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
              name="text"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              placeholder=""
              type="text"
              disabled={isPending}
            />
            {errors?.password?.message && (
              <p className="text-red-500 text-base italic">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="opacity-70">
              Confirm Password
            </label>
            <input
              className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
              name="text"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              disabled={isPending}
              placeholder=""
              type="text"
            />
            {errors?.confirmPassword?.message && (
              <p className="text-red-500 text-base italic">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>
     </div>
         </div>
          {/* <p className="mt-10 text-[1rem] opacity-60">
            By using Moniclan, you agree to our E-sign Disclosure and Consent
            Notice, Privacy Policy, and User Agreement.
          </p> */}

          <button
            disabled={isPending}
            type="submit"
            className={`w-full h-[50px]  text-[1.1rem] mt-10  bg-primary-500 text-white rounded-full transition-all duration-150 ease-in-out ${ isPending?'opacity-20':''}`}
          >
            {isPending? <span className="flex gap-2 items-center justify-center"><LiaSpinnerSolid size={20} className="animate-spin" />Loading...</span> :'Sign Up'} 
          </button>
        </form>
        <div className="flex items-center gap-4 my-8">
<hr className="w-full bg-gray-400 h-0.5" />
        <span className="whitespace-nowrap text-sm text-gray-500">OR WITH</span>
<hr className="w-full bg-gray-400 h-0.5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <button
            type="button"
            className="w-full border flex items-center justify-center gap-2 bg-white shadow p-4 rounded-full text-gray-600 hover:bg-gray-50 focus:outline-none"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        <button
            type="button"
            className="w-full flex items-center justify-center gap-2 text-white shadow p-4 rounded-full bg-gray-900 hover:bg-gray-800 focus:outline-none"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Apple_Store_logo.svg/2048px-Apple_Store_logo.svg.png"
              alt="Apple logo"
              className="w-6 h-6"
            />
            Continue with Apple
          </button>
        
        </div>
     
        {/* <div className="flex mb-20 mt-10 gap-2 opacity-75 justify-center">
          <p>Already have an account? </p>
          <Link to="/sign-in" className="underline text-blue-500">
              Sign In
          </Link>
        </div> */}
      </main>
    </section>
    );
  }