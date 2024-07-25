import { useNavigate } from "react-router-dom";
import { ButtonConfirm, SessionContent, SessionExpiredContainer } from "./styles";
import { XCircle } from "phosphor-react";

export function SessionExpired() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/'); 
    };

    return (
        <SessionExpiredContainer>
            <SessionContent>
                <h1>Sua sessão expirou</h1>
                <XCircle size={52} color="#d41c00" />
                <p>Faça o login novamente</p>
                <ButtonConfirm onClick={handleRedirect}>OK</ButtonConfirm>
            </SessionContent>
        </SessionExpiredContainer>
    );
    // background-color: #f0f0f0; 
}
