import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const CardPaciente = ({className, paciente}) => {
    return (
        <div className={className}>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title"><i className={`fs-1 bi bi-person-circle`}></i> {paciente.pac_nome}</h4>
                    <div className="mt-4 ">
                        <p><span className="fw-bold">Idade: </span> {12}</p>
                        <p><span className="fw-bold">Convênio: </span> {paciente.pac_convenio}</p>
                        <p><span className="fw-bold">Telefone: </span> {paciente.pac_telefone}</p>
                        <div className="text-center">
                            <Link to={`/pacientes/${paciente.pac_id}`} className="btn btn-sm btn-primary btn-warning"><i className="bi bi-file-earmark-person"></i> Ver mais </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

CardPaciente.propTypes = {
    className: PropTypes.string.isRequired,
    paciente: PropTypes.object.isRequired
}