import React from 'react';
import { Routes, Route} from "react-router-dom";
import HomePage from '../pages/Home';
import Detail from '../pages/Detail';

const AppRoutes = () => {
  return (
    <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/Details/:id" element={<Detail/>} /> */}
    </Routes>
    
  )
}

export default AppRoutes