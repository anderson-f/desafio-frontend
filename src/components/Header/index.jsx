/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './styles.css';
import { useState } from 'react';
import GifsSavedsModal from '../GifsSavedsModal';

function Header() {
  const [showGifsSaveds, setShowGifsSaveds] = useState(false);

  function handleCloseGifsModal() {
    setShowGifsSaveds(false);
  }

  function handleOpenGifsModal() {
    setShowGifsSaveds(true);
  }

  return (
    <header className="header__container">
      <div className="header__content--main">
        <span className="header__span--menu">Home</span>
        <span className="header__span--menu" onClick={handleOpenGifsModal}>
          Gifs Salvos
        </span>
      </div>
      <GifsSavedsModal
        show={showGifsSaveds}
        handleClose={handleCloseGifsModal}
      />
    </header>
  );
}

export default Header;
