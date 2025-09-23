"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function createRoom() {
    setLoading(true);
    try {
      const res = await fetch("/api/room/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: generateCode() }),
      });

      if (!res.ok) throw new Error("Erro ao criar sala");

      const room = await res.json();
      console.log("Sala criada:", room);

      // redireciona para a página da sala
      window.location.href = `/room/${room.code}`;
    } catch (err) {
      console.error(err);
      alert("Erro ao criar sala");
    } finally {
      setLoading(false);
    }
  }

  async function joinRoom() {
    if (!code) return alert("Digite o código da sala!");

    // ainda vamos implementar /api/room/join
    window.location.href = `/room/${code}`;
  }

  function generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">🏙️ Império Urbano</h1>

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <button
          onClick={createRoom}
          disabled={loading}
          className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition mb-4"
        >
          {loading ? "Criando..." : "Criar novo jogo"}
        </button>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Código da sala"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-3 rounded-xl text-black"
          />
          <button
            onClick={joinRoom}
            className="py-3 px-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition"
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}
