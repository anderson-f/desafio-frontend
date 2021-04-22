import './styles.css';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar(props) {
  const { handleFieldChange } = props;
  return (
    <div className="searchBar__container">
      <div className="searchBar__content--bar">
        <input
          onChange={handleFieldChange}
          className="searchBar__input--bar"
          placeholder="Pesquisar"
        />
        <button type="button" className="searchBar__button--bar">
          <AiOutlineSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
