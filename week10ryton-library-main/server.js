import express from 'express';
import CountBookAPI  from '../views/CountBookAPI.vue';
import WeatherView from '@/views/WeatherView.vue';

const app = express();
const port = process.env.PORT || 3000;
const routes =[
    {
        path: '/CountBookAPI',
        name: 'CountBookAPI',
        component : CountBookAPI
    },
    {
        path: '/WeatherView',
        name: 'WeatherView',
        component : CountBookAPI
    }
]

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});