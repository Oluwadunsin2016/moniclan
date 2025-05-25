/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useStripe, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { useCreateStripePayment, useMakeTransaction } from '../../apis/transaction';
import { formatCurrency, notifier } from '../../lib/utils';
import { Button } from '@nextui-org/react';

const StripeCheckoutForm = ({payload, clearData, onClose,onOpenSuccess, handleComplete}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
 
  const {mutateAsync:makePayment}= useCreateStripePayment()
        const {mutateAsync:makeTransaction}= useMakeTransaction()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const res = await makePayment({...payload, amount:payload?.amount/100});
    console.log(res);
    const { client_secret: clientSecret } = res.data;
    console.log(clientSecret);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      // confirmParams: {
      //   return_url: 'http://localhost:5173/complete',
      // },
    confirmParams: {
      return_url: 'http://localhost:5173/complete',
      },
      redirect: "if_required",
    });
console.log(paymentIntent);
    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent?.status === "succeeded") {
        await makeTransaction(payload,{
          onSuccess:()=>{
            notifier({message:'Transaction successful',type:'success'})
            handleComplete()
            clearData()
            onClose()
          },
          onError:(error)=>{
            notifier({message:error.response.message??'There is an error making the transaction',type:'error'})
            console.log(error);
          }
        })
        onOpenSuccess();
        onClose(); // or any other logic
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <p className="text-red-500 my-2">{errorMessage}</p>}
      <hr />
      <Button
      color='primary'
      radius='sm'
        type="submit"
        disabled={!stripe || !elements}
        className="w-full mt-10 mb-4"
      >
        {/* Pay {formatCurrency('NGN',Number(payload?.convertedAmount).toFixed(2))} */}
        Pay ${Number(payload?.amount/100).toFixed(2)}
      </Button>
    </form>
  );
};

export default StripeCheckoutForm;
