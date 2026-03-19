import { useNavigate } from 'react-router-dom';
import './Map.scss'

function InformationSecurity(){
    const navigate = useNavigate();

    return(
        <footer>
            <div className="NameOfActivity">InformationSecurity</div>
            <button className="GoBackbtn" onClick={() => navigate('/ROADmap')}>Назад</button>
            <div className="Profession">
                <button className="ProfbtnINFORMATIONSECURITY" onClick={() => navigate('/CyberSecurity')}>Cyber security</button>
                <button className="ProfbtnINFORMATIONSECURITY" onClick={() => navigate('/InformationSecurityManager')}>Менеджер информационной безопасности</button>
            </div>
        </footer>
    )
}

export default InformationSecurity