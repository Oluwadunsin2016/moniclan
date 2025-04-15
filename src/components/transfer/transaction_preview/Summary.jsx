
import { formatCurrency } from '../../../lib/utils'
import { useDataStore } from '../../../store/Global'
import { IoIosMail } from 'react-icons/io'

const Summary = () => {
    const {data}=useDataStore()
  return (
    <div>
        <h1 className='font-semibold text-2xl'>You are ready to send!</h1>
<div className='mt-6 flex flex-col gap-4'>
    <div className='flex justify-between items-center text-lg'>
        <p>Amount to send</p>
        <span className='font-semibold'>{formatCurrency(data?.from,data?.amount)??'N/A'}</span>
    </div>
    <div className='flex justify-between items-center text-lg'>
        <p>Transfer fee</p>
        <span className='font-semibold'>0.00 {data?.from}</span>
    </div>
    <hr />
    <div className='flex justify-between items-center text-lg'>
        <p className='font-semibold'>Total Cost</p>
        <span className='font-semibold'>{formatCurrency(data?.from,data?.amount)??'N/A'}</span>
    </div>
    <div className='flex justify-between items-center text-lg'>
        <p>Total to recipient</p>
        <span className='font-semibold'>{formatCurrency(data?.to,data?.convertedAmount)??'N/A'}</span>
    </div>
    <hr />
    <div className='flex justify-between items-center text-lg'>
        <p>Exchange rate</p>
        <span className='font-semibold'>{formatCurrency(data?.from,1)} = {formatCurrency(data?.to,data?.exchangeRate)}</span>
    </div>
    <div className='space-y-2'>
        <p>Cross over may earn revenue from the conversion of USD to other currencies.</p>
        <p>You can cancel for a full refund anytime, unless the funds have been picked up or deposited.</p>
    </div>

    <div className="bg-blue-200 p-4 rounded-md flex gap-4 items-center">
    <IoIosMail size={20} />
        <div>
        <p className="font-semibold">
         Delivery within 1 hour
        </p>
        <p>Money available by Monday, February 10, 2025 8:44 PM WAT</p>
      </div>
        </div>

        <div>
        <p>Do you know your recipient? If send a transfer to a scammer, we might not be able to help and you could loose your money</p>
    </div>
</div>
    </div>
  )
}

export default Summary