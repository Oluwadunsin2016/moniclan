/* eslint-disable react/prop-types */

import { Modal, ModalContent, ModalHeader, ModalBody,} from '@nextui-org/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import { useDataStore } from '../../store/Global';

const stripePromise = loadStripe('pk_test_51RMbxj09i38bl2Yc4l8koUqvK2M3ilZfxLrDaqdxJ0IRyH5VzLrv7Z1ZUa1YC2IQXn0EElyjGyU5jqco9STsC0ha00qPFWGeD5');


const StripeModal = ({ isOpen, onClose,onOpenSuccess,handleComplete }) => {
    const {data,clearData}=useDataStore()
    const rawAmount = Number(data?.amount);
    const payload = {
      ...data,
      amount: !isNaN(rawAmount) && rawAmount > 0 ? Math.round(rawAmount * 100) : 0, // fallback to 0 if invalid
    };
    const stripeOptions = {
      mode: 'payment',
      // amount: Math.round(Number(data?.amount) * 100),
      ...(payload.amount > 0 && { amount: payload.amount }),
      currency: 'usd',
      appearance: {},
    };
    return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader className="text-lg font-bold">Complete Your Payment</ModalHeader>
        <ModalBody>
          <Elements stripe={stripePromise} options={stripeOptions}>
            <StripeCheckoutForm handleComplete={handleComplete} onOpenSuccess={onOpenSuccess} payload={payload} clearData={clearData} onClose={onClose} />
          </Elements>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StripeModal;
