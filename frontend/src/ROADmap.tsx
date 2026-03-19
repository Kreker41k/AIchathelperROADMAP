import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.scss';
import './ROADmap.scss';

function ROADmap() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleClass = (): void => {
    setIsActive(!isActive);
  };

  return (
    <div className="App">
      <header>
        <button className="Headerbtn" onClick={() => navigate('/')}>Вернуться на главную</button>
      </header>
      <main>
        <div className="Professions">
          {/* Блок "Разработка" – передаём цвет #667eea */}
          <div
            className="Profcon"
            onClick={() => navigate('/Development', { state: { color: '#667eea' } })}
          >
            <h1>Разработка (Программирование)</h1>
            <div className="profession-buttons">
              <button className="Professionbtn">Frontend</button>
              <button className="Professionbtn">Backend</button>
              <button className="Professionbtn">Fullstack</button>
              <button className="Professionbtn">Мобильный разработчик</button>
              <button className="Professionbtn">GameDev</button>
            </div>
          </div>

          {/* Остальные блоки – пока без цвета, но можно добавить аналогично */}
          <div className="Profcon" onClick={() => navigate('/DataAnalytics')}>
            <h1>Аналитика данных</h1>
            <div className="profession-buttons">
              <button className="Professionbtn">Data Scientist</button>
              <button className="Professionbtn">Системный аналитик</button>
              <button className="Professionbtn">Бизнес аналитик</button>
              <button className="Professionbtn">Аналитик данных</button>
            </div>
          </div>
          <div className="Profcon" onClick={() => navigate('/Management')}>
            <h1>Управление (Менеджмент)</h1>
            <div className="profession-buttons">
              <button className="Professionbtn">Project Manager</button>
              <button className="Professionbtn">Product Manager</button>
              <button className="Professionbtn">IT-рекрутер</button>
            </div>
          </div>
          <div className="Profcon" onClick={() => navigate('/Infrastructure')}>
            <h1>Инфраструктура и администрирование</h1>
            <div className="profession-buttons">
              <button className="Professionbtn">Системный администратор</button>
              <button className="Professionbtn">DevOps-инженер</button>
              <button className="Professionbtn">Администратор баз данных</button>
            </div>
          </div>
          <div className="Profcon" onClick={() => navigate('/InformationSecurity')}>
            <h1>Информационная безопасность</h1>
            <div className="profession-buttons">
              <button className="Professionbtn">Cyber security</button>
              <button className="Professionbtn">Менеджер информационной безопасности</button>
            </div>
          </div>
          <div className="Profcon" onClick={() => navigate('/Testing')}>
            <h1>Тестирование</h1>
            <div className="profession-buttons">
              <button className="Professionbtn">QA инженер</button>
              <button className="Professionbtn">Тестировщик ПО</button>
            </div>
          </div>
          <div className="Profcon" onClick={() => navigate('/Design')}>
            <h1>Дизайн</h1>
            <div className="profession-buttons">
              <button className="Professionbtn">UX/UI-дизайнер</button>
              <button className="Professionbtn">Web-дизайнер</button>
              <button className="Professionbtn">Game-дизайнер</button>
            </div>
          </div>
          <div className="Profcon" onClick={() => navigate('/Digitalmarketing')}>
            <h1>Digital-маркетинг</h1>
            <div className="profession-buttons">
              <button className="Professionbtn">SEO-специалист</button>
              <button className="Professionbtn">SMM-менеджер</button>
              <button className="Professionbtn">Трафик-менеджер</button>
            </div>
          </div>
        </div>
        <div className={`NonProfessions ${isActive ? 'hide' : 'show'}`}></div>
        <button className={`ROADmapbtn ${isActive ? 'hide' : 'show'}`} onClick={toggleClass}>
          Выбери специальность
        </button>
      </main>
    </div>
  );
};

export default ROADmap;