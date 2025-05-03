
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useAuth } from "../lib/AuthContext";


const Refer = () => {
  const [isCopied, setIsCopied] = useState(false)
    const { user } = useAuth();


  const handleCopy = () => {
    navigator.clipboard.writeText(`https://moniclan.com/?referralCode=${user?.referralCode}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
};

  return (
  <div className="fixed right-12 bottom-1/2 z-50">
<Button radius="full" color="primary" onPress={handleCopy}>{isCopied? <span className="flex items-center gap-1">Link copied <IoMdCheckmark size={18} /></span> :'Refer us and Earn'}</Button>
  </div>
  );
};

export default Refer;
