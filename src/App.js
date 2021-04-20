import { Container } from 'react-bootstrap'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import './global.css'
function App() {
  return (
    <>
      <Header/>
      <Container>
        <SearchBar/>
      </Container>
    </>
  );
}

export default App;
