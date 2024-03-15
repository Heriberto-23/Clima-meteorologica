import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async(loc) => {
        setLoading(true);
        setLocation(loc);

        //WEATHER

        const urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=b24bf3967086cc234882eabcbd54c643&lang=es&q=" + loc;
        
        try {
            const response = await fetch(urlWeather);
            if (!response.ok) throw { response };
            const weatherData = await response.json();
            console.log(weatherData);
            setWeather(weatherData);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setShow(false);
        }

        //FORECAST

        const urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=b24bf3967086cc234882eabcbd54c643&lang=es&q=" + loc;

        try {
            const response = await fetch(urlForecast);
            if (!response.ok) throw { response };
            const forecastData = await response.json();
            console.log(forecastData);
            setForecast(forecastData);
            setLoading(false);
            setShow(true);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setShow(false);
        }
    };

    return(
        <React.Fragment>
            <Form
                newLocation={getLocation}
            />

            <Card
                showData = {show}
                loadingData = {loading}
                weather = {weather}
                forecast = {forecast}

            />
        </React.Fragment>
    );
};

export default WeatherPanel;
