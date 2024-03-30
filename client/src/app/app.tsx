import { Routes, Route } from 'react-router-dom';

import { ROUTES } from './routes';
import './style.css';

const App = () => {
  return (
    <div className="app">
      <Routes>
        {ROUTES.map(({ path, element: Element }, idx) => (
          <Route key={idx} path={path} element={<Element />} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
