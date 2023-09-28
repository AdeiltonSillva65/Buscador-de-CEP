import {FiSearch} from 'react-icons/fi';
import './style.css';
import {useState} from 'react';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({})

  const handleSearch= async ()=>{
    
    if(input === ''){
      alert('Preencha algum cep!')
      return;
    }

    try {
      const res = await api.get(`${input}/json`);
      setCep(res.data);
      setInput("");
    } catch {
      alert("Ops, erro ao Buscar");
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input} //state input
          onChange={(e)=> setInput(e.target.value)} // pega o valor e manda para useState
        />

        <buttom className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>
        </buttom>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span> Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
       </main>
      )}
      
    </div>
  );
}

export default App;

/*
{
  "cep": "05209-240",
  "logradouro": "Travessa Camélia",
  "complemento": "",
  "bairro": "Recanto dos Humildes",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
*/ 