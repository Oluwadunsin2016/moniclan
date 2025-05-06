/* eslint-disable react/prop-types */
import {useState} from "react";
import { Button, Input } from "@nextui-org/react";
import { useDataStore } from "../../store/Global";

const RecipientInformation = ({ goNext,editMode }) => {
   const {data,updateData}=useDataStore()
  const [isAccountNameMatched, setIsAccountNameMatched] = useState({
    message: "",
    status: false,
  });
  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const ContinueToNext = () => {
    console.log("accountDetails:", data.recipient_accountDetails);
    console.log("user:", user);
  
    const accountNameParts = data.recipient_accountDetails?.account_name?.toLowerCase().split(" ") || [];
    const firstName = user?.firstName?.toLowerCase();
    const lastName = user?.lastName?.toLowerCase();
  
    const accountFirstName = accountNameParts[0]; // First word
    const accountLastName = accountNameParts[accountNameParts.length - 1]; // Last word
  
    if (firstName !== accountFirstName) {
      setIsAccountNameMatched({
        message: "The first name you provided does not match the account first name",
        status: false,
      });
      return;
    }
  
    if (lastName !== accountLastName) {
      setIsAccountNameMatched({
        message: "The last name you provided does not match the account last name",
        status: false,
      });
      return;
    }
  
    setIsAccountNameMatched({
      message: "The name you provided is correct",
      status: true,
    });
    goNext();
  };
  

  return (
    <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
      {!editMode &&
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Recipient Details</h1>
        <p>
          This information should match the name on your recipient&apos;s bank
          account
        </p>
      </div>
      }
      <div className="w-full flex flex-col gap-6">
        <div>
          <label htmlFor="" className="mb-4 ms-2 text-lg">
            First Name
          </label>
          <Input
            size="lg"
            name="firstName"
            type="text"
            placeholder=""
            onChange={(e) =>
              setUser((prev) => {
                return { ...prev, firstName: e.target.value };
              })
            }
            className="rounded-md"
          />
        </div>
        <div>
          <label htmlFor="" className="mb-4 ms-2 text-lg">
            Middle Name (optional)
          </label>
          <Input
            size="lg"
            name="middleName"
            type="text"
            placeholder=""
            onChange={(e) =>
              setUser((prev) => {
                return { ...prev, middleName: e.target.value };
              })
            }
            className="rounded-md"
          />
        </div>
        <div>
          <label htmlFor="" className="mb-4 ms-2 text-lg">
            Last Name
          </label>
          <Input
            size="lg"
            type="text"
            name="lastName"
            placeholder=""
            onChange={(e) =>
              setUser((prev) => {
                return { ...prev, lastName: e.target.value };
              })
            }
            className="rounded-md"
          />
        </div>
            <div>
                  <label htmlFor="" className="mb-4 ms-2 text-lg">
                    Email
                  </label>
                  <Input
                    size="lg"
                    type="email"
                    placeholder="example@gmail.com"
                    className="rounded-md"
                    onChange={(e)=>updateData({recipient_accountDetails:{...data.recipient_accountDetails,email:e.target.value}})}
                  />
                </div>
        <p
          className={`${
            isAccountNameMatched.status ? "text-green-600" : "text-red-500"
          } text-sm font-semibold flex items-center`}
        >
          {isAccountNameMatched?.message}
        </p>
        {!editMode
        &&
        <Button
          onPress={ContinueToNext}
          color="primary"
          className="mt-8 w-full rounded-md text-medium"
        >
          Continue
        </Button>
        }
      </div>
    </div>
  );
};

export default RecipientInformation;
