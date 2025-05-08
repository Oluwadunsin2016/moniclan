/* eslint-disable react/prop-types */

import { Modal, ModalContent, ModalHeader, ModalBody,} from '@nextui-org/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import { useDataStore } from '../../store/Global';

const stripePromise = loadStripe('pk_test_51M6Gl6Bk8M3SFF5iquEcYoFrsv4Rim4gLlvkdnn3EhNGxi3kcfcf7JnLN1rYTKe5yxuD9KOPx0Ec1aPKsmrwRDlx00AUQVnYdg');


const StripeModal = ({ isOpen, onClose,onOpenSuccess,handleComplete }) => {
    const {data,clearData}=useDataStore()

    const stripeOptions = {
      mode: 'payment',
      amount: Math.round(data?.convertedAmount * 100),
      currency: 'ngn',
      appearance: {},
    };
    return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader className="text-lg font-bold">Complete Your Payment</ModalHeader>
        <ModalBody>
          <Elements stripe={stripePromise} options={stripeOptions}>
            <StripeCheckoutForm handleComplete={handleComplete} onOpenSuccess={onOpenSuccess} payload={data} clearData={clearData} onClose={onClose} />
          </Elements>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StripeModal;
