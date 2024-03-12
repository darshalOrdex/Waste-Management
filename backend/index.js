const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
require('dotenv').config();

connectToMongo();
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/admin",require("./routes/admin"));
app.use("/driver",require("./routes/driver"));
app.use("/bin",require("./routes/bin"));
// app.use("/verify",require("./routes/verify"))

app.listen(port, () => {
  console.log(`Backend on http://localhost:${port}`)
})