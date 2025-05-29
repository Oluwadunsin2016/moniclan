/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../apis/auth";
import { notifier } from "../lib/utils";
import { Select, SelectItem } from "@nextui-org/react";
import { africanCountryCodes, countries } from "../libs/constants";

export function SignUp({ onClose }) {
  const [isMerchant, setIsMerchant] = useState(false);
  const [businessImage, setBusinessImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { mutateAsync: signup, isPending } = useSignupMutation();
  const navigate = useNavigate();
    const africanCountries = countries.filter(
      (country) => africanCountryCodes.includes(country.code)
    );
    const uniqueCountries = Array.from(new Map(africanCountries.map(c => [c.code, c])).values());
    const [country, setCountry] = useState(uniqueCountries[0]);
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  
  const password = watch("password");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the file to state
      setBusinessImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setBusinessImage(null);
    setImagePreview(null);
  };

  const submit = async (values) => {
    const referredBy = sessionStorage.getItem("referralCode");
    
    try {
      delete values.confirmPassword;
      
      // Prepare merchant data if applicable
      const merchantData = isMerchant ? {
        isMerchant: true,
        merchantInfo: {
          category: values.category,
          merchantName: values.merchantName,
          address: values.address,
          country: values.country,
          state: values.state,
          businessProfile: values.businessProfile || "",
          businessImageFile: businessImage // Pass the file object directly
        }
      } : {};
      
      const payload = referredBy
        ? { ...values, role: 'user', referredBy, ...merchantData }
        : { ...values, role: 'user', ...merchantData };

      const { data } = await signup(payload);
      sessionStorage.setItem('email', data.user.email);
      onClose();
      navigate('/verification/?type=register');
      notifier({ message: "Successfully signed up", type: 'success' });
    } catch (e) {
      if (e instanceof AxiosError) {
        const message = e.response?.data?.message ?? e.response?.data ?? "Error signing up";
        return notifier({ message, type: 'error' });
      }
      notifier({ message: e.message || "Error signing up", type: 'error' });
    }
  };

  return (
    <section className="flex flex-col items-center w-full">
      <main className="w-full">
        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <h3 className="font-[Inter] font-bold text-primary-500 text-2xl my-4 text-center">
            Create an account
          </h3>
          
          {/* Merchant Toggle */}
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center">
              <span className="mr-3 text-gray-700">Regular User</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isMerchant}
                  onChange={() => setIsMerchant(!isMerchant)}
                />
                <div className={`w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all ${isMerchant ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
              </label>
              <span className="ml-3 text-gray-700">Merchant</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            {/* Name fields */}
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
            
            {/* Email */}
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
            
            {/* Phone */}
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
            
            {/* Merchant Fields */}
            {isMerchant && (
              <>
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <h4 className="font-semibold text-lg text-gray-700 mb-4">Business Information</h4>
                  
                  {/* Category */}
                  <div className="flex flex-col mb-4">
                    <label htmlFor="category" className="opacity-70">
                      Business Category *
                    </label>
                    <Select
                 size="lg"
                 variant="bordered"
                 radius="full"
                 
                {...register("category", { required: isMerchant })}
                onSelectionChange={(e) => {
                  const catgr = Array.from(e)[0];
                  setValue("category",catgr)
                }}
                required
              >
               <SelectItem textValue="">Select category</SelectItem>
                      <SelectItem textValue="Restaurants">Restaurant</SelectItem>
                      <SelectItem textValue="Food Items">Food Items</SelectItem>
                      <SelectItem textValue="African Attire">African Attire</SelectItem>
                      <SelectItem textValue="Herb">Herb</SelectItem>
                      <SelectItem textValue="Hair Saloon">Hair Saloon</SelectItem>
              </Select>
                    {errors?.category && (
                      <p className="text-red-500 text-base italic">
                        Business category is required
                      </p>
                    )}
                  </div>
                  
                  {/* Merchant Name */}
                  <div className="flex flex-col mb-4">
                    <label htmlFor="merchantName" className="opacity-70">
                      Business Name *
                    </label>
                    <input
                      className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
                      name="merchantName"
                      {...register("merchantName", {
                        required: isMerchant && "Business name is required",
                      })}
                      placeholder="Your business name"
                      type="text"
                      disabled={isPending}
                    />
                    {errors?.merchantName?.message && (
                      <p className="text-red-500 text-base italic">
                        {errors?.merchantName?.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Address */}
                  <div className="flex flex-col mb-4">
                    <label htmlFor="address" className="opacity-70">
                      Business Address *
                    </label>
                    <input
                      className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
                      name="address"
                      {...register("address", {
                        required: isMerchant && "Business address is required",
                      })}
                      placeholder="Full business address"
                      type="text"
                      disabled={isPending}
                    />
                    {errors?.address?.message && (
                      <p className="text-red-500 text-base italic">
                        {errors?.address?.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Country and State */}
                  <div className="flex gap-6 flex-col sm:flex-row mb-4">
                    <div className="flex flex-col w-full">
                      <label htmlFor="country" className="opacity-70">
                        Country *
                      </label>
                      <Select
                 size="lg"
                 variant="bordered"
                 radius="full"
                 
                {...register("country", { required: isMerchant })}
                selectedKeys={country.code ? new Set([country.code]) : new Set()}
                onSelectionChange={(e) => {
                  const selectedCode = Array.from(e)[0];
                  const selected = uniqueCountries.find(c => c.code === selectedCode);
                  console.log("selectedCountry",selected);
                  setValue("country",selected.name)
                  if (selected) setCountry(selected);
                }}
                required
              >
                {uniqueCountries.map((country) => (
                  <SelectItem 
                    key={country.code} 
                    textValue={country.name}
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://flagcdn.com/16x12/${country.code.toLowerCase()}.png`} 
                        alt={country.name} 
                        className="w-5 h-5" 
                      />
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
                      {errors?.country?.message && (
                        <p className="text-red-500 text-base italic">
                          {errors?.country?.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col w-full">
                      <label htmlFor="state" className="opacity-70">
                        State *
                      </label>
                      <input
                        className="bg-[#FFF] px-4 py-3 outline-none w-full text-[#000000] border transition-colors duration-100 focus:border-[#596A95] border-gray-300 rounded-full"
                        name="state"
                        {...register("state", {
                          required: isMerchant && "State is required",
                        })}
                        placeholder="State"
                        type="text"
                        disabled={isPending}
                      />
                      {errors?.state?.message && (
                        <p className="text-red-500 text-base italic">
                          {errors?.state?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Business Image Upload */}
                  <div className="flex flex-col mb-4">
                    <label htmlFor="businessImage" className="opacity-70 mb-2">
                      Business Image
                    </label>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      disabled={isPending}
                    />
                    
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Business preview"
                          className="w-full h-48 object-contain rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={triggerFileInput}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <p className="mt-2 text-sm text-gray-600">
                            Click to upload business image
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            
            {/* Password Fields */}
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
                  type="password"
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
                  type="password"
                />
                {errors?.confirmPassword?.message && (
                  <p className="text-red-500 text-base italic">
                    {errors?.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className={`w-full h-[50px] text-[1.1rem] mt-10 bg-primary-500 text-white rounded-full transition-all duration-150 ease-in-out ${isPending ? 'opacity-70' : ''}`}
          >
            {isPending ? (
              <span className="flex gap-2 items-center justify-center">
                <LiaSpinnerSolid size={20} className="animate-spin" />
                Signing Up...
              </span>
            ) : (
              'Sign Up'
            )}
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
      </main>
    </section>
  );
}