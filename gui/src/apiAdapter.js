let API_URL;
const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'development') {
    API_URL = 'http://localhost:8000/api';
} else {
    API_URL = 'https://learn-app-api.herokuapp.com/api';
}
