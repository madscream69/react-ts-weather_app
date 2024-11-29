import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// api key
// 49fe15ccbec548d1a36170638242911
const key: string = '49fe15ccbec548d1a36170638242911';
const cityies: string[] = ['Sevastopol', 'Moscow', 'New York', 'Los Angeles'];
function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [citys, setCitys] = useState('Sevastopol');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulating a delay to show loading state
                setTimeout(async () => {
                    const response = await fetch(
                        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${citys}&aqi=yes`
                    );
                    const result = await response.json();
                    setData(result);
                    setLoading(false);
                    console.log(result);
                }, 1000);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [citys]);

    function handleRadioButton(str: string) {
        setCitys(str);
    }

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                {loading ? <p>wait, mf</p> : <h3>{data.current.temp_c}</h3>}
            </div>
            <div>
                {cityies.map((city, index) => {
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                checked={city === citys}
                                onChange={() => handleRadioButton(city)}
                            />
                            {city}
                        </label>
                    );
                })}
            </div>
        </>
    );
}

export default App;
