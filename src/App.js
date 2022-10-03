import React, { useState } from 'react'
import './App.css'
import Header from './components/header/header.js'
import { getUrlImg, setPets, uploadImage } from './resources/db.js';


const App = () => {
  const [nome, setnome] = useState('');
  const [idade, setidade] = useState('');
  const [raca, setraca] = useState('');
  const [genero, setgenero] = useState('');
  const [castragem, setcastragem] = useState('');
  const [foto, setfoto] = useState('');
  const [porte, setporte] = useState('');
  const [pelagem, setpelagem] = useState('');
  const [ong, setong] = useState('');
  const [tipo, settipo] = useState('');

  const uploadPhoto = async (nome, file) => {
    let finalId = `pet_${nome}`
    if (file) {
      await uploadImage(finalId, file)
    }
  }

  const validateCadastro = async () => {
    let ongObj = [];
    let finalDoc = {fila: 0};
    let photoUrl = '';
    await uploadPhoto(nome, foto);
    await getUrlImg(`pet_${nome}`).then(url => {photoUrl = url});

    switch (ong) {
      case 1:
        ongObj = ["Faros d'Ajuda", "Estr. Mun. Braganca-Socorro, 770", "11988776655", "https://farosdajuda.com.br/", "https://farosdajuda.com.br/wp-content/uploads/2021/07/logo-faros.png"]
        break;
      default:
        ongObj = ["Faros d'Ajuda", "Estr. Mun. Braganca-Socorro, 770", "11988776655", "https://farosdajuda.com.br/", "https://farosdajuda.com.br/wp-content/uploads/2021/07/logo-faros.png"]
        break;
    }
    
    finalDoc.nome = nome;
    finalDoc.idade = idade;
    finalDoc.castragem = castragem;
    finalDoc.genero = genero;
    finalDoc.img = photoUrl;
    finalDoc.porte = porte;
    finalDoc.pelagem = pelagem;
    finalDoc.raca = raca;
    finalDoc.tipo = tipo;
    finalDoc.ong = ongObj;

    await setPets(finalDoc).then(res => console.log('pet cadastrado'))
  }

  return (
    <div className='background-grey'>
      <Header />
      <div className="container">
        <select onChange={(e) => setong(e.target.selectedIndex)}>
          <option selected="true" disabled="disabled">Selecione a ONG parceira</option>
          <option>Faros d'Ajuda</option>
        </select>
        <div className='div-castragem'>
          <p>É castrado(a)?</p>
          <input type="radio" name="castragem" onChange={() => setcastragem('sim')}/>Sim
          <input type="radio" name="castragem" onChange={() => setcastragem('não')}/>Não
        </div>
        <div className='div-castragem'>
          <p>Selecione o Gênero:</p>
          <input type="radio" name="genero" onChange={(e) => setgenero('Masculino')}/>Masculino
          <input type="radio" name="genero" onChange={(e) => setgenero('Feminino')}/>Feminino
        </div>
        <div className='div-castragem'>
          <p>Insira o nome:</p>
          <input type="text" onChange={(e) => setnome(e.target.value)}/>
        </div>
        <div className='div-castragem'>
          <p>Insira a idade (em anos):</p>
          <input type="number" onChange={(e) => setidade(e.target.value)}/>
        </div>
        <div>
          <select onChange={(e) => setpelagem(e.target.value)}>
            <option selected="true" disabled="disabled">Selecione o tamanho da pelagem:</option>
            <option>Curto</option>
            <option>Média</option>
            <option>Grande</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => setporte(e.target.value)}>
            <option selected="true" disabled="disabled">Selecione o porte:</option>
            <option>Curto</option>
            <option>Médio</option>
            <option>Grande</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => settipo(e.target.value)}>
            <option selected="true" disabled="disabled">Selecione o tipo de animal:</option>
            <option>Cão</option>
            <option>Gato</option>
          </select>
        </div>
        <div className='div-castragem'>
          <p>Insira a raça:</p>
          <input type="text" onChange={(e) => setraca(e.target.value)}/>
        </div>
        <div>
          <label className='labelPhoto'>Foto de perfil:</label>
          <input type="file" onChange={(e) => {
            setfoto(e.target.files[0]);
          }} />
        </div>
        <button className='btn' onClick={() => validateCadastro()}>Cadastrar Pet</button>
      </div>
    </div>
  )
}

export default App
