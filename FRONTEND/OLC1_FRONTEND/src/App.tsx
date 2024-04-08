import { useState } from 'react'
import './App.css'

function App() {

  const [Data, setData] = useState('')

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
    setData(
      e.target.value
    )
    console.log(Data)
  }

  const handlerAnalizar = () =>{

  }

  return (
    <>
      <nav className='navBar'>
        <h2>
          Proyecto2
        </h2>
        <button>
          Abrir
        </button>
        <button>
          Nuevo
        </button>
        <button>
          Guardar
        </button>
        <button>
          Resportes
        </button>
      </nav>
      <div className='txts'>
          <textarea className='entradaTxt' value={Data} onChange={handleChange}></textarea>
          <textarea className='salidaTxt' disabled></textarea>
      </div>
      <div className='btnAnalizar'>
        <button onClick={handlerAnalizar}> Analizar :)</button>
      </div>
    </>
  )
}

export default App
