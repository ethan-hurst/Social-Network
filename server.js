const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => res.send('What are you looking at'));

app.listen(port, () => console.log(`Server running on port ${port}`));