/* eslint-disable react/prop-types */
import { Button, Input,Select, SelectItem  } from '@nextui-org/react'
import { MdLock } from 'react-icons/md'
import { useDataStore } from '../../store/Global'

const SenderAddress = ({goNext,editMode}) => {
  const {data,updateData}=useDataStore()
  const states = [
    { key: "AL", value: "Alabama" },
    { key: "AK", value: "Alaska" },
    { key: "AZ", value: "Arizona" },
    { key: "AR", value: "Arkansas" },
    { key: "CA", value: "California" },
    { key: "CO", value: "Colorado" },
    { key: "CT", value: "Connecticut" },
    { key: "DE", value: "Delaware" },
    { key: "DC", value: "District of Columbia" },
    { key: "FL", value: "Florida" },
    { key: "GA", value: "Georgia" },
    { key: "GU", value: "Guam" },
    { key: "HI", value: "Hawaii" },
    { key: "ID", value: "Idaho" },
    { key: "IL", value: "Illinois" },
    { key: "IN", value: "Indiana" },
    { key: "IA", value: "Iowa" },
    { key: "KS", value: "Kansas" },
  ];

const ContinueToNext=()=>{
goNext()
}
  return (
    <div className={`${!editMode&&'min-h-screen'} flex flex-col p-8 bg-white`}>
      {!editMode
      &&
   <div className='mb-4'>
      <h1 className="text-2xl font-bold mb-2">Sender Address</h1>
   </div>
      }
      <div className="w-full flex flex-col gap-6">
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>Street address line 1</label>
        <Input
        size='lg'
          type="text"
          placeholder=""
          className='rounded-md'
          value={data?.senderDetails?.address}
          onChange={(e)=>updateData({senderDetails:{...data?.senderDetails,address: e.target.value}})}
        />
      </div>
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>Apartment, suite, unit, etc. (optional)</label>
        <Input
        size='lg'
          type="text"
          placeholder=""
          className='rounded-md'
          value={data?.senderDetails?.apartment}
          onChange={(e)=>updateData({senderDetails:{...data?.senderDetails,apartment: e.target.value}})}
        />
      </div>
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>City</label>
        <Input
        size='lg'
          type="text"
          placeholder=""
          className='rounded-md'
          value={data?.senderDetails?.city}
          onChange={(e)=>updateData({senderDetails:{...data?.senderDetails,city: e.target.value}})}
        />
      </div>
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>State</label>
         <Select onSelectionChange={(e)=>updateData({senderDetails:{...data?.senderDetails,state: e.currentKey}})} label="Select a state">
      {states.map((state) => (
        <SelectItem key={state.value} value={state.key}>
          {state.value}
        </SelectItem>
      ))}
    </Select>
      </div>
      <div>
      <label htmlFor="" className='mb-4 ms-2 text-lg'>Zip code</label>
        <Input
        size='lg'
          type="number"
          placeholder=""
          className='rounded-md'
          value={data?.senderDetails?.zipCode}
          onChange={(e)=>updateData({senderDetails:{...data?.senderDetails,zipCode: e.target.value}})}
        />
      </div>

      {!editMode&&
      <div>
     <Button onPress={ContinueToNext} color='primary' className='mt-8 w-full rounded-md text-medium'>Continue</Button>

     <div className='flex items-center gap-4 px-4'>
     <MdLock size={25} />
     <p className='text-sm'>This information helps prevent fraud and makes Moniclan safer. We keep it secure and confidential.</p>
     </div>
        </div>}
      </div>
    </div>
  )
}

export default SenderAddress