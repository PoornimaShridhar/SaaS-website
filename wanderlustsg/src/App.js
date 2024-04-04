import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import PlanPage from './PlanPage';
import HomePage from './HomePage';
import InformationPage from './InformationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/info/:imageId" element={<InformationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
