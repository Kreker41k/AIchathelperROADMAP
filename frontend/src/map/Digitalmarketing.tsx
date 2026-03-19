import { useNavigate } from 'react-router-dom';
import './Map.scss'

function Digitalmarketing(){
    const navigate = useNavigate();

    return(
        <footer>
            <div className="NameOfActivity">Digitalmarketing</div>
            <button className="GoBackbtn" onClick={() => navigate('/ROADmap')}>Назад</button>
            <div className="Profession">
                <button className="ProfbtnDIGITAL" onClick={() => navigate('/SEOSpecialist')}>SEO-специалист</button>
                <button className="ProfbtnDIGITAL" onClick={() => navigate('/SMMManager')}>SMM-менеджер</button>
                <button className="ProfbtnDIGITAL" onClick={() => navigate('/TrafficManager')}>Трафик-менеджер</button>
            </div>
        </footer>
    )
}

export default Digitalmarketing