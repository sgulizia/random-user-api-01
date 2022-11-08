import React, { useState, useEffect } from 'react';
import Header from './src/components/Header/Header';
import SearchBar from './src/components/SearchBar/SearchBar';
import Card from './src/components/Card/Card';
import styled from 'styled-components';
import * as colors from './src/styles/colors';

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px;
  grid-gap: 10px;
  background-color: ${colors.white};
  color: #444;
  justify-content: center;
  padding-top: 50px;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  padding: 20px;
  top: 0;
  background-color: ${colors.white};
`;

const NoMatchesFound = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 25px;
  border-radius: 5px;
  color: ${colors.white};
  background-color: ${colors.purple};
  width: 400px;

`;

export default function App() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  let results = [...data];

  // get API and edit results query string for number of users back
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://randomuser.me/api?results=10');
      const { results } = await res.json();
      setData(results);
      setOriginalData(results);
    };
    fetchData();
  }, []);

  function onSave(value, index) {
    // replace value in object and row in data to state onClick for Save
    const label = Object.keys(value).toString();
    let entries = data[index];

    if (label === 'first' || label === 'last') {
      let newName = { ...entries['name'], ...value };
      findRow([entries], results, index, newName);
    } else {
      let newRow = { ...entries, ...value };
      findRow([newRow], results, index, null);
    }

    setData(results);
  }

  function findRow(object, results, index, newName) {
    // replace object with new data in state and update component
    return results.map((obj) => {
      if (object.find((n) => n.id.value === obj.id.value)) {
        if (newName && Object.keys(newName)?.length > 0) {
          return (results[index].name = newName);
        }
        return (results[index] = object[0]);
      }
    });
  }

  function onParentSearch(text, clear) {
    const input = text.toLowerCase();
    //filter data for correct index
    filterData(input);
    // update state for search/filter
    updateData(clear);
  }

  // update STATE for searching
  function updateData(clear) {
    // if user clears input box give back all data
    if (clear) {
      return setData(originalData);
    }

    // dont set data without and results
    if (results.length > 0) {
      return results.map((res) => {
        setData(data.slice(res, res + 1));
      });
    }

    // if no results set an empty array with warning message
    return setData([]);
  }

  function filterData(input) {
    // filter all objects for first, last, email, cell
    originalData.filter((d, i) => {
      if (
        d.name.first.toLowerCase() === input ||
        d.name.last.toLowerCase() === input ||
        d.email.toLowerCase().includes(input) ||
        d.cell.includes(Number(input))
      ) {
        results.push(i);
      }
    });
  }

  return (
    <div>
      <HeaderWrapper>
        <Header />
        <SearchBar onParentSearch={onParentSearch} data={data} />
      </HeaderWrapper>
      <div>
        {data.length === 0 ? (
          <NoMatchesFound> Sorry, no matches found</NoMatchesFound>
        ) : (
          <CardsWrapper>
            {data.map((user, i) => (
              <Card key={i} index={i} userInfo={user} onSave={onSave} />
            ))}
          </CardsWrapper>
        )}
      </div>
    </div>
  );
}
