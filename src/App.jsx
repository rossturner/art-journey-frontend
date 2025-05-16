import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":year/:month/:slug" element={<Project />} />
        </Routes>
    );
}

export default App
