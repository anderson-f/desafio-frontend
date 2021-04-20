import './styles.css'
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar(){
  return(
    <div className="searchBar__container">
      <div className="searchBar__content--bar">
        <input className="searchBar__input--bar"/>
        <button className="searchBar__button--bar">
          <AiOutlineSearch/>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;