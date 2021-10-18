import React from 'react'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    border: '1px solid #e3e3e3',
    backgroundColor: '#fff',
    backgroundClip: 'border-box',
    minWidth: '0',
    wordWrap: 'break-word',
    flexDirection: 'column',
    display: 'flex',
  },
};

export default function ModalView({ children, afterOpenModal, visible}) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={visible || false}
      onAfterOpen={afterOpenModal && afterOpenModal}
      style={customStyles}
    >
      {children}
    </Modal>
  )
}
