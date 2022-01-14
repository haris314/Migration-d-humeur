const skeleton = {
  mood: "",
  photos: [],
  rating: 0,
  symptoms: [],
  activities: [],
  medications: [],
  emotionsFelt: [],
  optionalDescription: "",
  timestamp: 0,
  socialInteractions: [],
  isSpecialDay: false,
  isPhotoOfTheDayEntry: false,
  location: {
    locationId: null,
    locationName: null,
    latitude: null,
    longitude: null,
    locationProvider: null,
  },
  weather: {
    icon: null,
    humidity: null,
    windGust: null,
    windSpeed: null,
    cloudCover: null,
    temperature: null,
    precipIntensity: null,
    unitOfMeasurement: null,
    nearestStormDistance: null,
  },
};

module.exports = skeleton;
