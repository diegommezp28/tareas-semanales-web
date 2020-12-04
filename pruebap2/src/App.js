import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './MovieList';
import { IntlProvider } from 'react-intl';

function App() {

  const dataInglesURI = 'https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json'
  const dataEspañolURI = 'https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json'

  const [datos, setDatos] = useState([])

  const titulosIngles = {
    id: '#',
    name: 'Name',
    channel: 'Channel',
    description: 'Description',
    million: 'million',
    millions: 'millions'
  }

  const titulosEspañol = {
    id: '#',
    name: 'Nombre',
    channel: 'Canal',
    description: 'Descripción',
    million: 'millón',
    millions: 'millones'
  }


  useEffect(() => {

    async function getData() {
      const ingles = await (await fetch(dataInglesURI)).json();
      const español = await (await fetch(dataEspañolURI)).json()
      mainLang(ingles, español)

    }

    if (!navigator.onLine) {
      if (localStorage.getItem("data") === null) {
        setDatos({
          id: 'Cargando...',
          name: 'Cargando...',
          channel: 'Cargando...',
          seasons: 0,
        })
      } else {
        setDatos(localStorage.getItem("data"));
      }
    } else {
      getData()
    }


  }, [])

  function getBrowserLang() {
    return navigator.language || navigator.userLanguage
  }

  function mainLang(ingles, español) {
    const lang = getBrowserLang();
    if (lang === 'en') {
      setDatos(ingles)
      localStorage.setItem('data', ingles);
    }
    else {
      setDatos(español)
      localStorage.setItem('data', español);
    }
  }

  function getTitulos() {
    const lang = getBrowserLang();
    return lang === 'en' ? titulosIngles : titulosEspañol;
  }


  return (
    <IntlProvider locale={getBrowserLang()} messages={getTitulos()}>
      <div className="App">
        <List datos={[] && datos}></List>
      </div>
    </IntlProvider>
  );
}

export default App;
