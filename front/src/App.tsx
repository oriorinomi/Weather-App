import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<>
			<h1 className="text-blue-700">coucou</h1>
			<Outlet />
		</>
	);
}

export default App;
