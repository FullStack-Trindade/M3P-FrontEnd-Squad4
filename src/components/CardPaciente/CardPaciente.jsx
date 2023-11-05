import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const CardPaciente = ({className, paciente}) => {

    const getAge = () => {
        const today = new Date();
        const birthDate = new Date(paciente.pac_nascimento);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }

        return age;
    };

    return (
        <div className={className}>
            <div className="card d-flex align-items-center">
                <div className="card-body d-flex-col">
                    <span className={`fs-1 bi bi-person-circle`}></span>
                    <h4 className="card-title text-center"> {paciente.pac_nome}</h4>
                    <div className="mt-4 infos">
                            <p className='text-center'><span className="fw-bold">Idade: </span> {getAge()}</p>
                            <p className='text-center'><span className="fw-bold">Convênio: </span> {paciente.pac_convenio ? paciente.pac_convenio : 'NA'}</p>
                            <p className='text-center'><span className="fw-bold">Telefone: </span> {paciente.pac_telefone}</p>
                        <div className="text-center">
                            <Link to={`/prontuarios/${paciente.pac_id}`} className="btn btn-sm"><i className="bi bi-file-earmark-person"></i> Ver mais </Link>
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