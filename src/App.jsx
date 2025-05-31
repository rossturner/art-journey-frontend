import {Link, Route, Routes} from 'react-router-dom';
import {Box, Group} from '@mantine/core';
import Home from './pages/Home';
import Project from './pages/Project';
import Aspirations from './pages/Aspirations';
import ArtTrendsCalendar from "./pages/ArtTrendsCalendar.jsx";

function App() {
    return (
        <>
            <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <Group component="nav" p="md" spacing="lg">
                    <Link to="/">Gallery</Link>
                    <Link to="/aspirations">Aspirations</Link>
                    <Link to="/art-trends-calendar">Art Trends Calendar</Link>
                    <Link to="https://miro.com/app/board/uXjVIw39cr0=/?share_link_id=202502614864" target={"_blank"}>My Development Plan</Link>
                </Group>
            </Box>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aspirations" element={<Aspirations />} />
                <Route path="/art-trends-calendar" element={<ArtTrendsCalendar />} />
                <Route path="/:year/:month/:slug" element={<Project />} />
            </Routes>
        </>
    );
}

export default App;
