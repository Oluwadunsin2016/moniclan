/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDataStore } from "../../store/Global";
import { Button, Input } from "@nextui-org/react";

const RecipientNotification = ({ goNext,editMode }) => {
  const [error, setError] = useState("");
   const {data,updateData}=useDataStore()

   const handleChange = (e) => {
    const value = e.target.value;

    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    // setPhoneNumber(value);

    updateData({
      recipient_accountDetails: {
        ...data.recipient_accountDetails,
        phone_number: value,
      },
    });

    // Simple validation for Nigerian number (11 digits)
    if (value && value.length !== 11) {
      setError("Phone number must be exactly 11 digits");
    } else {
      setError("");
    }
  };

  const ContinueToNext = () => {
    if (error) {
      return;
    }
    goNext();
  };

  const handleSkip = () => {
    updateData({
      recipient_accountDetails: {
        ...data.recipient_accountDetails,
        phone_number: "",
      },
    });
    goNext();
  }

  return (
    <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
      {!editMode
      &&
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Recipient Notification</h1>
        <p>Would you like us to text your recipient with transfer updates?</p>
      </div>
      }
      <div className="w-full flex flex-col gap-6">
        <div>
          <label htmlFor="" className="mb-4 ms-2 text-lg">
            Recipient mobile number (optional)
          </label>

<Input
        size="lg"
        type="tel"
        max={11}
        placeholder="08134565437"
        value={data?.recipient_accountDetails?.phone_number}
        isInvalid={!!error}
        errorMessage={error}
        className="rounded-md"
        onChange={handleChange}
      />
        </div>
{!editMode &&
        <div className="flex flex-col gap-4">
          <Button
            onPress={ContinueToNext}
            color="primary"
            className="mt-8 w-full rounded-md text-medium"
          >
            Continue
          </Button>

          <Button
            onPress={handleSkip}
            className="mt-8 w-full bg-transparent rounded-md text-medium text-blue-500 hover:bg-blue-200"
          >
            Skip
          </Button>
        </div>
}
      </div>
    </div>
  );
};

export default RecipientNotification;
