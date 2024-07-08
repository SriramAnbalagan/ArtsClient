import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import { InputBase } from '@mui/material'
import './searchBar.scss'

export const ArtsSearchBar = ({
  searchText,
  setSearchText,
  enableClear = false,
  readonly = false,
  setTriggerSearchAPI = null,
}) => {
  const onChangeSearchText = (event) => {
    setSearchText(event.target.value)
    setTriggerSearchAPI !== null && setTriggerSearchAPI(true)
  }
  const onClearText = () => {
    setSearchText('')
    setTriggerSearchAPI !== null && setTriggerSearchAPI(true)
  }
  return (
    <div className="search">
      <InputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        value={searchText && searchText.toString()}
        onChange={(event) => onChangeSearchText(event)}
        readOnly={readonly}
      />
      {enableClear && searchText ? (
        <div className="searchIcon" onClick={() => onClearText()}>
          <ClearIcon />
        </div>
      ) : (
        <div className={readonly ? 'searchIcon disabled' : 'searchIcon'}>
          <SearchOutlinedIcon />
        </div>
      )}
    </div>
  )
}
