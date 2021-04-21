import './styles.css';
import { Modal, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { mockApi } from '../../services/api';

function GifsSavedsModal(props) {
  const { show, handleClose } = props;
  const [gifs, setGifs] = useState([]);
  useEffect(() => {
    const getGif = async () => {
      try {
        await mockApi.get('gifs').then(response => {
          setGifs(response.data);
        });
      } catch (error) {
        toast.error('Erro ao listar gifs!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        //
      }
    };
    getGif();
  }, []);
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>Gifs Salvos</Modal.Header>
      <Modal.Body>
        {' '}
        {gifs.length > 0 &&
          gifs.map(gif => (
            <Row>
              <Col>
                {' '}
                <img
                  className="gifsSaved__img--list"
                  alt="gif"
                  src={gif.url}
                  key={gif.id}
                />
              </Col>
              <Col />
            </Row>
          ))}
      </Modal.Body>
    </Modal>
  );
}

export default GifsSavedsModal;
