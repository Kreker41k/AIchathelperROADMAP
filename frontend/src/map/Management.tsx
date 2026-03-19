import { useNavigate } from 'react-router-dom';
import './Map.scss'

function Management(){
    const navigate = useNavigate();

    return(
        <footer>
            <div className="NameOfActivity">Management</div>
            <button className="GoBackbtn" onClick={() => navigate('/ROADmap')}>Назад</button>
            <div className="Profession">
                <button className="ProfbtnMANAGEMENT" onClick={() => navigate('/ProjectManager')}>Project Manager</button>
                <button className="ProfbtnMANAGEMENT" onClick={() => navigate('/ProductManager')}>Product Manager</button>
                <button className="ProfbtnMANAGEMENT" onClick={() => navigate('/ITRecruiter')}>IT-рекрутер</button>
            </div>
        </footer>
    )
}

export default Management