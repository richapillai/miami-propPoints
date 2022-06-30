import "./App.css";
import { Landing, Payments, Register, Score, Sign } from "./pages";
import { Navbar } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/Register' element={<Register />} />
				<Route path='/Score' element={<Score />} />
				<Route path='/Payments' element={<Payments />} />
				<Route path='/Sign' element={<Sign />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
