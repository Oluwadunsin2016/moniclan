/* eslint-disable react/prop-types */
import { useDataStore } from '../../../store/Global'
import { Tooltip } from '@nextui-org/react'
import { CiEdit } from 'react-icons/ci'

const SenderDetails = ({onOpen}) => {
   const {data,setEditMode}=useDataStore()

   const handleEdit=(fieldName)=>{
    setEditMode({status:true,fieldName})
    onOpen()
  }
  return (
    <div>
    <h1 className="font-semibold text-2xl border-b-2">Sender Details</h1>
    <div className="mt-6 flex flex-col gap-4">
  
      <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Name</p>
            <span className="font-semibold">{`${data?.senderDetails?.firstName} ${data?.senderDetails?.lastName}`}</span>
          </div>

        <Tooltip content='Edit'>
        <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Sender Details')}  />
        </Tooltip>
      </div>
      <hr />
      <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Address</p>
            <span className="font-semibold">{data?.senderDetails?.address} {data?.senderDetails?.address},</span>
            <p className="font-semibold">{data?.senderDetails?.zipCode}</p>
          </div>

        <Tooltip content='Edit'>
        <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Sender Address')}  />
        </Tooltip>
      </div>
      <hr />
      <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Phone Number</p>
            <span className="font-semibold">{data?.senderDetails?.phone_number??'N/A' }</span>
          </div>

        <Tooltip content='Edit'>
        <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Sender Contact')}  />
        </Tooltip>
      </div>
    </div>
  </div>
  )
}

export default SenderDetails