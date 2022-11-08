import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '../../styles/colors';
import PropTypes from 'prop-types';

const SearchWrapper = styled.div`
margin-top:20px;
text-align: center;

.search-input {
  width: 300px;
  height: 25px;
}
`;

const SearchButton = styled.button`
margin-left: 10px;
color: ${colors.white};
background: ${colors.purple};
border-radius: 5px;
width: 90px;
height: 25px;
font-size: 14px;
font-weight: bold;
`;

function SearchBar(props) {
  const [searchText, setSearchText] = useState('');
  const [backspaceClick, setBackspaceClick] = useState(false);

  function onKeyDown(e) {
    if (e.code === 'Backspace') {
      console.log('back');
      setBackspaceClick(true);
      props.onParentSearch(searchText);
    }
  }

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      props.onParentSearch(searchText);
    }
  }

  function onInputChange(e) {
    console.log(e.target.value);
    console.log(backspaceClick);
    if (backspaceClick && e.target.value !== searchText) {
      setBackspaceClick(false);
      props.onParentSearch(e.target.value, 'clear');
    }

    setSearchText(e.target.value);
  }

  return (
    <SearchWrapper>
      <input
        className="search-input"
        type="text"
        placeholder="Search here"
        onChange={(e) => onInputChange(e)}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
      />
      <SearchButton
        type="button"
        onClick={() => props.onParentSearch(searchText)}
      >
        Search
      </SearchButton>
    </SearchWrapper>
  );
}

export default SearchBar;

SearchBar.defaultProps = {
  data: [],
  onSearch: () => {},
};

SearchBar.propTypes = {
  data: PropTypes.array.isRequired,
  onParentSearch: PropTypes.func.isRequired,
};
