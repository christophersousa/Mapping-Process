import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { LoginPage } from '../pages/LoginPage';
import { Process } from '../pages/Process';

export const RoutesPage = () => (
  <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path="/home"  element={<Home/>} />
    <Route path="/process" element={<Process/>} />
  </Routes>
);