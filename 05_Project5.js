// Weather App 

import readline from "readline";
import chalk from "chalk";
import https from "https";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getWeather = () => {
    rl.question(chalk.red("\nEnter a city name to get it's weather : "), (city) => {
        const base_url = "https://api.openweathermap.org/data/2.5/weather";
        const api_key = "2c76bc1664c39746c4f7fa9c9ecede8c";
        const url = `${base_url}?q=${city},IN&appid=${api_key}&units=metric`;
        https.get(url, (response) => {
            let data = "";
            response.on("data", (chunks) => {
                data += chunks;
            });
            response.on("end", () => {
                const weatherdata = JSON.parse(data);  
                console.log(chalk.green("\nWeather Information : "));
                console.log(chalk.blue(`City : ${weatherdata.name}`));
                console.log(chalk.blue(`Temperature : ${weatherdata.main.temp}°C`)); 
                console.log(chalk.blue(`Description : ${weatherdata.weather[0].description}`));
                console.log(chalk.blue(`Humidity : ${weatherdata.main.humidity}%`));
                console.log(chalk.blue(`Wind Speed : ${weatherdata.wind.speed}m/s\n`));
                rl.close();
            });
            response.on("error", (err) => {
                console.log(`Error : ${err.message}`);
            });
        });
    });
};

getWeather();