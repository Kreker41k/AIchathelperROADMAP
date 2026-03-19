import { useNavigate, useLocation } from 'react-router-dom';
import './Map.scss';

function Development() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryColor = location.state?.color || '#667eea'; // запасной цвет

  return (
    <footer>
      <div className="NameOfActivity">Development</div>
      <button className="GoBackbtn" onClick={() => navigate('/ROADmap')}>Назад</button>
      <div className="Profession">
        <button
          className="ProfbtnDEVELOPMENT"
          onClick={() => navigate('/Frontend', { state: { color: categoryColor } })}
        >
          Frontend
        </button>
        <button
          className="ProfbtnDEVELOPMENT"
          onClick={() => navigate('/Backend', { state: { color: categoryColor } })}
        >
          Backend
        </button>
        <button
          className="ProfbtnDEVELOPMENT"
          onClick={() => navigate('/Fullstack', { state: { color: categoryColor } })}
        >
          Fullstack
        </button>
        <button
          className="ProfbtnDEVELOPMENT"
          onClick={() => navigate('/MobDev', { state: { color: categoryColor } })}
        >
          Мобильный разработчик
        </button>
        <button
          className="ProfbtnDEVELOPMENT"
          onClick={() => navigate('/GameDev', { state: { color: categoryColor } })}
        >
          GameDev
        </button>
      </div>
    </footer>
  );
}

export default Development;