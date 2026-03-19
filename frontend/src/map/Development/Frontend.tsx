import { useNavigate, useLocation } from 'react-router-dom';
import { useStageModal } from '../../../../backend/StageModal/useStageModal';
import StageModal from '../../../../backend/StageModal/StageModal';
import '../Map.scss';

function Frontend() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryColor = location.state?.color || '#667eea';

  const { isModalOpen, selectedStage, openModal, closeModal, gradientColor } = useStageModal();

  const stages: string[] = [
    'Основы веб-разработки',
    'HTML и семантика',
    'CSS и стилизация',
    'JavaScript основы',
    'Продвинутый JavaScript',
    'Git и системы контроля версий',
    'CSS препроцессоры (SASS/SCSS)',
    'Сборщики модулей (Webpack/Vite)',
    'Фреймворки (React/Vue/Angular)',
    'Управление состоянием (Redux/Zustand)',
    'TypeScript',
    'Тестирование (Jest/Vitest)',
    'Оптимизация производительности',
    'Анимации и интерактивность',
    'PWA и сервис воркеры',
    'SSR и Next.js/Nuxt',
    'CI/CD и деплой',
    'Мониторинг и отладка'
  ];

  return (
    <footer>
      <div className="NameOfActivity">Frontend</div>
      <button className="GoBackbtn" onClick={() => navigate('/Development')}>Назад</button>
      <div className="Roadmap">
        {stages.map((stage, index) => (
          <div
            key={index}
            className="stage"
            onClick={() => openModal(stage, categoryColor)}
            title="Нажмите для подробной информации"
          >
            {stage}
          </div>
        ))}
      </div>

      <StageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        stageData={selectedStage}
        gradientColor={gradientColor}
      />
    </footer>
  );
}

export default Frontend;