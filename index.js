const express      = require('express');
const cors         = require('cors');
const corsOptions  = require("./helpers/corsOptions");
const bodyParser   = require('body-parser');
const errorHandler = require('./helpers/error-handler');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use('/api', require('./api'));
app.use(errorHandler);


app.listen(4000, () => {
    console.log('Server is listening on port 4000');
});
