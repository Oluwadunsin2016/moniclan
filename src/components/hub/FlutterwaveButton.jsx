/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useDataStore } from '../../store/Global';

import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useMakeTransaction } from '../../apis/transaction';
import { formatCurrency, notifier } from '../../lib/utils';


const FlutterwaveButton = ({onOpenSuccess,handleComplete,isDisabled }) => {
    const { data,clearData}=useDataStore()
      const {mutateAsync:makeTransaction}= useMakeTransaction()
    // amount: Math.round(Number(data?.amount) * 100),

    console.log('data:',data)
    const config = {
      public_key: 'FLWPUBK_TEST-ded689a03e86bb52e3333bed14dec750-X',
      tx_ref: Date.now(),
      amount: Number(data?.convertedAmount),
      currency: data.to,
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: 'Olakunle@gmail.com',
        phone_number: '07031342626',
        name: 'Olakunle Adebanjo',
      },
      customizations: {
        title: 'Moniclan',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
      },
    };
  
    const fwConfig = {
      ...config,
      text: 'Pay with Flutterwave!',
      callback: async(response) => {
             await makeTransaction(data,{
                  onSuccess:()=>{
                    notifier({message:'Transaction successful',type:'success'})
                    handleComplete()
                    clearData()
                  },
                  onError:(error)=>{
                    notifier({message:error.response.message??'There is an error making the transaction',type:'error'})
                    console.log(error);
                  }
                })
         console.log(response);
         clearData()
        closePaymentModal() // this will close the modal programmatically
      },
      onClose: () => {},
    };

    return (
    < >
           <FlutterWaveButton className='w-full text-center disabled:cursor-not-allowed disabled:bg-blue-400 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition' disabled={isDisabled} {...fwConfig} />
    </>
  );
};

export default FlutterwaveButton;
