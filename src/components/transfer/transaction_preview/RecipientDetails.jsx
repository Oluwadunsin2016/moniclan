/* eslint-disable react/prop-types */
import { useDataStore } from '../../../store/Global'
import { Tooltip } from '@nextui-org/react'
import { CiEdit } from 'react-icons/ci'

const RecipientDetails = ({onOpen}) => {
  const {data, setEditMode}=useDataStore()

  const handleEdit=(fieldName)=>{
    setEditMode({status:true,fieldName})
    onOpen()
  }
  return (
    <div>
    <h1 className="font-semibold text-2xl border-b-2">Recipient Details</h1>
    <div className="mt-6 flex flex-col gap-4">
  
      <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Name</p>
            <span className="font-semibold">{data?.recipient_accountDetails?.account_name??'N/A'}</span>
          </div>

        {/* <Tooltip content='Edit'>
        <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Recipient Details')}  />
        </Tooltip> */}
      </div>
      <hr />
      <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Phone Number</p>
            <span className="font-semibold">{data?.recipient_accountDetails?.phone_number??'N/A'}</span>
          </div>

        <Tooltip content='Edit'>
        <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Recipient Contact')}  />
        </Tooltip>
      </div>
      <hr />
      <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Reason for sending</p>
            <span className="font-semibold">{data?.reason??'N/A'}</span>
          </div>

        <Tooltip content='Edit'>
        <CiEdit size={28} className="cursor-pointer" onClick={()=>handleEdit('Reason')}  />
        </Tooltip>
      </div>
    </div>
  </div>
  )
}

export default RecipientDetails