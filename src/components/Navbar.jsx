import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import { TbChevronDown, TbLogout, TbUsers } from "react-icons/tb";
import SimpleDropdown from "./shared/SimpleDropdown";
import { useAuth } from "../lib/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaHandPointer } from "react-icons/fa";
import AuthModal from "./shared/AuthModal";
import { GrHistory } from "react-icons/gr";
import Refer from "./Refer";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Nav() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const menuItems = [
  //     {
  //       name:"Send Money",
  //       href:"/home/send-money"
  //     },
  //     {
  //       name:"Payment Hub(USD)",
  //       href:"/home/hub"
  //     },
  //     {
  //       name:"Marketplace",
  //       href:"/home/marketplace"
  //     },
  //     {
  //       name:"Express Delivery",
  //       href:"/home/express-delivery"
  //     },
  // ];
  const menuItems = [
    {
      name: "Send Money",
      href: "/send-money",
    },
    // {
    //   name:"Payment Hub(USD)",
    //   href:"/hub"
    // },
    {
      name: "Bill Ease",
      href: "/bill",
    },
    {
      name: "Marketplace",
      href: "/marketplace",
    },
    {
      name: "Express Delivery",
      href: "/express-delivery",
    },
  ];

  return (
    <Navbar
      isBordered
      className="h-[60px] bg-white"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="pr-3" justify="start">
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <AcmeLogo />
            <p className="font-bold text-inherit">MONICLAN</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="flex gap-10">
          {menuItems.map((item, index) => (
            <NavbarItem
              key={`${item.name}-${index}`}
              className="relative hidden lg:block"
            >
              <Link
                className={`text-blue-700 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:ease-in-out after:scale-x-0 after:origin-center ${
                  pathname === item.href ? "after:scale-x-100" : ""
                }`}
                to={item.href}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          {user && (
            <NavbarItem className="hidden md:block">
              <Refer />
            </NavbarItem>
          )}
          {user ? (
            <NavbarItem>
              <SimpleDropdown
                trigger={
                  <div className="flex items-center gap-2">
                    <p className="font-bold max-w-[150px] truncate">
                      Hi {user?.firstName} {user?.lastName}
                    </p>
                    <TbChevronDown size="18" />
                  </div>
                }
                items={[
                  { text: "Profile", icon: <TbUsers size="18" /> },
                  {
                    text: "Transaction History",
                    icon: <GrHistory size="16" />,
                    onClick: () => navigate("/transaction-history"),
                  },
                  {
                    text: "Logout",
                    icon: <TbLogout size="18" />,
                    onClick: logout,
                  },
                ]}
              />
            </NavbarItem>
          ) : (
            <NavbarItem className="flex px-3 py-1 rounded-md border border-[#2c5e9b]">
              {/* <div className="relative">
            <div className="absolute -bottom-10 -left-8 -translate-x-1/2 animate-bounce z-10">
            <FaHandPointer size={25} className="rotate-45 text-gray-600" />
            </div>
          </div> */}
              <Link to="#" onClick={onOpen}>
                Sign in
              </Link>
            </NavbarItem>
          )}
        </div>
      </NavbarContent>

      <NavbarMenu className="mt-5">
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            onClick={() => setIsMenuOpen(false)}
            key={`${item.name}-${index}`}
          >
            <Link
              className="w-full text-blue-700 hover:text-blue-800 font-bold"
              color={"foreground"}
              to={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
          {user && (
            <NavbarItem className="block md:hidden">
              <Refer />
            </NavbarItem>
          )}
      </NavbarMenu>
      <AuthModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        user={user}
        onClose={onClose}
      />
    </Navbar>
  );
}
