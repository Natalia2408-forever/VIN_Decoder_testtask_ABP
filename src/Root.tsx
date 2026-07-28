import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { AllVariablesPage } from './pages/AllVariablesPage';
import { VariablePage } from './pages/VariablePage';

export const Root: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="variables" element={<AllVariablesPage />} />
      <Route path="variables/:variableId" element={<VariablePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
