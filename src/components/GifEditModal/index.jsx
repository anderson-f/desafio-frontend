import './styles.css';
import { Spinner, Modal, Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { mockApi } from '../../services/api';

function gifEditModal(props) {
  const { show, handleClose, gifView, reloadList } = props;
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formValue, setFormValue] = useState({});
  useEffect(() => {
    setFormValue({
      name: gifView.name,
      url: gifView.url,
    });
  }, [gifView]);
  async function handleClickEdit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(false);

    if (!form.checkValidity()) {
      setValidated(true);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    try {
      setLoading(true);
      await mockApi.put(`gifs/${gifView.id}`, formValue).then(() => {
        toast.success('Gif editado!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reloadList();
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

  function handleFieldChange(e) {
    e.persist();

    setFormValue(value => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>Editar Gif</Modal.Header>
      <Modal.Body className="gifEdit__modal--body">
        {' '}
        <Row
          style={{ width: '100%', padding: '10px' }}
          className="gifsEdit_row--container"
        >
          <Col className="gifsEdit_col--content">
            {' '}
            <img className="gifsEdit__img--list" alt="gif" src={gifView.url} />
          </Col>

          <Col className="gifsEdit_col--form">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleClickEdit}
              className="gifsEdit_from--container"
            >
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  value={formValue.url}
                  name="url"
                  className="gifsEdit_form--input"
                  placeholder="Url"
                  required
                  onChange={handleFieldChange}
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={formValue.name}
                  name="name"
                  className="gifsEdit_form--input"
                  placeholder="Nome"
                  required
                  onChange={handleFieldChange}
                />
                <Form.Control.Feedback type="invalid">
                  Campo obrigatório
                </Form.Control.Feedback>
              </Form.Group>
              {loading ? (
                <Spinner
                  style={{
                    height: '35px',
                    width: '35px',
                    margin: '10px auto',
                  }}
                  animation="grow"
                  variant="light"
                />
              ) : (
                <button type="submit" className="gifEdit__button--save">
                  Salvar
                </button>
              )}
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default gifEditModal;
