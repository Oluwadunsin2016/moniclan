/* eslint-disable react/prop-types */
import { useDataStore } from "../../store/Global";
import { Button, Input } from "@nextui-org/react";

const RecipientNotification = ({ goNext,editMode }) => {
   const {data,updateData}=useDataStore()
  const ContinueToNext = () => {
    goNext();
  };
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
            placeholder="08134565437"
            className="rounded-md"
            onChange={(e)=>updateData({recipient_accountDetails:{...data.recipient_accountDetails,phone_number:e.target.value}})}
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
            onClick={goNext}
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
