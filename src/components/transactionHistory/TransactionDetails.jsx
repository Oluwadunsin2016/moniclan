/* eslint-disable react/prop-types */
import { useAuth } from "../../lib/AuthContext";
import { formatCurrency } from "../../lib/utils";
import { IoIosArrowRoundBack } from "react-icons/io";

const TransactionDetails = ({goBack,transaction}) => {
     const { user } = useAuth();


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
      <div>
        {/* Header */}
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
          <p className="mt-2 text-sm text-gray-600">
            Transaction ID: {transaction?.createdAt.slice(0, 10).replace(/-/g, '')}-{transaction?.recipient_accountDetails.account_number.slice(-4)}
          </p>
        </div> */}
        <div className="relative px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-center">
            <div onClick={goBack} className="absolute top-6 left-4 rounded-full border-1.5 active:bg-gray-50/10 transition-all cursor-pointer text-white"><IoIosArrowRoundBack size={30} /></div>
    <h3 className="text-xl leading-6 font-medium text-white">
    Transaction Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-indigo-100">
        Transaction ID: {transaction?.createdAt?.slice(0, 10).replace(/-/g, '')}-{transaction?.recipient_accountDetails?.account_number?.slice(-4)}
        </p>
      </div>

        {/* Transaction Summary Card */}
        <div className="bg-white overflow-hidden mb-8">
          <div className="px-6 py-2 border-b border-gray-200">
            <h2 className="text-lg font-medium">Payment Summary</h2>
          </div>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Amount Sent</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(transaction?.from,transaction?.amount)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Amount In Naira</p>
                  <div className={`text-xl font-semibold ${
                                      transaction?.senderEmail == user?.email ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                      {transaction?.senderEmail == user?.email ? '-' : '+'}{transaction?.convertedAmount?formatCurrency(transaction?.to,transaction?.convertedAmount):formatCurrency(transaction?.from,transaction?.amount)}
                                    </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Exchange Rate</p>
                <p className="font-medium">1 {transaction?.from} = ₦{transaction?.exchangeRate}</p>
              </div>
              <div>
                <p className="text-gray-500">Payment Method</p>
                <p className="font-medium capitalize">{transaction?.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-500">Transaction Date</p>
                <p className="font-medium">{formatDate(transaction?.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:grid grid-cols-2 gap-8">
        <div className="bg-white overflow-hidden">
            <div className="px-6 py-2 border-b border-gray-200">
              <h2 className="text-lg font-medium">Account Details</h2>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="font-medium">{transaction?.recipient_accountDetails?.account_name}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Bank Details</p>
                <p className="font-medium">{transaction?.recipient_accountDetails?.bank_name}</p>
                <p className="text-sm text-gray-600">
                  {transaction?.recipient_accountDetails?.account_number}
                </p>
              </div>
           {transaction?.recipient_accountDetails?.phone_number &&   <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Contact Information</p>
                <p className="font-medium">{transaction?.recipient_accountDetails?.email}</p>
                <p className="text-sm text-gray-600">
                  {transaction?.recipient_accountDetails?.phone_number}
                </p>
              </div>}
            </div>
          </div>

        <div className="bg-white overflow-hidden">
          <div className="px-6 py-2 border-b border-gray-200">
            <h2 className="text-lg font-medium">Additional Information</h2>
          </div>
          <div className="px-6 py-4">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p className="font-medium">{transaction?.type}</p>
            </div>
          {transaction?.reason &&  <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Reason for Transfer</p>
              <p className="font-medium">{transaction?.reason}</p>
            </div>}
          {transaction?.service &&  <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Service</p>
              <p className="font-medium">{transaction?.service}</p>
            </div>}
            {transaction?.dueDate &&  <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Due Date</p>
              <p className="font-medium">{new Date(transaction?.dueDate).toLocaleDateString()}</p>
            </div>}
          </div>
        </div>
        </div>
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Download Receipt
              </button>
            </div>
      </div>
  );
};

export default TransactionDetails;