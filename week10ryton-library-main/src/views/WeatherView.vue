<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
      </div>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
      <!-- Main section to display weather data if available -->
      <main>
        <!-- Only display this section if weatherData exists -->
        <div v-if="weatherData">
          <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <div>
            <!-- Image source is handled by iconUrl method -->
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- Display the current weather description -->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
    import axios from "axios";
  
    const apikey = "f9a04361483fd920a703926625336972";
    
    export default {
      name: "App",
      data() {
        return {
          city: "",
          weatherData: null,
          hourlyForecast: [],
          dailyForecast: [],
        };
      },
      computed: {
        // Convert temperature from Kelvin to Celsius
        temperature() {
          return this.weatherData
            ? Math.floor(this.weatherData.main.temp - 273)
            : null;
        },
        // Get the weather icon URL
        iconUrl() {
          return this.weatherData
            ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
            : null;
        },
      },
      mounted() {
        this.fetchCurrentLocationWeather();
      },
      methods: {
        // Fetch current weather data based on user's location
        async fetchCurrentLocationWeather() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
              await this.fetchWeatherData(url);
            });
          }
        },
        // Fetch weather data based on a city search
        async searchByCity() {
          if (this.city) {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          }
        },
        // Fetch weather data from the API
        async fetchWeatherData(url) {
          try {
            const response = await axios.get(url);
            this.weatherData = response.data;
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
      },
    };
  </script>
  