import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { publicRoutes } from './routes';
import Navbar from './components/Navbar';
import { useState, createContext, useEffect } from 'react';
import refreshComponent from './components/RefreshComponent';
import AI from './components/AI';

function App() {
    const [refresh, setRefresh] = useState('');
    const [search, setSearch] = useState('');
    const [ai, setAi] = useState('');
    const value = { refresh, setRefresh, search, setSearch, ai, setAi };
    return (
        <refreshComponent.Provider value={value}>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                    <AI />
                </div>
            </Router>
        </refreshComponent.Provider>
    );
}

export default App;
