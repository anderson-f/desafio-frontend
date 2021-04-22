import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import GifViewModal from '../../components/GifViewModal';
import { mockApi } from '../../services/api';

const mockApiClone = new MockAdapter(mockApi);

const gifView = {
  id: 1,
  tittle: 'Gif mocked test',
  images: {
    fixed_height_small: {
      url: 'www.example.com',
    },
  },
};

const data = {
  name: 'Gif mocked test',
  url: 'www.example.com',
};
const closeModal = jest.fn();

describe('GifViewModal component', () => {
  it('should be able to show one gif', async () => {
    const { getByAltText } = render(
      <GifViewModal gifView={gifView} show handleClose={closeModal} />,
    );

    const imgElement = getByAltText('gif');
    expect(imgElement).toBeInTheDocument();
  });

  it('should be able to save a gif', async () => {
    mockApiClone.onPost('gifs').reply(200, data);
    const { getByText } = render(
      <GifViewModal gifView={gifView} show handleClose={closeModal} />,
    );

    const buttonElement = getByText('Salvar gif');

    await fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockApiClone.history.post.length).toBe(1);
      expect(mockApiClone.history.post[0].data).toBe(JSON.stringify(data));
      expect(closeModal).toHaveBeenCalled();
      mockApiClone.resetHistory();
    });
  });
});
