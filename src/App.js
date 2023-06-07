import "./index.css";
import Navbar from "./Components/Navbar";
import CreateContact from "./Components/Createcontact";
import Mapchart from "./Components/Mapchart";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App ">
      <h1 className='border-4 border-solid border-[#94A3B8] h-20 text-2xl text-center pt-4 fixed w-full'>Contact Management System</h1>
      <div className="main flex">
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateContact />} />
          <Route path="mapchart" element={<Mapchart />} />
        </Routes>
      </div>
    </div>
  );
}
