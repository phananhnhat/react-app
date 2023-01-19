let globalCities = [];

const fetchCity = new Promise((resolve, reject) => {
  const cities = [
    'Vienna',
    'Ha Noi',
    'San Juan',
    'TP Ho Chi Minh',
    'New York',
  ]
  setTimeout(() => {
    resolve(cities);
  }, 700);
});
export const initializeCityDatabase = async () => {
  globalCities = await fetchCity();
};

export const clearCityDatabase = () => {
  globalCities = [];
}
export const isCity = (cityName) => {
  return globalCities.indexOf(cityName);
}

export const initializeFoodDatabase = async () => {
  // globalCities = await fetchCity();
};
