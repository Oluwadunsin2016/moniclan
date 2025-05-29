/* eslint-disable react/prop-types */
import { useDataStore } from "../../store/Global";
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import {
  Modal,
  ModalBody,
  ModalContent,
  Tab,
  Tabs,
} from "@nextui-org/react";

const AuthModal = ({ onOpenChange, isOpen, onClose }) => {
  const {data}=useDataStore()
  console.log(data);
  

  return (
    <Modal size="2xl" placement="center" scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className="p-6">
        <Tabs aria-label="Tabs colors" color={'primary'} radius="full">
          <Tab key="login" title="SIGN IN">
           <SignIn onClose={onClose} /> 
          </Tab>
          <Tab key="register" title="SIGN UP">
            <SignUp onClose={onClose} />
          </Tab>
        </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
