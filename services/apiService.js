import axios from 'axios';

// Fake Store API base URL
const FAKE_STORE_API = 'https://fakestoreapi.com';

// OpenWeatherMap API (you'll need to get a free API key)
const OPEN_WEATHER_API = 'https://api.openweathermap.org/data/2.5';
// Get free API key from: https://openweathermap.org/api
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual key

// Convert Fake Store products to hotel-like data
const productToHotel = (product, index) => {
  const locations = ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth'];
  const locationsSA = ['Cape Town, SA', 'Johannesburg, SA', 'Durban, SA', 'Pretoria, SA', 'Port Elizabeth, SA'];
  
  return {
    id: `api-${product.id}`,
    name: `${product.title} Stay`,
    location: locationsSA[index % locationsSA.length],
    rating: (Math.random() * 1 + 4).toFixed(1), // Random rating between 4.0-5.0
    price: Math.round(product.price * 10), // Convert to realistic hotel prices
    image: { uri: product.image },
    description: product.description,
    category: product.category,
    isApiHotel: true
  };
};

// Fetch recommended hotels from Fake Store API
export const fetchRecommendedHotels = async () => {
  try {
    console.log('🛍️ Fetching recommended hotels from Fake Store API...');
    
    const response = await axios.get(`${FAKE_STORE_API}/products?limit=5`);
    const products = response.data;
    
    // Convert products to hotel format
    const hotels = products.map((product, index) => productToHotel(product, index));
    
    console.log('✅ Recommended hotels fetched:', hotels.length);
    return hotels;
  } catch (error) {
    console.error('❌ Error fetching recommended hotels:', error);
    throw new Error('Failed to load recommended hotels');
  }
};

// Fetch weather data for a location
export const fetchWeatherData = async (city = 'Cape Town') => {
  try {
    console.log('🌤️ Fetching weather data for:', city);
    
    // For demo purposes, using a mock response if no API key
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
      console.log('⚠️ Using mock weather data - add your OpenWeatherMap API key');
      return getMockWeatherData(city);
    }
    
    const response = await axios.get(
      `${OPEN_WEATHER_API}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    const weatherData = {
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      city: response.data.name,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };
    
    console.log('✅ Weather data fetched:', weatherData);
    return weatherData;
  } catch (error) {
    console.error('❌ Error fetching weather data:', error);
    // Return mock data as fallback
    return getMockWeatherData(city);
  }
};

// Mock weather data for demo purposes
const getMockWeatherData = (city) => {
  const mockTemperatures = {
    'Cape Town': 22,
    'Johannesburg': 18,
    'Durban': 25,
    'Pretoria': 19,
    'Port Elizabeth': 21
  };
  
  return {
    temperature: mockTemperatures[city] || 20,
    description: 'Partly cloudy',
    icon: '02d',
    city: city,
    humidity: 65,
    windSpeed: 15
  };
};

// Fetch user data from Fake Store API (for demo purposes)
export const fetchUserData = async (userId = 1) => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};