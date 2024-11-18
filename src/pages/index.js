import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("ativo");
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await fetch("http://127.0.0.1:3000/clientes");
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    }
    fetchClientes();
  }, []);

  const handleAdicionarCliente = async (e) => {
    e.preventDefault();
    try {
      const novoCliente = { nome, email, status };
      const response = await fetch("http://127.0.0.1:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente),
      });

      const data = await response.json();
      setClientes([...clientes, data]);
      setNome("");
      setEmail("");
      setStatus("ativo");
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const handleEditarCliente = (cliente) => {
    setClienteEditando(cliente);
    setNome(cliente.nome);
    setEmail(cliente.email);
    setStatus(cliente.status);
  };

  const handleAtualizarCliente = async (e) => {
    e.preventDefault();
    try {
      const clienteAtualizado = { nome, email, status };
      const response = await fetch(
        `http://127.0.0.1:3000/clientes/${clienteEditando.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clienteAtualizado),
        }
      );

      const data = await response.json();
      setClientes(
        clientes.map((cliente) =>
          cliente.id === clienteEditando.id ? data : cliente
        )
      );
      setNome("");
      setEmail("");
      setStatus("ativo");
      setClienteEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  const handleDeletarCliente = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/clientes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setClientes(clientes.filter((cliente) => cliente.id !== id));
      } else {
        console.error("Erro ao deletar cliente");
      }
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Navbar */}
      <nav
        className="bg-gray-800 p-4 rounded-md mb-4"
        aria-label="Navegação principal"
      >
        <ul className="flex space-x-4" role="menubar">
          <li role="none">
            <Link
              href="/"
              className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              role="menuitem"
            >
              Clientes
            </Link>
          </li>
          <li role="none">
            <Link
              href="/ativos"
              className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              role="menuitem"
            >
              Ativos
            </Link>
          </li>
        </ul>
      </nav>

      {/* Título da Página */}
      <header className="text-center mb-4" aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold text-slate-50">
          Clientes
        </h1>
      </header>

      {/* Layout principal */}
      <div className="flex justify-center items-start min-h-screen">
        {/* Coluna para listar os clientes */}
        <section className="w-full md:w-2/3 p-4 overflow-y-auto max-h-[500px]">
          <h2 className="text-2xl font-bold mb-2 text-slate-50">Clientes</h2>
          <ul className="space-y-4">
            {clientes.map((cliente) => (
              <li
                key={cliente.id}
                className="border p-4 rounded-md bg-gray-100 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-yellow-400"
                tabIndex="0"
                role="listitem"
                onClick={() => handleEditarCliente(cliente)}
              >
                <p className="text-gray-700">
                  <strong>Nome:</strong> {cliente.nome}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {cliente.email}
                </p>
                <p
                  className="text-gray-700"
                  style={{
                    color: cliente.status === "ativo" ? "green" : "red",
                  }}
                >
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      cliente.status === "ativo"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {cliente.status === "ativo" ? "Ativo" : "Inativo"}
                  </span>
                </p>

                {/* Botão para deletar cliente */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDeletarCliente(cliente.id);
                  }}
                  className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Deletar Cliente
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Formulário para CRUD de clientes */}
        <section className="w-full md:w-1/3 p-4 bg-gray-100 rounded-md mx-4">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {clienteEditando ? "Editar Cliente" : "Adicionar Cliente"}
          </h2>
          <form
            onSubmit={
              clienteEditando ? handleAtualizarCliente : handleAdicionarCliente
            }
          >
            <div className="mb-4">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-800"
              >
                Nome:
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nome do Cliente"
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email do Cliente"
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-800"
              >
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {clienteEditando ? "Atualizar Cliente" : "Adicionar Cliente"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
