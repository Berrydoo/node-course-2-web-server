const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, resp, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write to server.log');
        }
    });
    next();
});

// app.use((req, resp, next) => {
//     resp.render('maintenance', {});
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (msg) => {
    return msg.toUpperCase();
});


app.get('/', (req, resp) => {
    resp.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Hi everybody! Welcome to our amazing website!"
    });
});

app.get('/about', (req, resp) => {
    resp.render('about.hbs', {
        pageTitle: 'About Page!',
    });
});

app.get('/bad', (req, resp) => {
    resp.send({
        errorMessage: "Aw snap! That's not good!"
    });
});


app.listen(3000, () => {
    console.log('server running on port 3000');
});
