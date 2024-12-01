import { useState, useEffect } from 'react';
import './App.css';

// api key
// 49fe15ccbec548d1a36170638242911
const key: string = '49fe15ccbec548d1a36170638242911';
function App() {
    // const [count, setCount] = useState(0);
    const [data, setData]: any[] = useState([]);
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
                    setLoading(true);
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
                        <>
                            <img
                                src={data.current.condition.icon}
                                alt="icon_weather"
                                className="icon"
                            />
                            <h3>{data.current.condition.text}</h3>
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
                            <h3>
                                Feels like:{' '}
                                {data.current.feelslike_c > 0
                                    ? `+${data.current.feelslike_c}`
                                    : data.current.feelslike_c}
                                &deg;C /{' '}
                                {data.current.feelslike_f > 0
                                    ? `+${data.current.feelslike_f}`
                                    : data.current.feelslike_f}
                                &deg;F
                            </h3>
                            <h3>
                                Wind: {data.current.wind_mph} mph /{' '}
                                {data.current.wind_kph} kph &#10;
                                {data.current.wind_dir}
                            </h3>
                            <h3>Humidity: {data.current.humidity}%</h3>
                            <h3>
                                Pressure: {data.current.pressure_mb} mb /{' '}
                                {data.current.pressure_in} in
                            </h3>
                            <h3>
                                Precip: {data.current.precip_mm} mm /{' '}
                                {data.current.precip_in} in
                            </h3>
                            <h3>
                                Visibility: {data.current.vis_km} km /{' '}
                                {data.current.vis_miles} miles
                            </h3>
                            <h3>Ultraviolet index: {data.current.uv}</h3>
                            <h3>
                                Gust: {data.current.gust_mph} mph /{' '}
                                {data.current.gust_kph} kph
                            </h3>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default App;
