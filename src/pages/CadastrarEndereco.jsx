import React, { useState } from 'react';

function CadastrarEndereco() {
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const handleSaveAddress = () => {
    // Aqui você pode implementar a lógica para salvar o endereço
    console.log('Endereço salvo:', { endereco, numero, cidade, estado, cep });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Cadastrar Novo Endereço</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
      </div>
      <button
        onClick={handleSaveAddress}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Salvar Endereço
      </button>
    </div>
  );
}

export default CadastrarEndereco;

