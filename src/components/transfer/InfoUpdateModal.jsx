/* eslint-disable react/prop-types */
import { useDataStore } from "../../store/Global";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import TransferAmount from "./TransferAmount";
import DeliveryMethod from "./DeliveryMethod";
import RecipientBank from "./RecipientBank";
import RecipientAccountDetails from "./RecipientAccountDetails";
import SenderInformation from "./SenderInformation";
import SenderAddress from "./SenderAddress";
import SenderContact from "./SenderContact";
import RecipientInformation from "./RecipientInformation";
import RecipientNotification from "./RecipientNotification";
import SenderReason from "./SenderReason";
import PaymentMethod from "./PaymentMethod";

const InfoUpdateModal = ({ onOpenChange, isOpen, onClose,}) => {
  const {editMode,setEditMode}=useDataStore()
  
  const confirm = () => {
    setEditMode({status:false,fieldName:''});
    onClose();
  };
  return (
    <Modal placement="center" size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-xl font-bold text-center w-full">Update {editMode.fieldName}</h2>
        </ModalHeader>
        <ModalBody>
      {editMode.fieldName=='Transfer Amount' && <TransferAmount editMode={editMode.status} />}
      {editMode.fieldName=='Delivery Method' && <DeliveryMethod editMode={editMode.status} />}
      {editMode.fieldName=='Recipient Bank' && <RecipientBank editMode={editMode.status} />}
      {editMode.fieldName=='Account Number' && <RecipientAccountDetails editMode={editMode.status} />}
      {editMode.fieldName=='Sender Details' && <SenderInformation editMode={editMode.status} />}
      {editMode.fieldName=='Sender Address' && <SenderAddress editMode={editMode.status} />}
      {editMode.fieldName=='Payment Method' && <PaymentMethod editMode={editMode.status} />}
      {editMode.fieldName=='Sender Contact' && <SenderContact editMode={editMode.status} />}
      {editMode.fieldName=='Recipient Details' && <RecipientInformation editMode={editMode.status} />}
      {editMode.fieldName=='Recipient Contact' && <RecipientNotification editMode={editMode.status} />}
      {editMode.fieldName=='Reason' && <SenderReason editMode={editMode.status} />}
        </ModalBody>
        <ModalFooter className="flex gap-4 justify-end">
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            className="rounded-md"
          >
            Close
          </Button>
          <Button color="primary" onPress={confirm} className="rounded-md">
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InfoUpdateModal;
