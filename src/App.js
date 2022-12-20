import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { publicRoutes } from './routes';
import Navbar from './components/Navbar';
import { useState, createContext, useEffect } from 'react';
import refreshComponent from './components/RefreshComponent';

function App() {
    const [refresh, setRefresh] = useState('');
    const value = { refresh, setRefresh };
    useEffect(() => {
        console.log('check');
    }, [refresh]);
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
                </div>
            </Router>
        </refreshComponent.Provider>
    );
}

export default App;
