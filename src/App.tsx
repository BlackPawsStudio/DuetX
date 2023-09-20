import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { GamePage } from './components/pages/Game';
import { MenuPage } from './components/pages/Menu';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<MenuPage />} />
        <Route path={'/game'} element={<GamePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
