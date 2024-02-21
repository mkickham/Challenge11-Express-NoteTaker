// this establishes my routes to the server
const express = require('express');
const indexRoutes = require('./Routes/index-routes')
const apiRoutes = require('./Routes/api-routes')

const PORT = process.env.PORT || 3001;

const app = express();

// this is the midleware that runs express
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(indexRoutes)
app.use(apiRoutes)

app.listen(PORT, () => {
    console.log(`Server is runnong on http://localhost:${PORT}`);
})