import { useNavigate } from 'react-router-dom';
import './Map.scss'

function Infrastructure(){
    const navigate = useNavigate();

    return(
        <footer>
            <div className="NameOfActivity">Infrastructure</div>
            <button className="GoBackbtn" onClick={() => navigate('/ROADmap')}>Назад</button>
            <div className="Profession">
                <button className="ProfbtnINFRASTRUCTURE" onClick={() => navigate('/SystemAdministrator')}>Системный администратор</button>
                <button className="ProfbtnINFRASTRUCTURE" onClick={() => navigate('/DevOpsEngineer')}>DevOps-инженер</button>
                <button className="ProfbtnINFRASTRUCTURE" onClick={() => navigate('/DatabaseAdministrator')}>Администратор баз данных</button>
            </div>
        </footer>
    )
}

export default Infrastructure