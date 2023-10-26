import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";
import TimeLogs from "./pages/TimeLogs";
import Paychecks from "./pages/Paychecks";
import Paycheck from "./pages/Paycheck";
import Departaments from "./pages/Departaments";
import Justifications from "./pages/Justifications";
import Positions from "./pages/Positions";

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/rh/login" element={<Login />} />
        <Route path="/rh/registrar" element={<Register />} />
        <Route path="/rh/:userId/*" element={<User />} />
        <Route path="/rh/:userId/colaboradores" element={<Employees />} />
        <Route
          path="/rh/:userId/colaboradores/:employeeId"
          element={<Employee />}
        />
        <Route
          path="/rh/:userId/colaboradores/:employeeId/registros"
          element={<TimeLogs />}
        />
        <Route
          path="/rh/:userId/colaboradores/:employeeId/contracheques"
          element={<Paychecks />}
        />
        <Route
          path="/rh/:userId/colaboradores/:employeeId/contracheques/:paycheckId"
          element={<Paycheck />}
        />
        <Route path="/rh/:userId/departamentos" element={<Departaments />} />
        <Route path="/rh/:userId/justificativas" element={<Justifications />} />
        <Route path="/rh/:userId/cargos" element={<Positions />} />
      </Routes>
    </BrowserRouter>
  );
}
