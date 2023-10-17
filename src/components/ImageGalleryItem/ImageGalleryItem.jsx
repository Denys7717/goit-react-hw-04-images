import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({
  data: { webformatURL, tags, largeImageURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <li className={css.gallery_item}>
        <img src={webformatURL} alt={tags} onClick={toggleModal} />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            toggleModal={toggleModal}
          ></Modal>
        )}
      </li>
    </>
  );
};
