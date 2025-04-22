/* eslint-disable react/prop-types */
import { IoIosArrowRoundDown,IoIosArrowRoundUp } from "react-icons/io";
import { Button } from '@nextui-org/react';
import { formatCurrency } from '../../lib/utils';
import { useAuth } from '../../lib/AuthContext';

const TransactionHistoryList = ({transactions,goNext}) => {
     const { user } = useAuth();
  return (
    <div>
           <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-500 to-purple-600">
    <div>
    <h3 className="text-lg leading-6 font-medium text-white">
          Transaction History
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-indigo-100">
          All transactions for {user?.firstName} {user?.lastName}
        </p>
    </div>
      </div>
      
      {transactions?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions?.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      transaction.senderEmail == user?.email ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.senderEmail == user?.email ? '-' : '+'}{transaction.convertedAmount?formatCurrency('NGN',transaction.convertedAmount):formatCurrency('USD',transaction.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {transaction.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`px-2 inline-flex text-xs leading-5 py-1 font-semibold rounded-full ${
                     transaction.senderEmail == user?.email ?'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {transaction.senderEmail == user?.email? <span className='flex items-center gap-1'>Sent <IoIosArrowRoundUp size={20} /></span> : <span className='flex items-center gap-1'>Received <IoIosArrowRoundDown size={20} /></span> }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* <div className="text-sm text-gray-900">{transaction.description}</div> */}
                    <Button onPress={()=>goNext(transaction)} size='sm' variant='bordered' radius='full'>View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
          <p className="mt-1 text-sm text-gray-500">This user has no transaction history.</p>
        </div>
      )}
    </div>
  )
}

export default TransactionHistoryList