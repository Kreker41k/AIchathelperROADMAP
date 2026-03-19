import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.scss'
import ROADmap from './ROADmap'
import AIhelper from './AIhelper'
import Development from './map/Development'
import DataAnalytics from './map/DataAnalytics'
import Management from './map/Management'
import Infrastructure from './map/Infrastructure'
import InformationSecurity from './map/InformationSecurity'
import Testing from './map/Testing'
import Design from './map/Design'
import Digitalmarketing from './map/Digitalmarketing'
import Frontend from './map/Development/Frontend'
import Backend from './map/Development/Backend'
import Fullstack from './map/Development/Fullstack'
import MobDev from './map/Development/MobDev'
import GameDev from './map/Development/GameDev'
import DataScientist from './map/analytics/DataScientist'
import SystemAnalyst from './map/analytics/SystemAnalyst'
import BusinessAnalyst from './map/analytics/BusinessAnalyst'
import DataAnalyst from './map/analytics/DataAnalyst'
import ProjectManager from './map/Management/ProjectManager'
import ProductManager from './map/Management/ProductManager'
import ITRecruiter from './map/Management/ITRecruiter'
import SystemAdministrator from './map/Infrastructure/SystemAdministrator'
import DevOpsEngineer from './map/Infrastructure/DevOpsEngineer'
import DatabaseAdministrator from './map/Infrastructure/DatabaseAdministrator'
import CyberSecurity from './map/InformationSecurity/CyberSecurity'
import InformationSecurityManager from './map/InformationSecurity/InformationSecurityManager'
import QAEngineer from './map/Testing/QAEngineer'
import SoftwareTester from './map/Testing/SoftwareTester'
import UIUXDesigner from './map/Design/UIUXDesigner'
import WebDesigner from './map/Design/WebDesigner'
import GameDesigner from './map/Design/GameDesigner'
import SEOSpecialist from './map/Digitalmarketing/SEOSpecialist'
import SMMManager from './map/Digitalmarketing/SMMManager'
import TrafficManager from './map/Digitalmarketing/TrafficManager'


function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header>
        <button className="Headerbtn" onClick={() => navigate('/ROADmap')}>
          Я решу сам
        </button>
        <button className="Headerbtn" onClick={() => navigate('/AIhelper')}>
          AI мне поможет
        </button>
      </header>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ROADmap" element={<ROADmap />} />
      <Route path="/AIhelper" element={<AIhelper />} />
      <Route path="/Development" element={<Development />} />
      <Route path="/DataAnalytics" element={<DataAnalytics />} />
      <Route path="/Management" element={<Management />} />
      <Route path="/Infrastructure" element={<Infrastructure />} />
      <Route path="/InformationSecurity" element={<InformationSecurity />} />
      <Route path="/Testing" element={<Testing />} />
      <Route path="/Design" element={<Design />} />
      <Route path="/Digitalmarketing" element={<Digitalmarketing />} />
      <Route path="/Frontend" element={<Frontend />} />
      <Route path="/Backend" element={<Backend />} />
      <Route path="/Fullstack" element={<Fullstack />} />
      <Route path="/MobDev" element={<MobDev />} />
      <Route path="/GameDev" element={<GameDev />} />
      <Route path="/DataScientist" element={<DataScientist />} />
      <Route path="/SystemAnalyst" element={<SystemAnalyst />} />
      <Route path="/BusinessAnalyst" element={<BusinessAnalyst />} />
      <Route path="/DataAnalyst" element={<DataAnalyst />} />
      <Route path="/ProjectManager" element={<ProjectManager />} />
      <Route path="/ProductManager" element={<ProductManager />} />
      <Route path="/ITRecruiter" element={<ITRecruiter />} />
      <Route path="/SystemAdministrator" element={<SystemAdministrator />} />
      <Route path="/DevOpsEngineer" element={<DevOpsEngineer />} />
      <Route path="/DatabaseAdministrator" element={<DatabaseAdministrator />} />
      <Route path="/CyberSecurity" element={<CyberSecurity />} />
      <Route path="/InformationSecurityManager" element={<InformationSecurityManager />} />
      <Route path="/QAEngineer" element={<QAEngineer />} />
      <Route path="/SoftwareTester" element={<SoftwareTester />} />
      <Route path="/UIUXDesigner" element={<UIUXDesigner />} />
      <Route path="/WebDesigner" element={<WebDesigner />} />
      <Route path="/GameDesigner" element={<GameDesigner />} />
      <Route path="/SEOSpecialist" element={<SEOSpecialist />} />
      <Route path="/SMMManager" element={<SMMManager />} />
      <Route path="/TrafficManager" element={<TrafficManager />} />
    </Routes>
  );
}

export default App;