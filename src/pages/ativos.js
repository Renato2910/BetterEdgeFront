// pages/ativos.js
import { useState, useEffect } from 'react';

export default function Ativos() {
  const [ativos, setAtivos] = useState([]);

  // Carregar ativos da API
  useEffect(() => {
    fetch('http://127.0.0.1:3000/ativos')
      .then(response => response.json())
      .then(data => setAtivos(data))
      .catch(error => console.error('Erro ao carregar ativos:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Ativos Financeiros</h2>
      <ul className="list-disc">
        {ativos.map((ativo, index) => (
          <li key={index}>
            {ativo.nome}: R$ {ativo.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}
