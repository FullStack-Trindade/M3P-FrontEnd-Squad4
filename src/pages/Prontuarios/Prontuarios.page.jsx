import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { ProntuarioService } from "../../services/Prontuarios.service";
import Navbar from '../../components/MenuLateral/Navbar/Navbar';
import './Prontuarios.css'

const Prontuarios = () => {
  const [searchText, setSearchText] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const pacientes = await ProntuarioService.buscarProntuarios(searchText);
        setPacientes(pacientes);
      } catch (error) {
        console.error(error);
        showToast('Falha ao buscar os prontuários');
      }
    };
    fetchPacientes();
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <main>
      <Navbar/>
      <div className="container">   
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-file-earmark-text fs-1 me-2 text-blue align-middle" style={{color:"#5f6ab9"}}></i>
              <h2 className="mb-0 text-blue" style={{color:"#5f6ab9"}}>Listagem de prontuários</h2>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                id="input"
                className="form-control"
                placeholder="Digite o nome do paciente"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

            <button className="btn btn-primary " type="button" id="buscar-paciente" >
                <i className="bi bi-search"></i> Buscar
            </button>
              
            </div>
            

            <div className="row mb-3 mt-4">
              <div className="col-md-3 text-center">
                <h5>Registro</h5>
              </div>
              <div className="col-md-5 text-center">
                <h5>Nome do Paciente</h5>
              </div>
              <div className="col-md-4 text-center">
                <h5>Convênio</h5>
              </div>
            </div>

            {pacientes && pacientes.slice(0, 7).map((prontuario) => (
              <div className="card mb-3" key={prontuario.pac_id}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <p className="card-text">{prontuario.pac_id}</p>
                    </div>
                    <div className="col-md-5">
                      <p className="card-text">{prontuario.pac_nome}</p>
                    </div>
                    <div className="col-md-3">
                      <p className="card-text">{prontuario.pac_convenio}</p>
                    </div>
                    <div className="col-md-1">
                      <Link to={`/prontuarios/${prontuario.pac_id}`}>
                        <button id="pesquisa" className="btn btn-primary">
                          <i className="bi bi-search"></i>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Prontuarios;
