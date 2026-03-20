import { useEffect, useState } from "react";
import api from "./api"; 
import "./App.css"
import { Trash, Edit, UserPlus, Mail, Calendar, User } from 'lucide-react';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    data_nascimento: "",
  });
  const [errors, setErrors] = useState({});
  const [editandoId, setEditandoId] = useState(null); 

  const fetchPessoas = async () => {
    try {
      const res = await api.get("/pessoas");
      setPessoas(res.data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    }
  };


  const prepararEdicao = (pessoa) => {
    setEditandoId(pessoa.id);
    setFormData({
      nome: pessoa.nome,
      email: pessoa.email,
      data_nascimento: pessoa.data_nascimento,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validarCampos = () => {
    let errosTemporarios = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nome.trim()) {
      errosTemporarios.nome = "O nome é obrigatório.";
    } else if (formData.nome.length < 3) {
      errosTemporarios.nome = "O nome deve ter pelo menos 3 caracteres.";
    }

    if (!formData.email) {
      errosTemporarios.email = "O e-mail é obrigatório.";
    } else if (!emailRegex.test(formData.email)) {
      errosTemporarios.email = "Insira um e-mail válido.";
    }

    if (!formData.data_nascimento) {
      errosTemporarios.data_nascimento = "A data é obrigatória.";
    }

    setErrors(errosTemporarios);
    return Object.keys(errosTemporarios).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validarCampos()) {
      try {
        if (editandoId) {
          await api.put(`/pessoa/${editandoId}`, formData);
          setEditandoId(null);
        } else {
          await api.post("/pessoa", formData);
        }
        
        fetchPessoas();
        setFormData({ nome: "", email: "", data_nascimento: "" });
        setErrors({});
        alert("Sucesso!");
      } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao conectar com o servidor.");
      }
    }
  };

  const deletePessoa = async (id) => {
    if (window.confirm("Deseja excluir este registro?")) {
      await api.delete(`/pessoa/${id}`);
      fetchPessoas();
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Gerenciamento de Usuários</h1>
      </header>

      <div className="card-form">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="input-group">
            <label>Nome</label>
            <input 
              className={errors.nome ? "input-error" : ""}
              value={formData.nome} 
              onChange={e => setFormData({...formData, nome: e.target.value})} 
              placeholder="Nome completo"
            />
            {errors.nome && <span className="error-msg">{errors.nome}</span>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input 
              className={errors.email ? "input-error" : ""}
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              placeholder="exemplo@email.com"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Data de Nascimento</label>
            <input 
              type="date"
              className={errors.data_nascimento ? "input-error" : ""}
              value={formData.data_nascimento} 
              onChange={e => setFormData({...formData, data_nascimento: e.target.value})} 
            />
            {errors.data_nascimento && <span className="error-msg">{errors.data_nascimento}</span>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editandoId ? 'Atualizar Dados' : 'Cadastrar Usuário'}
            </button>
            {editandoId && (
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => {setEditandoId(null); setFormData({nome:'', email:'', data_nascimento:''})}}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="lista">
        <h2 className="lista-titulo">Lista de Cadastros ({pessoas.length})</h2>
        {pessoas.length === 0 ? (
          <p className="empty-msg">Nenhum usuário encontrado.</p>
        ) : (
          pessoas.map(p => (
            <div key={p.id} className="pessoa-item">
              <div className="info">
                <h3>{p.nome}</h3>
                <p>
                  <Mail size={14} style={{marginRight: '5px'}}/> {p.email} 
                  <span style={{margin: '0 10px'}}>•</span> 
                  <Calendar size={14} style={{marginRight: '5px'}}/> {p.data_nascimento}
                </p>
              </div>
              <div className="actions">
                <button className="btn-icon btn-edit" onClick={() => prepararEdicao(p)} title="Editar">
                  <Edit size={20} />
                </button>
                <button className="btn-icon btn-delete" onClick={() => deletePessoa(p.id)} title="Excluir">
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;