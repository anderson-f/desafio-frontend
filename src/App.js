import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GifsList from './components/GifsList';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { gifApi } from './services/api';

function App() {
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [offsetSearch, setOffsetSearch] = useState(0);
  const [gifsSearch, setGifsSearch] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    const getGif = async () => {
      try {
        await gifApi
          .get('trending', {
            params: {
              api_key: 'zv3V70GM5zv1hLorOLMcWvaRBPhFjkBT',
              limit: 9,
              offset,
            },
          })
          .then(response => {
            if (gifs.length > 0) {
              setGifs([...gifs, ...response.data.data]);
            } else {
              setGifs(response.data.data);
            }
          });
      } catch (error) {
        toast.error('Erro listar!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        //
      }
    };
    getGif();
  }, [offset]);

  useEffect(() => {
    const getGifSearch = async () => {
      try {
        await gifApi
          .get('search', {
            params: {
              api_key: 'zv3V70GM5zv1hLorOLMcWvaRBPhFjkBT',
              q: searchValue,
              limit: 9,
              offset: offsetSearch,
            },
          })
          .then(response => {
            if (offsetSearch > 0) {
              setGifsSearch([...gifsSearch, ...response.data.data]);
            } else {
              setGifsSearch(response.data.data);
            }
          });
      } catch (error) {
        toast.error('Erro na busca!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        //
      }
    };
    getGifSearch();
  }, [searchValue, offsetSearch]);

  async function handleFieldChange(e) {
    setGifsSearch([]);
    setOffsetSearch(0);
    setSearchValue(e.target.value);
  }
  return (
    <>
      <ToastContainer />
      <Header />
      <Container>
        <SearchBar handleFieldChange={handleFieldChange} />
        <GifsList
          gifsList={gifsSearch.length > 0 ? gifsSearch : gifs}
          loadMore={() =>
            gifsSearch.length > 0
              ? setOffsetSearch(offsetSearch + 10)
              : setOffset(offset + 10)
          }
        />
      </Container>
    </>
  );
}

export default App;
