import {Navigate} from 'react-router';

function ProtectedRoute({ children, regrasPermitidas }) {

    const token = sessionStorage.getItem("token");
    const regra = sessionStorage.getItem("regra");

    //Não autenticado
    if(!token){
        return <Navigate to="/login" />;
    }

    //Sem permissão
    if(regrasPermitidas && !regrasPermitidas.includes(regra)){
        return <Navigate to="/home" />;
    }

    return children;
}

export default ProtectedRoute;