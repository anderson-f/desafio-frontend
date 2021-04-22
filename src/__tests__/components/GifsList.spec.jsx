import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GifsList from '../../components/GifsList';

const gifsList = [
  {
    id: 1,
    title: 'Run Away Climate Change GIF by GIPHY Studios Originals',
    images: {
      fixed_height_small: {
        height: '100',
        width: '100',
        size: '32072',
        url:
          'https://media4.giphy.com/media/l0HlMURBbyUqF0XQI/100.gif?cid=ccd30818n7zdsu2qjdwn7p4zgiwb4xpyrv2ncv3rx9iq1zrx&rid=100.gif&ct=g',
        mp4_size: '13568',
        mp4:
          'https://media4.giphy.com/media/l0HlMURBbyUqF0XQI/100.mp4?cid=ccd30818n7zdsu2qjdwn7p4zgiwb4xpyrv2ncv3rx9iq1zrx&rid=100.mp4&ct=g',
        webp_size: '19604',
        webp:
          'https://media4.giphy.com/media/l0HlMURBbyUqF0XQI/100.webp?cid=ccd30818n7zdsu2qjdwn7p4zgiwb4xpyrv2ncv3rx9iq1zrx&rid=100.webp&ct=g',
      },
    },
  },
  {
    id: 2,
    title: 'Run Away Climate Change GIF by GIPHY Studios Originals',
    images: {
      fixed_height_small: {
        height: '100',
        width: '100',
        size: '32072',
        url:
          'https://media4.giphy.com/media/l0HlMURBbyUqF0XQI/100.gif?cid=ccd30818n7zdsu2qjdwn7p4zgiwb4xpyrv2ncv3rx9iq1zrx&rid=100.gif&ct=g',
        mp4_size: '13568',
        mp4:
          'https://media4.giphy.com/media/l0HlMURBbyUqF0XQI/100.mp4?cid=ccd30818n7zdsu2qjdwn7p4zgiwb4xpyrv2ncv3rx9iq1zrx&rid=100.mp4&ct=g',
        webp_size: '19604',
        webp:
          'https://media4.giphy.com/media/l0HlMURBbyUqF0XQI/100.webp?cid=ccd30818n7zdsu2qjdwn7p4zgiwb4xpyrv2ncv3rx9iq1zrx&rid=100.webp&ct=g',
      },
    },
  },
];

const callNext = jest.fn();

describe('GifsList component', () => {
  it('should be able to list gifs', async () => {
    const { getAllByAltText, debug } = render(
      <GifsList gifsList={gifsList} loadMore={() => callNext()} />,
    );

    const imgElement = getAllByAltText('gif');
    expect(imgElement).toHaveLength(gifsList.length);
    // debug();
  });

  it('should be able to list more gifs', async () => {
    render(<GifsList gifsList={gifsList} loadMore={() => callNext()} />);

    await fireEvent.scroll(window, { target: { scrollY: 101 } });

    expect(callNext).toHaveBeenCalled();
  });

  // it('should be able to open modal GifViewModal', async () => {
  //   const { getAllByAltText } = render(
  //     <GifsList gifsList={gifsList} loadMore={() => callNext()} />,
  //   );

  //   await fireEvent.click();

  //   expect(callNext).toHaveBeenCalled();
  // });
});
