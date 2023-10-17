import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, toggleModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyEsc);
    return () => {
      window.removeEventListener('keydown', handleKeyEsc);
    };
  }, []);

  const handleKeyEsc = event => {
    if (event.code === 'Escape') this.props.toggleModal();
  };

  const closeBackDrop = event => {
    if (event.currentTarget === event.target) toggleModal();
  };

  return createPortal(
    <div className={css.overlay} onClick={closeBackDrop}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
