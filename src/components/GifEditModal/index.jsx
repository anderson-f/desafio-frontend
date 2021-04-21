import './styles.css';
import { Spinner, Modal } from 'react-bootstrap';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { mockApi } from '../../services/api';

function gifEditModal(props) {
  const { show, handleClose, gifView } = props;
  const [loading, setLoading] = useState(false);
  async function handleClickEdit() {
    try {
      setLoading(true);
      const data = {
        name: gifView.name,
        url: gifView.url,
      };
      await mockApi.put(`gifs/${gifView.id}`, {}).then(() => {
        toast.success('Gif editado!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose();
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
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>Editar Gif</Modal.Header>
      <Modal.Body className="gifEdit__modal--body">
        {' '}
        <img
          className="gifEdit__img--show"
          alt="gif"
          src={gifView.url}
          key={gifView.id}
        />
        {loading ? (
          <Spinner
            style={{ height: '35px', width: '35px', marginTop: '10px' }}
            animation="grow"
            variant="light"
          />
        ) : (
          <button
            className="gifEdit__button--save"
            onClick={handleClickEdit}
            type="button"
          >
            Salvar
          </button>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default gifEditModal;
