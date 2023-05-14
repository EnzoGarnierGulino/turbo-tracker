import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./Homepage.js";
import About from "./About.js";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/About" element={<About />} />
                <Route path="*" element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;