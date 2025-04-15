/* eslint-disable react/prop-types */
import { useDataStore } from "../../store/Global";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";

const ConfirmModal = ({ onOpenChange, isOpen, goNext, onClose }) => {
  const {data}=useDataStore()
  console.log(data);
  
  const confirm = () => {
    onClose();
    goNext();
  };
  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className="text-center p-6">
          <img
            alt=""
            src="https://dqyag3aekzepn.cloudfront.net/narwhal-assets/compressed/5aee29154ab545578bd4884470af8bc5.png"
            className="mx-auto"
            width={50}
            height={50}
          />
          <h2 className="text-2xl font-bold">Confirm your information</h2>
          <p className="text-lg">
            Your information should exactly match what&apos;s on your ID.
            Mismatched information will delay your transfer.
          </p>

          <div className="text-lg font-semibold">
            <p>{data?.senderDetails?.firstName} {data?.senderDetails?.lastName}</p>
            <p>{data?.senderDetails?.dob}</p>
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col gap-4">
          <Button color="primary" onPress={confirm} className="rounded-md">
            Confirm
          </Button>
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            className="rounded-md"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
