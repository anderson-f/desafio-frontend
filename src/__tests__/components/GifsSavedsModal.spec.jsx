import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import GifsSavedModal from '../../components/GifsSavedsModal';
import { mockApi } from '../../services/api';

const mockApiClone = new MockAdapter(mockApi);

const gifsList = [
  {
    id: 1,
    name: 'Gif mocked test',
    url: 'www.example.com',
  },
  {
    id: 2,
    name: 'Gif mocked test2',
    url: 'www.example.com2',
  },
];

const closeModal = jest.fn();

describe('GifsListSaved component', () => {
  it('should be able to list gifs saved', async () => {
    mockApiClone.onGet('gifs').reply(200, gifsList);
    const { getAllByAltText } = render(
      <GifsSavedModal show handleClose={closeModal} />,
    );

    await waitFor(() => {
      const imgElement = getAllByAltText('gifs saved');
      expect(imgElement).toHaveLength(gifsList.length);
      mockApiClone.resetHistory();
    });
  });
});
