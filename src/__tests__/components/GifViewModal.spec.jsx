import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import GifViewModal from '../../components/GifViewModal';
import { mockApi } from '../../services/api';

const mockApiClone = new MockAdapter(mockApi);

const gifView = {
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
};

const closeModal = jest.fn();

describe('GifViewModal component', () => {
  it('should be able to show one gif', async () => {
    const { getByAltText, debug } = render(
      <GifViewModal gifView={gifView} show handleClose={closeModal} />,
    );

    const imgElement = getByAltText('gif');
    expect(imgElement).toBeInTheDocument();
  });

  it('should be able to save a gif', async () => {
    const teste = mockApiClone.onPost('gifs').reply(200, {
      name: 'Run Away Climate Change GIF by GIPHY Studios Originals',
    });
    const { getByText, result } = render(
      <GifViewModal gifView={gifView} show handleClose={closeModal} />,
    );

    const buttonElement = getByText('Salvar gif');

    await fireEvent.click(buttonElement);

    // expect(mockApiClone.axiosInstance.post).toHaveBeenCalled();
    await waitFor(() => {
      // expect(result.name).toEqual(
      //   'Run Away Climate Change GIF by GIPHY Studios Originals',
      // );
    });
  });
});
