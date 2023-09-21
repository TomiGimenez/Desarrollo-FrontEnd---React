
import './App.css';
import React from 'react';

//Componentes de las paginas
import Encuestas from './components/Encuestas';

function App() {

  //Estado para rastrear las encuestas
  const encuestas = [
    { id: 1, pregunta: '¿Cuál es tu color favorito?', opciones: ['Rojo', 'Azul', 'Verde'] },
    { id: 2, pregunta: '¿Cuál es tu comida favorita?', opciones: ['Pizza', 'Hamburguesa', 'Sushi'] },
  ];


  return (
    <div className="App">
      <h1>Aplicación de Encuestas</h1>

      {/* Contenido de las paginas */}
      <Encuestas encuestas={encuestas} />

    </div>
  );
}

export default App;
