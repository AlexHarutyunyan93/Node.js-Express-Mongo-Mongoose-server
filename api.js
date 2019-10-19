const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const cors = require('cors');

const { Dresses, upload, HomePage, aboutCompany } = require('./dresses');
const { formatDate, getCallerIP, searchEngine } = require('./helpers');

const whitelist = ["http://localhost:3000"];
const corsOptions = {origin: (origin, callback) => {
        if(whitelist.indexOf(origin) != -1) {
            callback(null, true)
        } else {
            callback(new Error( "Not allowed by CORS"))
        }
    }
};

//////////////GET ITEMS////////////////////////
router.get('/search/', (req, res) => {
    const q = req.query.searching;
    Dresses.find({})
        .then(dresses => {
            res.send(dresses.filter(e => {
                let obj = {
                    title: e.title,
                    description: e.description,
                    feutures: e.feutures
                };
               return searchEngine(obj, q)
            }))
        });

});

router.get('/product/:id', (req, res) => {
    const currentLanguage = req.query.language;
    Dresses.findOne({ _id: req.params.id })
        .then(data => {
            data.title = data.title[currentLanguage];
            data.description = data.description[currentLanguage];
            data.feutures = data.feutures[currentLanguage];
            data.feutures = JSON.parse(data.feutures[0]);
            res.send(data);

        });
});

router.get('/items/', (req, res) => {
    const category = req.query.category;
    const currentLanguage  = req.query.language;
    if(category == 4) { /// Get data for Home page ///
        HomePage.findOne({})
            .then(data => {
                Dresses.find({})
                    .then(dresses => {
                        if(data.newCollection.length === 0 && data.newCollection.length === 0) {
                            for(let i = 0; i < 6; i++) {
                                data.newCollection[i] = dresses[i];
                                data.sellOut[i]       = dresses[i];
                            }
                        } else {
                            data.newCollection =  dresses.filter(e => data.newCollection.includes(e._id));
                            data.sellOut       =  dresses.filter(e => data.sellOut.includes(e._id));
                        }
                         res.send(data)
                    });
            })
    } else {
        Dresses.find({})  /// Get dresses by category
            .then(items => {
                const filteredByCategory = items.filter( e => e.category == category);
                filteredByCategory.forEach(e => {
                    e.title = e.title[currentLanguage];
                    e.description = e.description[currentLanguage];
                    e.feutures = e.feutures[currentLanguage];
                });
                res.send(filteredByCategory);
            })
    }
});

////// PUT Item /////

router.put('/product/:id', cors(corsOptions), (req, res) => {
    Dresses.findByIdAndUpdate({ _id: req.params.id }, req.body )
        .then(() => {
            Dresses.findOne({ _id: req.params.id })
                .then(dress => {
                    res.send(dress)
                });
        });
});
///// Delete Item  /////

router.delete('/product/:id', cors(corsOptions), (req, res) => {
    const path = "http://localhost:4000/";
    Dresses.findOne({ _id: req.params.id })
        .then(data => {
            data.imageUrls.forEach(e => {
                const ur = e.replace(path,'./public/');
                fs.unlinkSync(ur)
            });
            Dresses.deleteOne({ _id: req.params.id })
                .then( res => console.log(res))
        });
});

router.post('/home',(req, res) => {
    HomePage.create(req.body)
        .then(data => res.send(data))
});
router.post('/about', (req, res) => {
    const {ru, en, am} = req.body;
    aboutCompany.create({ru, en, am})
});

router.post('/add-product', cors(corsOptions), upload, ({body, files}, res) => {
    if (!body) return res.sendStatus(400);

        const dateOfRes = formatDate(new Date());
        const imageUrls = files.map(({ filename }) => `http://localhost:4000/uploads/items/${filename}`);
        const {
            category,
            title,
            price,
            discount,
            description,
            feutures,
        } = body;

        Dresses.create({
            category,
            title,
            price,
            discount,
            description,
            imageUrls,
            dateOfRes,
            feutures,
        }).then(data => {
            res.send(data);
        }).catch(() => {
            res.sendStatus(500);
        });
});

module.exports = router;
