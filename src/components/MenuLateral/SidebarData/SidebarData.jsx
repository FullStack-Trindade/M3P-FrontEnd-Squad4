import * as FaIcon from "react-icons/fa";
import * as BsIcon from "react-icons/bs";

const style = { color: "var(--black-purple)"};

export const SidebarData =  [
  {
    title: 'Home',
    path: '/home',
    icon: <FaIcon.FaClinicMedical style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Paciente',
    // path: '/patientregistration',
    icon: <BsIcon.BsFillPersonVcardFill style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Exame',
    path: '/exames',
    icon: <FaIcon.FaNotesMedical style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Consulta',
    // path: '/examregistration',
    icon: <FaIcon.FaFileMedicalAlt style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Medicamento',
    // path: '/medicalrecordlist',
    icon: <BsIcon.BsCapsulePill style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Dieta',
    path: '/cadastrar-dieta',
    icon: <FaIcon.FaAppleAlt style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Exercício',
    // path: '/cadastrar-dieta',
    icon: <FaIcon.FaRunning style={style}/>,
    cName: 'nav-text',
  },

]