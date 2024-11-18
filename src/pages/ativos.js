import React, { useEffect, useState } from "react";

const Ativos = () => {
  const [ativos, setAtivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAtivo, setSelectedAtivo] = useState(null);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchAtivos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/ativos");
      const data = await response.json();
      setAtivos(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar ativos:", error);
      setLoading(false);
    }
  };

  const fetchCliente = async (clienteId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/clientes/${clienteId}`
      );
      const data = await response.json();
      setSelectedCliente(data);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
    }
  };

  useEffect(() => {
    fetchAtivos();
  }, []);

  const handleAtivoClick = (ativo) => {
    setSelectedAtivo(ativo);
    fetchCliente(ativo.clienteId); 
    setShowDetails(true); 
  };

  const handleCloseDetails = () => {
    setShowDetails(false); 
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 rounded-md mb-4">
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white hover:text-gray-300">
              Clientes
            </a>
          </li>
          <li>
            <a href="/ativos" className="text-white hover:text-gray-300">
              Ativos
            </a>
          </li>
        </ul>
      </nav>

      <h1 className="text-3xl font-bold text-slate-50 mb-4 text-center">
        Lista de Ativos Financeiros
      </h1>

      {loading ? (
        <p>Carregando ativos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ativos.map((ativo) => (
            <div
              key={ativo.id}
              className="bg-white shadow-md rounded-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => handleAtivoClick(ativo)}
            >
              <h2 className="text-xl font-semibold text-slate-950">
                {ativo.nome}
              </h2>
              <p className="text-slate-950">
                Valor Atual: R${" "}
                {ativo.valorAtual ? ativo.valorAtual.toFixed(2) : "N/A"}
              </p>
              <p className="text-slate-950">
                Cliente ID: {ativo.clienteId || "Desconhecido"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalhes do Ativo e Cliente */}
      {showDetails && selectedAtivo && selectedCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-80 max-w-md">
            <h2 className="text-2xl font-semibold text-slate-950 mb-4">
              Detalhes do Ativo
            </h2>
            <p className="text-slate-950">
              <strong>Cliente:</strong> {selectedCliente.nome}
            </p>
            <p className="text-slate-950">
              <strong>Email do Cliente:</strong> {selectedCliente.email}
            </p>
            <p className="text-slate-950">
              <strong>Status do Cliente:</strong> {selectedCliente.status}
            </p>
            <button
              onClick={handleCloseDetails}
              className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ativos;
