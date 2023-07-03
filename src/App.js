import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=20&inc=name,picture,id,cell&nat=in');
      const data = await response.json();
      setPeople(data.results);
      setFilteredPeople(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
    filterPeople(searchText);
  };

  const filterPeople = (searchText) => {
    const filteredPeople = people.filter((person) => {
      const fullName = `${person.name.first} ${person.name.last}`.toLowerCase();
      return fullName.includes(searchText);
    });
    setFilteredPeople(filteredPeople);
  };

  const handleItemClick = (person) => {
    console.log('Clicked person:', person);
  };

  return (
    <div className="chat--list__wrapper">
      <div className="chat--search">
        <input type="text" placeholder="Search" value={searchText} onChange={handleSearch} />
      </div>
      {isLoading ? (
        <div className="chat--status-text">Loading people</div>
      ) : filteredPeople.length === 0 ? (
        <div className="chat--status-text">No people found</div>
      ) : (
        <ul className="chat--list">
          {filteredPeople.map((person) => (
            <li key={person.id.value} className="chat--item" onClick={() => handleItemClick(person)}>
              <div className="chat--item__left">
                <img src={person.picture.thumbnail} alt="User" />
              </div>
              <div className="chat--item__right">
                <div>{`${person.name.first} ${person.name.last}`}</div>
                <div>{person.cell}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
