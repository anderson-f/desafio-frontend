import './styles.css';
import { Modal, Col, Row, Spinner } from 'react-bootstrap';
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
  const [loading, setLoading] = useState(false);
  const [gifSelected, setGifSelected] = useState(0);
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
  }, [reloadGifs, show]);

  async function handleDelete(gif) {
    setGifSelected(gif.id);
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
  }

  return (
    <>
      {!showEditModal && (
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>Gifs Salvos</Modal.Header>
          <Modal.Body>
            {' '}
            {gifs.length > 0 &&
              gifs.map(gif => (
                <Row key={gif.id} className="gifsSaved_row--container">
                  <Col className="gifsSaved_col--content">
                    {' '}
                    <img
                      className="gifsSaved__img--list"
                      alt="gifs saved"
                      src={gif.url}
                    />
                  </Col>
                  <Col className="gifsSaved_col--button">
                    {loading && gifSelected === gif.id ? (
                      <Spinner
                        style={{
                          height: '35px',
                          width: '35px',
                          marginTop: '10px',
                        }}
                        animation="grow"
                        variant="light"
                      />
                    ) : (
                      <>
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
                      </>
                    )}
                  </Col>
                </Row>
              ))}
          </Modal.Body>
        </Modal>
      )}
      <GifEditModal
        gifView={gifView}
        show={showEditModal}
        handleClose={handleCloseEditModal}
        reloadList={() => {
          setRealodGifs(!reloadGifs);
        }}
      />
    </>
  );
}

export default GifsSavedsModal;
