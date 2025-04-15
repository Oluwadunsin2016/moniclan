/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, DatePicker, Input, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { MdLock } from 'react-icons/md'
import ConfirmModal from './ConfirmModal';
import { useDataStore } from '../../store/Global';
import { useAuth } from '../../lib/AuthContext';

const SenderInformation = ({goNext,editMode}) => {
  const {data,updateData}=useDataStore()
  const {user}=useAuth()
const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
const [date, setDate] = useState()
const ContinueToNext=()=>{
  updateData({senderDetails:{...data.senderDetails,...user}})
onOpen()
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  
  setDate(`${day}-${month}-${year}`);
};

  return (
           <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
            {!editMode&&
   <div className='mb-4'>
      <h1 className="text-2xl font-bold mb-2">Sender details</h1>
   </div>
            }
      <div className="w-full flex flex-col gap-6">
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>First Name</label>
        <Input
        size='lg'
          type="text"
          placeholder=""
          className='rounded-md'
          defaultValue={user?.firstName}
          value={data?.senderDetails?.firstName}
          onChange={(e)=>updateData({senderDetails:{...data.senderDetails,firstName:e.target.value}})}
        />
      </div>
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>Middle Name (optional)</label>
        <Input
        size='lg'
          type="text"
          placeholder=""
          className='rounded-md'
          defaultValue={user?.lastName}
          value={data?.senderDetails?.lastName}
          onChange={(e)=>updateData({senderDetails:{...data.senderDetails,lastName:e.target.value}})}
        />
      </div>
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>Date of Birth</label>
      <DatePicker  size="sm"
          type="date"
          label="Date of Birth"
            onChange={(e)=>updateData({senderDetails:{...data.senderDetails,dob:formatDate(e.toDate())}})}
           />
      </div>
      {!editMode&&
      <div>
  <Button onPress={ContinueToNext} color='primary' className='mt-8 w-full rounded-md text-medium'>Continue</Button>

     <div className='flex items-center gap-4 px-4'>
     <MdLock size={25} />
     <p className='text-sm'>This information helps prevent fraud and makes Moniclan safer. We keep it secure and confidential.</p>
     </div>
      </div>
      }
      </div>
      <ConfirmModal onOpenChange={onOpenChange} isOpen={isOpen} user={user} goNext={goNext} onClose={onClose}/>
    </div>
  )
}
export default SenderInformation