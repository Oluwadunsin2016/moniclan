/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalBody} from '@nextui-org/react';
import PaymentSuccess from './PaymentSuccess';

const SuccessModal = ({isOpen,onClose}) => {
  return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose} backdrop="blur">
    <ModalContent>
      <ModalBody>
        <PaymentSuccess onClose={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default SuccessModal