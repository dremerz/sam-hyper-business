import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Addemployee from "./Addemployee";
import Viewemployee from "./Viewemployee";
import {Outlet} from 'react-router-dom';
import Takeattendance from "./Takeattendance";
import Viewattendance from "./Viewattendance";
import SalaryAndtax from "./SalaryAndtax";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
    <Navbar/>
    <Sidebar/>
<BrowserRouter>
      <Routes>
    
       
          <Route index element={<Viewemployee />} />
          <Route path="ADD-EMPLOYEE" element={<Addemployee />} />
          <Route path="VIEW-EMPLOYEE" element={<Viewemployee />} />
          <Route path="TAKE-ATTENDANCE" element={<Takeattendance  />} />
          <Route path="VIEW-ATTENDANCE" element={<Viewattendance  />} />
          <Route path="SALARYANDTAX" element={<SalaryAndtax  />} /> 
          <Route path="*" element={<Viewemployee />} />

      </Routes>
    </BrowserRouter>
    <Outlet></Outlet>
    </div>
  );
}





export default App;
