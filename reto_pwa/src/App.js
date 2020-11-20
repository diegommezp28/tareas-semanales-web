import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Character from './Character';
import './App.css';

function App() {
  const pkey = 'c5b7669abe786ab9a4e09c1da9ea0eed'
  const ts = '10'
  const hash = '7be54f50f5e4de6cb29b0e5054585f0d'
  const params = `?apikey=${pkey}&ts=${ts}&hash=${hash}`

  const [personajes, setPersonajes] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await (await fetch('https://gateway.marvel.com:443/v1/public/characters' + params)).json()
      console.log('====================================');
      console.log(result.data.results);
      console.log('====================================');

      setPersonajes(result.data.results)
      window.localStorage.setItem('personajes', result.data.results)
    }

    if (!navigator.onLine) {
      if (window.localStorage.getItem('personajes') === null)
        setPersonajes([{
          name: 'Monster ETB',
          thumbnail: {
            path: 'public/logo192',
            extension: 'png'
          },
          description: 'El malvado monstruo de la mala conexión ataca de nuevo. Reconéctate para que los héroes vengan al rescate.'
        }])
      else
        setPersonajes(window.localStorage.getItem('personajes'));
    }
    else {
      fetchData()
    }
  }, [])

  return (
    <div className="App">
      {personajes.map((personaje, index) => {
        return <Character key={index} propPersonaje={personaje}></Character>

      })}

    </div>
  );
}

export default App;
