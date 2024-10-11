// Button that appears at the bottom of each mini-app. When the user clicks on it,
// a modal opens that explains what's happening behind the scenes on the page

'use client';

import { Modal, useModal } from './Modal';
import { PawIconWithClass } from '../icons';
import { theme } from '../styles/theme';

const ExplainPleaseButton = ({ text }: { text: string }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <section>
      <button
        onClick={openModal}
        className={`${theme.button.primary} flex mx-auto justify-center items-center text-lg rounded px-2 py-1`}
      >
        <PawIconWithClass className='mr-2' />
        <h4>Explain please!</h4>
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className='text-xl pb-2'>Kitty explains...</h2>
        <p>{text}</p>
      </Modal>
    </section>
  );
};

export default ExplainPleaseButton;
