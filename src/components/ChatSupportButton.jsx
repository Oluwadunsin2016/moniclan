import { Tooltip } from "@nextui-org/react";
import { IoLogoWhatsapp } from "react-icons/io5";


const ChatSupportButton = () => {
  const phoneNumber = "+2347031342626"; // Replace with your WhatsApp number in international format
  const message = "Hello! I need help with your service."; // You can customize this message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
  <div className="fixed right-6 md:right-12 bottom-16 z-50">

    <Tooltip content="Chat Support" showArrow >
    <div onClick={handleClick}  className="bg-green-500 hover:bg-green-600 transition-transform cursor-pointer p-2 rounded-full inline-flex items-center justify-center">
  <IoLogoWhatsapp size={25} className="text-white" />
</div>
    </Tooltip>
  </div>
  );
};

export default ChatSupportButton;
