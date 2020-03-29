const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ShortUrl = require('./models/shorturl');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get('/', async (req, res) => {
    const shorturls = await ShortUrl.find();
    res.render('index', { shorturls: shorturls });
});


app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({
        fullUrl: req.body.fullUrl
    });
    res.redirect('/');
});

// App is working just fine


app.get('/:shortUrl', async (req, res) => {
    const shorturl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
    if(shorturl == null) return res.sendStatus(404);

    shorturl.clicks++;
    shorturl.save();
    res.redirect(shorturl.fullUrl)
});






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));