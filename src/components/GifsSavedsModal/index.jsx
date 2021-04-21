import './styles.css';
import { Modal, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { mockApi } from '../../services/api';
import GifEditModal from '../GifEditModal';

function GifsSavedsModal(props) {
  const { show, handleClose } = props;
  const [gifs, setGifs] = useState([]);
  const [reloadGifs, setRealodGifs] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [gifView, setGifView] = useState({});
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
  }, [reloadGifs]);
  const [loading, setLoading] = useState(false);

  async function handleDelete(gif) {
    try {
      setLoading(true);
      await mockApi.delete(`gifs/${gif.id}`).then(() => {
        toast.success('Gif deletado!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRealodGifs(!reloadGifs);
      });
    } catch (error) {
      toast.error('Erro ao deletar!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
  }

  function handleOpenEditModal(gif) {
    setShowEditModal(true);
    setGifView(gif);
    try {
      setLoading(true);
      setRealodGifs(!reloadGifs);
      console.log('editar', gif);
    } catch (error) {
      toast.error('Erro ao editar!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>Gifs Salvos</Modal.Header>
      <Modal.Body>
        {' '}
        {gifs.length > 0 &&
          gifs.map(gif => (
            <Row className="gifsSaved_row--container">
              <Col className="gifsSaved_col--content">
                {' '}
                <img
                  className="gifsSaved__img--list"
                  alt="gif"
                  src={gif.url}
                  key={gif.id}
                />
              </Col>
              <Col className="gifsSaved_col--button">
                <button
                  type="button"
                  className="gifsSaved__button gifsSaved__button--edit"
                  onClick={() => handleOpenEditModal(gif)}
                >
                  Editar <AiOutlineEdit />
                </button>
                <button
                  type="button"
                  className="gifsSaved__button gifsSaved__button--delete"
                  onClick={() => handleDelete(gif)}
                >
                  Deletar <AiOutlineDelete />
                </button>
              </Col>
            </Row>
          ))}
      </Modal.Body>
      <GifEditModal
        gifView={gifView}
        show={showEditModal}
        handleClose={handleCloseEditModal}
      />
    </Modal>
  );
}

export default GifsSavedsModal;
