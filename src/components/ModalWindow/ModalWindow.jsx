import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import style from './ModalWindow.module.css';

export const ModalWindow = ({ content, modalConfirmAction, closeModal }) => {
  const handleModalConfirm = () => {
    closeModal();
    modalConfirmAction();
  };

  return ReactDOM.createPortal(
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <div className={style.modalBody}>
          <div className={style.modalContentWrapper}>
            <div className={style.modalContent}>{content}</div>
            <div className={style.modalBtnsGroup}>
              <button className={style.modalBtn} onClick={handleModalConfirm}>
                Подтвердить
              </button>
              <button
                className={style.modalBtn}
                onClick={() => closeModal()}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') // замените 'modal-root' на ID вашего контейнера портала
  );
};

ModalWindow.propTypes = {
  content: PropTypes.node,
  modalConfirmAction: PropTypes.func,
  closeModal: PropTypes.func,
};
