/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import './styles.css';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import GifViewModal from '../GifViewModal';

function GifsList(props) {
  const { gifsList, loadMore } = props;
  const [showGifModal, setShowGifModal] = useState(false);
  const [gifView, setGifView] = useState({});
  // ={!(gifsList.length > 50)}

  function handleCloseGifModal() {
    setShowGifModal(false);
  }

  function handleOpenGifModal(gif) {
    setShowGifModal(true);
    setGifView(gif);
  }
  return (
    <div className="gifsList__div--container" data-testid="list-container">
      <InfiniteScroll
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          color: '#fff',
        }}
        dataLength={gifsList.length} // This is important field to render the next data
        next={loadMore}
        hasMore={!(gifsList.length > 4999)}
        loader={
          <h4>
            <Spinner animation="grow" variant="light" />
          </h4>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
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
      </InfiniteScroll>
      <GifViewModal
        gifView={gifView}
        show={showGifModal}
        handleClose={handleCloseGifModal}
      />
    </div>
  );
}

export default GifsList;
