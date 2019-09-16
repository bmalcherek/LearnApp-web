let API_URL;
const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'development') {
    API_URL = 'http://localhost:8000/api/';
} else {
    API_URL = 'https://learn-app-api.herokuapp.com/api/';
}

function getApiUrl() {
    console.log(API_URL);
    if (nodeEnv === 'development') {
        return 'http://localhost:8000/';
    } else {
        return 'https://learn-app-api.herokuapp.com/';
    }
}

