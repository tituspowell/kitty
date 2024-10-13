// Button that appears at the bottom of each mini-app. When the user clicks on it,
// a modal opens that explains what's happening behind the scenes on the page

'use client';

import { Modal, useModal, ModalParagraphs } from './Modal';
import { PawIconWithClass } from '../icons';
import { theme } from '../styles/theme';

const ExplainPleaseButton = ({ text }: { text: string[] }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <section>
      <button
        onClick={openModal}
        className={`${theme.button.active} flex mx-auto justify-center items-center text-lg rounded px-2 py-1`}
      >
        <PawIconWithClass className='mr-2' />
        <h4>Explain please!</h4>
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalParagraphs paragraphs={text}></ModalParagraphs>
      </Modal>
    </section>
  );
};

export default ExplainPleaseButton;
