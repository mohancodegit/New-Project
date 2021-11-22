const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send({hi: 'there'});
})

const PORT = process.env.PORT || 5000; // for dev there is no env variable so we assign the 5000 bydefault
app.listen(PORT);