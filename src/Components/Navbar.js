import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="border-solid border-x-4">
      <div className="h-40 pt-16 border-solid border-b-4 text-center">
        <Link to="/">Contacts</Link>
      </div>
      <div className="h-40 pt-16 border-solid border-b-4 text-center">
        <Link to="/mapchart">Maps and Charts</Link>
      </div>
      <div className="h-80 pt-16 border-solid border-b-4 text-center">
      </div>
    </div>
  );
}
