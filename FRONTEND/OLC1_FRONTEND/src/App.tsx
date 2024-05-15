import { useState } from 'react'
import './App.css'

function App() {

  const [Data, setData] = useState('')
  const [Response, setResponse] = useState('')

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
    setData(
      e.target.value
    )
    console.log(Data)
  }

  const Readsc =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if (!file) return;
    const filereader = new FileReader();
    filereader.readAsText(file)
    filereader.onload = () => {
      console.log(filereader.result)
      const result = filereader.result;
      if (result === null) return; // Comprobación condicional para null
      setData(result as string); // Aserción de tipo
    }
    filereader.onerror = () => {
      console.log('error :)')
    }
  }

  const handlerAnalizar = (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    if (Data != ''){
      fetch('http://localhost:3000/analizar',{
        method:'POST',
        headers:{
          'Content-Type':'text/plain'
        },
        body:Data
      })
      .then(res => res.text())
      .then(response => {
        setResponse(response)
        console.log(response)
      })
      .catch(error => {
        // Manejar errores
        console.log('Error:', error);
      })
    } else {
      alert('SIN INFORMACION A ANALIZAR :)')
    }
  }
  
 

  return (
    <>
      <nav className='navBar'>
        <h2>
          Proyecto2
        </h2>
        <input  className="fileread" type='file' multiple={false} onChange={Readsc}/>
        <button>
          Resportes
        </button>
      </nav>
      <div className='txts'>
          <textarea className='entradaTxt' value={Data} onChange={handleChange}></textarea>
          <textarea className='salidaTxt'  value={Response} disabled></textarea>
      </div>
      <div className='btnAnalizar'>
        <button onClick={handlerAnalizar}> Analizar :)</button>
      </div>
    </>
  )
}

export default App
