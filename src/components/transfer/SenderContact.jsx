/* eslint-disable react/prop-types */
import { useDataStore } from '../../store/Global'
import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import { BsPhoneFill } from 'react-icons/bs'
import { MdLock } from 'react-icons/md'

const SenderContact = ({goNext,editMode}) => {
    const [error, setError] = useState("");
  const {data,updateData}=useDataStore()
const ContinueToNext=()=>{
goNext()
}

const handleChange = (e) => {
  const value = e.target.value;

  // Only allow digits
  if (!/^\d*$/.test(value)) return;

  // setPhoneNumber(value);

  updateData({
    recipient_accountDetails: {
      ...data.senderDetails,
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

  return (
                 <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
                  {!editMode &&
   <div className='mb-4'>
      <h1 className="text-2xl font-bold mb-2">Sender phone</h1>
   </div>
                  }
      <div className="w-full">
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>Phone number</label>
        <Input
        size="lg"
        type="tel"
        max={11}
        placeholder="08134565437"
        value={data?.senderDetails?.phone_number}
        isInvalid={!!error}
        errorMessage={error}
        className="rounded-md"
        onChange={handleChange}
      />
      </div>

{!editMode
&&
      <div>
         <div className='flex items-center gap-4 px-4 my-6'>
           <BsPhoneFill size={25} />
           <p className='text-sm'>By providing your number, you agree that we may contact you via call or text in regards to your Africana account or transfer.</p>
           </div>
<div>
     <Button onPress={ContinueToNext} color='primary' className='mt-8 w-full rounded-md text-medium'>Continue</Button>

        <div className='flex items-center gap-4 px-4 my-6'>
          <MdLock size={25} />
          <p className='text-sm'>This information helps prevent fraud and makes Africana safer. We keep it secure and confidential.</p>
          </div>
</div>
      </div>
}
      </div>
    </div>
  )
}

export default SenderContact