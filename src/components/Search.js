import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Pass the search term to the parent component (AccountContainer)
    onSearch(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch(""); // Clear the search term in the parent component
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={handleInputChange}
        aria-label="Search transactions"
      />
      <i className="circular search link icon"></i>
      {searchTerm && (
        <button
          className="ui icon button"
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          <i className="close icon"></i>
        </button>
      )}
    </div>
  );
}

export default Search;
