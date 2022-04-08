import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [ ref, setRef ] = useState();
  const [ showModal, setShowModal ] = useState(false);

  useEffect(() => {
    setRef(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={{ref, showModal, setShowModal}}>
        {children}
      </ModalContext.Provider>
      <div className="modal-ref" ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const { ref } = useContext(ModalContext);
  if (!ref) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    ref 
  );
}
