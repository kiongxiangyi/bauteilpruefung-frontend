import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Results from './pages/Results';
import Layout from './layouts/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* value of path should always be in small case according to the standard */}
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
