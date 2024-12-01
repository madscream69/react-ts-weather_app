import { useState, useEffect } from 'react';
import './App.css';

// api key
// 49fe15ccbec548d1a36170638242911
const key: string = '49fe15ccbec548d1a36170638242911';
function App() {
    // const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [inputCity, setInputCity] = useState('');
    const [currentCity, setCurrentCity] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulating a delay to show loading state
                setTimeout(async () => {
                    if (currentCity.length !== 0) {
                        const response = await fetch(
                            `http://api.weatherapi.com/v1/current.json?key=${key}&q=${currentCity}&aqi=yes`
                        );
                        const result = await response.json();
                        if (await result.error) {
                            result.error.message
                                ? setErrorMessage(result.error.message)
                                : setErrorMessage('Unknown error!');
                            setErrors(true);
                            throw new Error(result.error.message);
                        } else {
                            setData(result);
                            setLoading(false);
                            setErrors(false);
                        }
                    }

                    // console.log(result.error);
                }, 1000);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
                setErrors(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentCity]);

    // console.log(errors);
    function updateInputValue(evt: any) {
        setInputCity(evt.target.value);
    }
    function handleKeyPress(evt: any) {
        if (evt.key === 'Enter' && inputCity.length !== 0) {
            setCurrentCity(inputCity);
            console.log('Нажата клавиша Enter, ура!');
        }
    }
    function searchBtnPress() {
        if (inputCity.length !== 0) {
            setCurrentCity(inputCity);
        }
    }
    return (
        <>
            <h1>Check weather in your city</h1>
            <div className="searchBlock">
                <label>
                    <input
                        placeholder="Type your city and press button or Enter key..."
                        type="text"
                        className="searchCity"
                        value={inputCity}
                        onChange={(evt: any) => updateInputValue(evt)}
                        onKeyDown={(evt: any) => handleKeyPress(evt)}
                    />
                    <button
                        className="searchBtn"
                        onClick={() => searchBtnPress()}
                    >
                        Search
                    </button>
                </label>
            </div>

            {errors ? (
                <h3>ERROR! {errorMessage}</h3>
            ) : (
                <div className="card">
                    {loading ? (
                        <p>wait, mf</p>
                    ) : (
                        <h3>
                            Temperature:{' '}
                            {data.current.temp_c > 0
                                ? `+${data.current.temp_c}`
                                : data.current.temp_c}
                            &deg;C /{' '}
                            {data.current.temp_f > 0
                                ? `+${data.current.temp_f}`
                                : data.current.temp_f}
                            &deg;F
                        </h3>
                    )}
                </div>
            )}
        </>
    );
}

export default App;
