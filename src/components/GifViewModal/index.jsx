import './styles.css';
import { Modal } from 'react-bootstrap';

function gifViewModal(props) {
  const { show, handleClose, gifView } = props;
  function handleClick() {
    console.log('dentro do click', gifView);
  }
  return (
    <Modal size="sm" show={show} onHide={handleClose}>
      <Modal.Header closeButton>Visualizar Gif</Modal.Header>
      <Modal.Body className="gifView__modal--body">
        {' '}
        <img
          className="gifView__img--show"
          alt="gif"
          src={
            gifView.images &&
            gifView.images.fixed_height_small &&
            gifView.images.fixed_height_small.url
          }
        />
        <button
          className="gifView__button--save"
          onClick={handleClick}
          type="button"
        >
          Salvar gif
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default gifViewModal;
