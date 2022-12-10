import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { publicRoutes } from './routes';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
                <Navbar />
            </div>
        </Router>
    );
}

export default App;
