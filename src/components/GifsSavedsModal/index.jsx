import './styles.css'
import { Modal } from 'react-bootstrap'

function GifsSavedsModal (props) {
  const {show, handleClose} = props;
  return(
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        Gifs Salvos
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    </Modal>
  );
}

export default GifsSavedsModal;