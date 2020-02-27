import React, { useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import { searchByTitle } from 'services/search';

const Home: React.FC = props => {
  const [input, setInput] = useState('frozen');
  const [totalResultCount, setTotalResultCount] = useState(0);
  const [searchResult, setSearchResult] = useState<any>({
    Search: []
  });

  const onChangeInput:React.ChangeEventHandler<HTMLInputElement> = e => {
    setInput(e.target.value);
  }

  const onClick = React.useCallback(
    async e => {
      // e.preventDefault();

      const res = await searchByTitle(input);
      console.log(res.data);
      if (res.data.Response === 'True') {
        setTotalResultCount(res.data.totalResults);
      } else {
        if (res.data.Error === 'Movie not found!') {
          // not found
        }
      }
      
      setSearchResult(res.data);
    },
    [input],
  );

  return (
    <>
      <Helmet>
        <title>asdf</title>
      </Helmet>
      
      {/* input */}
      <input value={input} onChange={onChangeInput}></input>
      { input }
      <button onClick={onClick}>search</button>
      { totalResultCount } 개
      <table>
      { searchResult.Search !== undefined ? 
        searchResult.Search.map((value: any) => {
        return <tr>
          <td>{value.Title}</td>
          <td>{value.Year}</td>
          <td>{value.imdbID}</td>
          <td><img src={value.Poster} width="100px"/></td>
          <td>{value.Title}</td>
          </tr>
      }) : (
        <td>no data</td>
      )}
      </table>
    </>
  );
};

export default Home;
