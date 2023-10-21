import React, { useState } from 'react';

function ObjectCreator() {
  // Define state variables for name, surname, and age
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');

  // Define a function to create an object when the button is clicked
  const createObject = () => {
    const person = {
      name: name,
      surname: surname,
      age: age,
    };
    console.log(person); // You can replace this with any action you want to perform with the object
  };

  return (
    <div>
      <h1>Object Creator</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Surname:</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <button onClick={createObject}>Create Object</button>
    </div>
  );
}

export default ObjectCreator;