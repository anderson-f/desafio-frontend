import './styles.css';
import { Spinner, Modal } from 'react-bootstrap';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { mockApi } from '../../services/api';

function gifViewModal(props) {
  const { show, handleClose, gifView } = props;
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    try {
      setLoading(true);
      const data = {
        name: gifView.tittle,
        url: gifView.images.fixed_height_small.url,
      };
      await mockApi.post('gifs', data).then(response => {
        toast.success('Gif salvo!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose();
        return response.data;
      });
    } catch (error) {
      toast.error('Erro ao salvar!', {
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
        {loading ? (
          <Spinner
            style={{ height: '35px', width: '35px', marginTop: '10px' }}
            animation="grow"
            variant="light"
          />
        ) : (
          <button
            className="gifView__button--save"
            onClick={handleClick}
            type="button"
          >
            Salvar gif
          </button>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default gifViewModal;
