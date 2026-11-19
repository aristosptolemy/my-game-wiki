import styles from './CostomInput.module.css'
import SearchIcon from "@mui/icons-material/Search";


interface CostomInput {
  Search: string;
  setSearch: (word: string) => void;
  Placeholder: string;
}

export default function CostomInput({
  Search,
  setSearch,
  Placeholder
}: CostomInput) {

  return (
    <div className={styles.searchBox}>
      <SearchIcon className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        type="search"
        placeholder={Placeholder}
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}