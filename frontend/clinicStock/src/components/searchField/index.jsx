import './style.css'

function SearchField({setSearchTerm}) {

    return (

        <div class="search-field">
            <span className="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
            <input
                className="field"
                type="text"
                placeholder="Pesquisar"
                maxLength={40}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
    )
}
  export default SearchField;