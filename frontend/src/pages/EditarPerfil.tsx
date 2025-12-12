import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getMe, atualizarPerfil } from "../components/auth/api";
import type { UsuarioUpdateDTO, Endereco } from "../components/auth/AuthContext.types";

export default function PerfilEditar() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<UsuarioUpdateDTO>({
    senha: "",
    nome: "",
    telefone: "",
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
    } as Endereco,
  });

  useEffect(() => {
    if (!token) return;

    getMe(token)
      .then((data) => {
        setForm({
          nome: data.perfil.nome,
          telefone: data.perfil.telefone || "",
          senha: "",
          endereco: data.perfil.endereco,
        });
      })
      .catch(() => setError("Erro ao carregar perfil"))
      .finally(() => setLoading(false));
  }, [token]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name.startsWith("endereco.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    try {
      setError(null);

      const payload: UsuarioUpdateDTO = {
        nome: form.nome,
        telefone: form.telefone,
        senha: form.senha || undefined,
        endereco: form.endereco,
      };
      console.log("Payload enviado:", payload);
      await atualizarPerfil(payload, token);
      alert("Perfil atualizado com sucesso!");
      window.location.href = "/perfil";
    } catch (err: any) {
      setError(err.message || "Erro ao salvar perfil");
    }
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="container" style={{ padding: 20 }}>
      <h1>Editar Perfil</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}
      >
        <label>Nome:</label>
        <input name="nome" value={form.nome} onChange={handleChange} required />

        <label>Telefone (11 dígitos):</label>
        <input
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          pattern="\d{11}"
          required
        />

        <label>Senha (deixe em branco se não quiser mudar):</label>
        <input name="senha" value={form.senha} onChange={handleChange} type="password" />

        <h3>Endereço</h3>

        <label>CEP:</label>
        <input name="endereco.cep" value={form.endereco.cep} onChange={handleChange} required />

        <label>Logradouro:</label>
        <input
          name="endereco.logradouro"
          value={form.endereco.logradouro}
          onChange={handleChange}
          required
        />

        <label>Número:</label>
        <input
          name="endereco.numero"
          value={form.endereco.numero}
          onChange={handleChange}
          required
        />

        <label>Bairro:</label>
        <input
          name="endereco.bairro"
          value={form.endereco.bairro}
          onChange={handleChange}
          required
        />

        <label>Cidade:</label>
        <input
          name="endereco.cidade"
          value={form.endereco.cidade}
          onChange={handleChange}
          required
        />

        <label>Estado:</label>
        <input
          name="endereco.estado"
          value={form.endereco.estado}
          onChange={handleChange}
          required
        />

        <label>País:</label>
        <input
          name="endereco.pais"
          value={form.endereco.pais}
          onChange={handleChange}
          required
        />

        <button style={{ marginTop: 20 }} type="submit">
          Salvar
        </button>
      </form>
    </div>
  );
}
