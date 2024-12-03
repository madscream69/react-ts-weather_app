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
            {/* {!errors && !loading && data.current.condition.text ? (
                <div
                    className="dynamic_bg"
                    style={{ backgroundImage: `url(${rain})` }}
                >
                    {/* <img src={rain} alt="rain" /> }
                </div>            ) : (
                <></>
            )} */}

            <div className="app">
                <h1 className="app__h">Check weather in your city</h1>
                <div className="searchBlock">
                    <label className="search__label">
                        <input
                            placeholder="Type your city here..."
                            type="text"
                            className="search__input"
                            value={inputCity}
                            onChange={(evt: any) => updateInputValue(evt)}
                            onKeyDown={(evt: any) => handleKeyPress(evt)}
                        />
                        <button
                            className="search__btn"
                            onClick={() => searchBtnPress()}
                        >
                            GO
                        </button>
                    </label>
                </div>

                {errors ? (
                    <h3>ERROR! {errorMessage}</h3>
                ) : (
                    <>
                        {loading ? (
                            <p>Waiting...</p>
                        ) : (
                            <>
                                <div className="info__grid">
                                    <div className="info__grid-long">
                                        <div className="info__grid-location">
                                            <p className="info__text">
                                                {data.location.name} (
                                                {data.location.country})
                                            </p>
                                            <div className="short-info">
                                                <div className="img-wrapper">
                                                    <img
                                                        src={
                                                            data.current
                                                                .condition.icon
                                                        }
                                                        alt="icon_weather"
                                                        className="icon"
                                                    />
                                                </div>
                                                <p className="info__text">
                                                    {
                                                        data.current.condition
                                                            .text
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="info-temp">
                                            <p className="info__text">
                                                Temperature:{' '}
                                                {data.current.temp_c > 0
                                                    ? `+${data.current.temp_c}`
                                                    : data.current.temp_c}
                                                &deg;C /{' '}
                                                {data.current.temp_f > 0
                                                    ? `+${data.current.temp_f}`
                                                    : data.current.temp_f}
                                                &deg;F
                                            </p>
                                            <p className="info__text">
                                                Feels like:{' '}
                                                {data.current.feelslike_c > 0
                                                    ? `+${data.current.feelslike_c}`
                                                    : data.current.feelslike_c}
                                                &deg;C /{' '}
                                                {data.current.feelslike_f > 0
                                                    ? `+${data.current.feelslike_f}`
                                                    : data.current.feelslike_f}
                                                &deg;F
                                            </p>
                                        </div>
                                    </div>
                                    <div className="info__grid-short">
                                        <p className="info__text">
                                            Wind: {data.current.wind_mph} mph /{' '}
                                            {data.current.wind_kph} kph &#10;
                                            {data.current.wind_dir}
                                        </p>
                                        <p className="info__text">
                                            Humidity: {data.current.humidity}%
                                        </p>
                                        <p className="info__text">
                                            Pressure: {data.current.pressure_mb}{' '}
                                            mb / {data.current.pressure_in} in
                                        </p>
                                        <p className="info__text">
                                            Precip: {data.current.precip_mm} mm
                                            / {data.current.precip_in} in
                                        </p>
                                    </div>
                                    <div className="info__grid-short">
                                        <p className="info__text">
                                            Visibility: {data.current.vis_km} km
                                            / {data.current.vis_miles} miles
                                        </p>

                                        <p className="info__text">
                                            Gust: {data.current.gust_mph} mph /{' '}
                                            {data.current.gust_kph} kph
                                        </p>
                                        <p className="info__text">
                                            Ultraviolet index: {data.current.uv}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default App;
