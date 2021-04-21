import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GifsList from './components/GifsList';
import './global.css';
import { gifApi } from './services/api';

function App() {
  const [gifs, setGifs] = useState([]);
  useEffect(() => {
    const getGif = async () => {
      try {
        await gifApi
          .get('trending', {
            params: {
              api_key: 'zv3V70GM5zv1hLorOLMcWvaRBPhFjkBT',
              limit: 10,
            },
          })
          .then(response => {
            console.log(response.data);
            setGifs(response.data.data);
          });
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    };
    getGif();
  }, []);
  async function handleFieldChange(e) {
    try {
      await gifApi
        .get('search', {
          params: {
            api_key: 'zv3V70GM5zv1hLorOLMcWvaRBPhFjkBT',
            q: e.target.value,
            limit: 10,
          },
        })
        .then(response => {
          setGifs(response.data.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      //
    }
  }
  return (
    <>
      <Header />
      <Container>
        <SearchBar handleFieldChange={handleFieldChange} />
        <GifsList gifsList={gifs} />
      </Container>
    </>
  );
}

export default App;
