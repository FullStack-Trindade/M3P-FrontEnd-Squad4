import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { Link } from 'react-router-dom';
import { PacienteService } from '../../services/Paciente.service';
import { ExameService } from '../../services/Exames.service';
import { ConsultaService } from '../../services/Consultas.service';
import { formatStringToDate } from "../../utils/DateUtils";
import { DietaService } from '../../services/Dieta.service';
import { ExercicioService } from '../../services/Exercicio.service';
import { MedicamentoService } from '../../services/Medicamentos.service';
import Navbar from '../../components/MenuLateral/Navbar/Navbar';

const DetalhaProntuario = () => {
    const { idPaciente } = useParams();
    const [pacienteData, setPacienteData] = useState({});
    const [consultas, setConsultas] = useState([]);
    const [exames, setExames] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [dietas, setDietas] = useState(null);
    const [exercicios, setExercicios] = useState(null);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchPacienteData = async () => {
            try {
                const paciente = await PacienteService.detalharPaciente(idPaciente);
                setPacienteData(paciente);
                fetchDietas(paciente);
                fetchExercicios(paciente);
                fetchMedicamentos(paciente);
                fetchMedicamentos(paciente);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar os dados do paciente');
            }
        };

        const fetchConsultas = async () => {
            try {
                const consultas = await ConsultaService.listarConsultasPorPaciente(idPaciente)
                setConsultas(consultas);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar as consultas, backend está implementado?');
            }
        };

        const fetchExames = async () => {
            try {
                const exames = await ExameService.listarExamesPorPaciente(idPaciente)
                setExames(exames);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar os exames');
            }
        };

        const fetchDietas = async (paciente) => {
            try {
                const dietas = await DietaService.buscarDietasPorPaciente(paciente.pac_nome)
                setDietas(dietas);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar as dietas');
            }
        };

        const fetchExercicios = async (paciente) => {
            try {
                const exercicios = await ExercicioService.buscarExerciciosPorPaciente(paciente.pac_nome)
                setExercicios(exercicios);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar os exercicios');
            }
        };

        const fetchMedicamentos = async (paciente) => {
            try {
                const medicamentos = await MedicamentoService.listarMedicamentosPorPaciente(idPaciente)
                setMedicamentos(medicamentos);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar os medicamentos');
            }
        };

        fetchPacienteData();
        fetchConsultas();
        fetchExames();
        fetchMedicamentos();
    }, [idPaciente]);

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex align-items-center mb-4">
                            <i className="bi bi-file-earmark-text fs-1 me-2 text-blue align-middle"></i>
                            <h2 className="mb-0 text-blue">Prontuário Médico</h2>
                        </div>

                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title mb-4 mt-1">Dados do Paciente</h5>
                                <p className="card-text">
                                    <strong>Nome Completo:</strong> {pacienteData.pac_nome}
                                </p>
                                <p className="card-text">
                                    <strong>Convênio:</strong> {pacienteData.pac_convenio}
                                </p>
                                <p className="card-text">
                                    <strong>Alergias:</strong> {pacienteData.pac_alergias || 'Nenhuma alergia registrada'}
                                </p>
                                <p className="card-text">
                                    <strong>Contato de Emergência:</strong> {pacienteData.pac_contato_emergencia || 'Nenhum contato de emergência especificado'}
                                </p>
                                <p className="card-text">
                                    <strong>Cuidados específicos:</strong> {pacienteData.pac_cuidados_especiais || 'Nenhum cuidado específico registrado'}
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <a data-bs-toggle="collapse" href="#consultasCollapse" role="button" aria-expanded="false" aria-controls="consultasCollapse">
                                    <h5 className="card-title" style={{color: 'black'}}>Consultas</h5>
                                </a>
                                <Link to={`/pacientes/${idPaciente}/consultas`}>
                                    <button type="button" className="btn btn-info">
                                        <i className="bi bi-hospital"></i> Cadastrar
                                    </button>
                                </Link>
                            </div>
                            {consultas.length > 0 ? (
                                <ul className="list-group p-3 collapse show" id="consultasCollapse">
                                    {consultas.slice(0, 5).map((consulta) => (
                                        <li key={consulta.con_id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <span className="fw-bold">Data:</span> {formatStringToDate(consulta.con_data)}
                                                <span className="fw-bold">- Horário:</span> {consulta.con_hora}
                                                <span className="fw-bold">- Motivo:</span> {consulta.con_motivo}
                                            </span>
                                            <Link to={`/pacientes/${pacienteData.pac_id}/consultas/${consulta.con_id}`}>
                                                <button type="button" className="btn btn-secondary">
                                                    <i className="bi bi-search"></i>
                                                </button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="card-body collapse show" id="consultasCollapse">
                                    <p>Nenhuma consulta registrada</p>
                                </div>
                            )}

                        </div>

                        <div className="card mt-4">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <a data-bs-toggle="collapse" href="#examesCollapse" role="button" aria-expanded="false" aria-controls="examesCollapse">
                                    <h5 className="card-title" style={{color: 'black'}}>Exames</h5>
                                </a>
                                <Link to={`/pacientes/${idPaciente}/exames`}>
                                    <button type="button" className="btn btn-info">
                                        <i className="bi bi-clipboard-pulse"></i> Cadastrar
                                    </button>
                                </Link>
                            </div>
                            {exames.length > 0 ? (
                                <ul className="list-group p-3 collapse show" id="examesCollapse">
                                    {exames.slice(0, 5).map((exame) => (
                                        <li key={exame.exa_id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <span className="fw-bold">Data:</span> {formatStringToDate(exame.exa_data)}
                                                <span className="fw-bold">- Horário:</span> {exame.exa_hora}
                                                <span className="fw-bold">- Tipo:</span> {exame.exa_tipo}
                                            </span>
                                            <Link to={`/pacientes/${pacienteData.pac_id}/exames/${exame.exa_id}`}>
                                                <button type="button" className="btn btn-secondary">
                                                    <i className="bi bi-search"> Editar </i>
                                                </button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="card-body collapse show" id="examesCollapse">
                                    <p>Nenhum exame registrado</p>
                                </div>
                            )}
                        </div>

                        <div className="card mt-4">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <a data-bs-toggle="collapse" href="#dietasCollapse" role="button" aria-expanded="false" aria-controls="dietasCollapse">
                                    <h5 className="card-title" style={{color: 'black'}}>Dietas</h5>
                                </a>
                                <Link to={`/pacientes/${idPaciente}/dietas`}>
                                    <button type="button" className="btn btn-info">
                                        <i className="bi bi-clipboard-pulse"></i> Cadastrar
                                    </button>
                                </Link>
                            </div>
                            {dietas ? (
                                <ul className="list-group p-3 collapse show" id="dietasCollapse">
                                    {dietas.data.map((dieta) => (
                                        <li key={dieta.die_id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <span className="fw-bold">Data:</span> {formatStringToDate(dieta.die_data)}
                                                <span className="fw-bold">- Horário:</span> {dieta.die_hora}
                                                <span className="fw-bold">- Tipo:</span> {dieta.die_tipo}
                                            </span>
                                            <Link to={`/pacientes/${pacienteData.pac_id}/dietas/${dieta.die_id}`}>
                                                <button type="button" className="btn btn-secondary">
                                                    <i className="bi bi-search"> Editar </i>
                                                </button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="card-body collapse show" id="dietasCollapse">
                                    <p>Nenhuma dieta registrada</p>
                                </div>
                            )}
                        </div>

                        <div className="card mt-4">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <a data-bs-toggle="collapse" href="#exerciciosCollapse" role="button" aria-expanded="false" aria-controls="exerciciosCollapse">
                                    <h5 className="card-title" style={{color: 'black'}}>Exercicios</h5>
                                </a>
                                <Link to={`/pacientes/${idPaciente}/exercicios`}>
                                    <button type="button" className="btn btn-info">
                                        <i className="bi bi-clipboard-pulse"></i> Cadastrar
                                    </button>
                                </Link>
                            </div>
                            {exercicios ? (
                                <ul className="list-group p-3 collapse show" id="exerciciosCollapse">
                                    {exercicios.data.map((exercicio) => (
                                        <li key={exercicio.exe_id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <span className="fw-bold">Data:</span> {formatStringToDate(exercicio.exe_data)}
                                                <span className="fw-bold">- Horário:</span> {exercicio.exe_hora}
                                                <span className="fw-bold">- Tipo:</span> {exercicio.exe_tipo}
                                            </span>
                                            <Link to={`/pacientes/${pacienteData.pac_id}/exercicios/${exercicio.exe_id}`}>
                                                <button type="button" className="btn btn-secondary">
                                                    <i className="bi bi-search"> Editar </i>
                                                </button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="card-body collapse show" id="exerciciosCollapse">
                                    <p>Nenhum exercicio registrado</p>
                                </div>
                            )}
                        </div>

                        
                        <div className="card mt-4">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <a data-bs-toggle="collapse" href="#medicamentosCollapse" role="button" aria-expanded="false" aria-controls="medicamentosCollapse">
                                    <h5 className="card-title" style={{color: 'black'}}>Medicamentos</h5>
                                </a>
                                <Link to={`/pacientes/${idPaciente}/medicamentos`}>
                                    <button type="button" className="btn btn-info">
                                        <i className="bi bi-clipboard-pulse"></i> Cadastrar
                                    </button>
                                </Link>
                            </div>
                            {medicamentos.length > 0 ? (
                                <ul className="list-group p-3 collapse show" id="medicamentosCollapse">
                                    {medicamentos.slice(0, 5).map((medicamento) => (
                                        <li key={medicamento.med_id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <span className="fw-bold">Data:</span> {formatStringToDate(medicamento.med_data)}
                                                <span className="fw-bold">- Horário:</span> {medicamento.med_hora}
                                                <span className="fw-bold">- Tipo:</span> {medicamento.med_tipo}
                                            </span>
                                            <Link to={`/pacientes/${pacienteData.pac_id}/medicamentos/${medicamento.med_id}`}>
                                                <button type="button" className="btn btn-secondary">
                                                    <i className="bi bi-search"> Editar </i>
                                                </button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="card-body collapse show" id="medicamentosCollapse">
                                    <p>Nenhum medicamento registrado</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default DetalhaProntuario;