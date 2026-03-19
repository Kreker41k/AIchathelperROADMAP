import { useNavigate } from 'react-router-dom';
import './Map.scss'

function Testing(){
    const navigate = useNavigate();

    return(
        <footer>
            <div className="NameOfActivity">Testing</div>
            <button className="GoBackbtn" onClick={() => navigate('/ROADmap')}>Назад</button>
            <div className="Profession">
                <button className="ProfbtnTESTING" onClick={() => navigate('/QAEngineer')}>QA инженер</button>
                <button className="ProfbtnTESTING" onClick={() => navigate('/SoftwareTester')}>Тестировщик ПО</button>
            </div>
        </footer>
    )
}

export default Testing