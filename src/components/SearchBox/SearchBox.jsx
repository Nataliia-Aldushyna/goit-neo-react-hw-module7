import { useSelector, useDispatch } from 'react-redux'; 
import { changeFilter } from '../../redux/filtersSlice'; 
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const filter = useSelector(state => state.filters.name); 
  const dispatch = useDispatch(); 

  const handleFilterChange = (event) => {
    dispatch(changeFilter(event.target.value)); 
  };

  return (
    <div className={styles.searchBox}>
      <label htmlFor="search" className={styles.label}>
        Find contacts by name
      </label>
      <input
        id="search"
        type="text"
        value={filter}
        onChange={handleFilterChange} 
        placeholder="Enter name"
        className={styles.input}
      />
    </div>
  );
};

export default SearchBox;
