import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './modules/Header/Header';
import { Footer } from './modules/Footer/Footer';

export const App: React.FC = () => (
  <>
    <h1 hidden>VIN Decoder</h1>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);
