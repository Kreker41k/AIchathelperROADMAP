import { useNavigate } from 'react-router-dom';
import './Map.scss'

function DataAnalytics(){
    const navigate = useNavigate();

    return(
        <footer>
            <div className="NameOfActivity">DataAnalytics</div>
            <button className="GoBackbtn" onClick={() => navigate('/ROADmap')}>Назад</button>
            <div className="Profession">
                <button className="ProfbtnDATAANALYTICS" onClick={() => navigate('/DataScientist')}>Data Scientist</button>
                <button className="ProfbtnDATAANALYTICS" onClick={() => navigate('/SystemAnalyst')}>Системный аналитик</button>
                <button className="ProfbtnDATAANALYTICS" onClick={() => navigate('/BusinessAnalyst')}>Бизнес аналитик</button>
                <button className="ProfbtnDATAANALYTICS" onClick={() => navigate('/DataAnalyst')}>Аналитик данных</button>
            </div>
        </footer>
    )
}

export default DataAnalytics