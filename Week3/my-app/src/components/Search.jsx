// const Search = ({ onSearch }) => {
//   return (
//     <input 
//       type="text" 
//       placeholder="이름 검색"
//       onChange={(e) => onSearch(e.target.value)}
//     />
//   )
// };

// export default Search

// Search.jsx

/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from "@emotion/react";

const searchContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem;
`;

const buttonStyle = css`
  width: 5rem;
  padding: 5px;
  background-color: #3b82f6;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const inputStyle = css`
  width: 40rem;
  padding: 0.5rem 1rem;
  border: 1px solid #acc;
  border-radius: 5px;

`;

const Search = ({ search, handleSearchChange, handleSearch }) => {
  return (
    <div css={searchContainerStyle}>
      <input type="text" placeholder="이름 검색" onChange={handleSearchChange} value={search} css={inputStyle} />
      <button css={buttonStyle} onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default Search;