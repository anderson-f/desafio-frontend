/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import './styles.css';
import { useState } from 'react';
import GifViewModal from '../GifViewModal';

function GifsList(props) {
  const { gifsList } = props;
  const [showGif, setShowGif] = useState(false);
  const [gifView, setGifView] = useState({});

  function handleCloseGifModal() {
    setShowGif(false);
  }

  function handleOpenGifModal(gif) {
    setShowGif(true);
    setGifView(gif);
  }
  return (
    <div className="gifsList__div--container">
      {gifsList.length > 0 &&
        gifsList.map(gif => (
          <img
            onClick={() => handleOpenGifModal(gif)}
            className="gifsList__img--list"
            alt="gif"
            src={
              gif.images &&
              gif.images.fixed_height_small &&
              gif.images.fixed_height_small.url
            }
            key={gif.id}
          />
        ))}
      <GifViewModal
        gifView={gifView}
        show={showGif}
        handleClose={handleCloseGifModal}
      />
    </div>
  );
}

export default GifsList;
