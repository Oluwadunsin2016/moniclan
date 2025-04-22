import { useState, useEffect } from "react";
import { InputOtp, Spinner } from "@nextui-org/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { notifier } from "../lib/utils";
import { useResenOtpMutation, useVerifyMutation } from "../apis/auth";


const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type'); 
//   const type = searchParams.get('type');
  const { authenticate } = useAuth();

  const { mutateAsync: verify, isPending } = useVerifyMutation();
  const { mutateAsync: resend,  } = useResenOtpMutation();
  const navigate = useNavigate();

  // const fullEmail = "oladimeji@gmail.com";
  const email = sessionStorage.getItem("email");
  // const maskedEmail = maskEmail(email);

  useEffect(()=>{
    if(!(!!type&& ['login', 'register'].includes(type))){
      navigate(-1);
    }
  },[type,navigate])
  
  const verifyOTP = async (code) => {
    await verify(
      { code: `${code}`, email,type },
      {
        onSuccess: ({data}) => {
          console.log(data);
          if (data?.user) {
            authenticate({ user: data.user, token: data.token });
            notifier({
              message: data.message,
              type: "success",
            });
            sessionStorage.removeItem("email")
            setOtp("");
            // navigate("/home");
            navigate("/");
          }
        },
        onError: (error) => {
          console.log(error);
          const message=error.response.data.message??error.response.data??error.message ?? "Something went wrong";
          notifier({
            message,
            type: "error",
          });
        },
      }
    );
  };

  const resendOtp = async () => {
    await resend(
      { email,type },
      {
        onSuccess: ({data}) => {
          console.log(data);
          if (data?.message) {
            notifier({
              message: data?.message,
              type: "success",
            });
            setOtp("");
          }
        },
        onError: (error) => {
          console.log(error);
          const message=error.response.data.message??error.response.data??error.message ?? "Something went wrong";
          notifier({
            message,
            type: "error",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (otp.length === 6) {
      verifyOTP(otp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 min-h-[60vh] rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center p-4">
          <img
            src={'/assets/otp.png'}
            alt="OTP Illustration"
            width={400}
            height={600}
          />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {type==='register'?"Account":"Login"} Verification 
          </h2>
          <p className="text-gray-500 mb-4">Enter OTP Code sent to {email}</p>

          <div className="flex justify-center mb-4 w-full">
            <InputOtp
              value={otp}
              onValueChange={setOtp}
              length={6}
              size="lg"
              isDisabled={isPending}
            />
          </div>

          {isPending && (
            <Spinner
              color="primary"
              label="Verifying OTP..."
              className="mb-4"
            />
          )}

          <p className="text-gray-500 text-sm">
            Didn’t receive OTP code?{" "}
            <button onClick={resendOtp } className="text-blue-600">
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// const maskEmail = (email) => {
//   const [name, domain] = email?.split("@");

//   if (name?.length <= 2) {
//     return "*".repeat(name?.length) + "@" + domain;
//   }

//   const visible = name.slice(0, 2); // First 2 letters
//   const masked = "*".repeat(name?.length - 2);

//   return `${visible}${masked}@${domain}`;
// };

export default OTPVerification;
