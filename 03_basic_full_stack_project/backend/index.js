import express from 'express'; // module js
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

// get a list of 5 jokes

app.get('/api/jokes', (req, res) => {
    const jokes = [
        { id: 1, joke: 'What do you call a very small valentine? A valen-tiny!' },
        { id: 2, joke: 'What did the dog say when he rubbed his tail on the sandpaper? Rough, rough!' },
        { id: 3, joke: 'Why don\'t sharks like to eat clowns? Because they taste funny!' },
        { id: 4, joke: 'What did the painter do at the art show? He drew a lot of attention!' },
        { id: 5, joke: 'What is a frog\'s favorite outdoor sport? Fly fishing!' }
    ];

    res.send(jokes);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});