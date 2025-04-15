/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState,useRef } from "react";
import { Button, Checkbox, Input } from "@nextui-org/react";
import discover from '../../../public/assets/discover.webp'
import visa from '../../../public/assets/visa.jpg'
import mastercard from '../../../public/assets/mastercard.png'
import amex from '../../../public/assets/amex.avif'
import credit_card from '../../../public/assets/credit_card_2.png'
import { useDataStore } from "../../store/Global";

export default function CardDetails({ goNext }) {
 const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
const [expiration, setExpiration] = useState(""); // Stores MMYY
  const [cvv, setCvv] = useState("");
  const [hiddenCvv, setHiddenCvv] = useState(""); // Stores the masked CVV
  const cvvTimeoutRef = useRef(null);
  const expirationRef = useRef(null);

  const {updateData}=useDataStore()

  // Function to detect card type
  const detectCardType = (cardNumber) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
    };

    for (let type in patterns) {
      if (patterns[type].test(cardNumber.replace(/\s/g, ""))) {
        return type;
      }
    }
    return "";
  };

    const formatCardNumber = (value) => {
    // Remove non-numeric characters
    let numericValue = value.replace(/\D/g, "");

    // Limit to 16 digits
    numericValue = numericValue.slice(0, 16);

    // Add spaces every 4 digits
    return numericValue.replace(/(\d{4})/g, "$1 ").trim();
  };

  // Handle card input change
const handleCardInput = (e) => {
  const formattedCardNumber = formatCardNumber(e.target.value);
  setCardNumber(formattedCardNumber); // Update the state
  const type = detectCardType(formattedCardNumber);
  setCardType(type);
};

  // Mapping card type to logos
  const cardLogos = {
    visa,
    mastercard,
    amex,
    discover,
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = "MM / YY";
    let cursorPosition = e.target.selectionStart;
  
    if (value.length > 4) value = value.slice(0, 4); // Max 4 digits
  
    // Extract month and year
    let month = value.slice(0, 2);
    let year = value.slice(2, 4);
  
    // Ensure month is valid (01-12)
    if (month.length === 2) {
      let numericMonth = parseInt(month, 10);
      if (numericMonth < 1 || numericMonth > 12) {
        month = "12"; // Force it to 12 if out of range
      }
    }
  
    // Ensure year is not in the past
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    if (year.length === 2 && parseInt(year, 10) < currentYear) {
      year = currentYear.toString(); // Prevent past year input
    }
  
    // Reconstruct expiration format
    let newValue = `${month} / ${year}`;
  
    setExpiration(newValue);
  
    // Move cursor correctly
    setTimeout(() => {
      if (cursorPosition === 2) {
        expirationRef.current.setSelectionRange(5, 5); // Jump over slash
      } else {
        expirationRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };
  
  const handleExpirationKeyDown = (e) => {
    let cursorPosition = expirationRef.current.selectionStart;
  
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default behavior
  
      let value = expiration.replace(/\D/g, ""); // Get only numbers
  
      if (value.length === 0) return; // Stop Backspace Rotation When Empty
  
      let formattedValue = "MM / YY";
  
      if (cursorPosition === 5) {
        expirationRef.current.setSelectionRange(2, 2); // Move before `/`
        return;
      }
  
      if (cursorPosition === 3) {
        expirationRef.current.setSelectionRange(1, 1); // Move to MM section
        return;
      }
  
      if (cursorPosition > 0) {
        value = value.substring(0, value.length - 1); // Remove last digit
      }
  
      // Reconstruct expiration format
      let month = value.slice(0, 2);
      let year = value.slice(2, 4);
  
      // Ensure month is valid
      if (month.length === 2) {
        let numericMonth = parseInt(month, 10);
        if (numericMonth < 1 || numericMonth > 12) {
          month = "12"; // Correct invalid month
        }
      }
  
      // Ensure year is not in the past
      const currentYear = new Date().getFullYear() % 100;
      if (year.length === 2 && parseInt(year, 10) < currentYear) {
        year = currentYear.toString();
      }
  
      let newValue = `${month} / ${year}`;
      setExpiration(newValue);
  
      // Stop Cursor from Moving When Fully Deleted
      setTimeout(() => {
        if (value.length === 0) {
          expirationRef.current.setSelectionRange(0, 0); // Lock at start
        } else {
          expirationRef.current.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        }
      }, 0);
    }
  };
  



  // Function to handle CVV input
const handleCvvChange = (e) => {
  let value = e.target.value.replace(/\D/g, "").slice(0, 3); // Allow only digits, max 3
  if (!value) {
    setCvv(""); 
    setHiddenCvv(""); 
    return;
  }

  let maskedCvv = "•".repeat(value.length - 1) + value.slice(-1); // Mask all but the last digit
  setCvv(value);
  setHiddenCvv(maskedCvv);

  if (cvvTimeoutRef.current) clearTimeout(cvvTimeoutRef.current);
  
  cvvTimeoutRef.current = setTimeout(() => {
    setHiddenCvv("•".repeat(value.length)); // Mask last digit after 1 second
  }, 1000);
};

const handleCvvKeyDown = (e) => {
  if (e.key === "Backspace") {
    setCvv((prev) => prev.slice(0, -1));
    setHiddenCvv((prev) => prev.slice(0, -1));
  }
};


const handleNext=() => {
  console.log("cardNumber:",cardNumber);
  console.log("expiration:",expiration);
  console.log("cvv:",cvv);
  
  updateData({card_details:{card_number:cardNumber, expiration:expiration, cvv:cvv}})
  goNext()
}
  

  return (
    <div className="min-h-screen flex flex-col p-8 bg-white">
      {/* <h1 className="text-xl font-semibold mb-4">Pay with card</h1> */}
      <div className="">
        <img
                src={credit_card}
                alt={cardType}
                className="mx-auto mb-6 -mt-4"
                width={250}
                height={250}
              />
      </div>
      <div className="mb-4 bg-blue-100 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Debit cards</strong> have no extra fees.{" "}
          <strong>Credit cards</strong> have an extra 3% fee.
        </p>
      </div>

      {/* Card Number Input */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Card number
          </label>
          <div>
            {cardType ? (
              <img
                src={cardLogos[cardType]}
                alt={cardType}
                className=""
                width={40}
                height={35}
              />
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                height="2rem"
                width="2rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"></path>
              </svg>
            )}
          </div>
        </div>
        <div className="w-full">
          <Input
            placeholder="xxxx xxxx xxxx xxxx"
            type="text"
            className="w-full"
            onChange={handleCardInput}
            value={cardNumber}
          />
        </div>
      </div>

      {/* Expiration Date and Security Code */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expiration date
          </label>
          <Input
       placeholder="MM / YY"
          type="text"
          className="w-full"
          value={expiration}
       maxLength={10} // M M / Y Y (10 characters including spaces and slash)
       onKeyDown={handleExpirationKeyDown}
          onChange={handleExpirationChange}
          ref={expirationRef}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Security Code (CVV)
          </label>
          <Input
          placeholder="CVV"
          type="text"
          maxLength={3} // Allow only 3 characters
          className="w-full"
          onChange={handleCvvChange}
          />
        </div>
      </div>

      {/* Name on Card
      <div className="mb-4">
        <label
          htmlFor="name-on-card"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your name as it appears on card
        </label>
        <Input
          id="name-on-card"
          placeholder="e.g., John Doe"
          type="text"
          aria-label="Name on card"
          className="w-full"
        />
      </div>

      <div className="mt-4 text-center">
        <a href="#" className="text-blue-600 underline text-sm">
          Pay with Bank Account instead
        </a>
      </div>

      Billing Address
      <div className="mb-4">
        <h2 className="text-sm font-medium text-gray-700 mb-2">
          Billing address
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="use-home-address"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="use-home-address" className="text-sm text-gray-700">
            Use Home Address
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          22 woodroad Atlanta zip code 30188, Atlanta, GA 30188
        </p>
      </div> */}

      <div className="my-4 bg-blue-50 p-4 rounded-md">
        <p className="text-gray-400">
          Your card will not be charged until you confirm the total and pay on
          the next step.
        </p>
      </div>

<div className="flex items-center justify-between mt-4">
         <Checkbox radius="full"  classNames={{
    label: 'text-sm text-gray-600',
  }}>
          Remember this card
      </Checkbox>

      <Button
        onClick={handleNext}
        color="primary"
        className="rounded-md text-medium"
      >
        Continue
      </Button>
</div>
    </div>
  );
}
