import { useNavigate } from 'react-router-dom';
import './Map.scss'

function Design(){
    const navigate = useNavigate();

    return(
        <footer>
            <div className="NameOfActivity">Design</div>
            <button className="GoBackbtn" onClick={() => navigate('/ROADmap')}>Назад</button>
            <div className="Profession">
                <button className="ProfbtnDESIGN" onClick={() => navigate('/UIUXDesigner')}>UX/UI-дизайнер</button>
                <button className="ProfbtnDESIGN" onClick={() => navigate('/WebDesigner')}>Web-дизайнер</button>
                <button className="ProfbtnDESIGN" onClick={() => navigate('/GameDesigner')}>Game-дизайнер</button>
            </div>
        </footer>
    )
}

export default Design