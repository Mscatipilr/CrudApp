const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let items = [];
let currentId = 1;

//Welcome Page
app.get('/', (req, res) => {
    res.send(`<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.0.0/css/all.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
                <h2 style="color: purple; text-align: center;">The <i>purple!</i> Data Shop</h2>
                <div style="        height: 100vh;
        background-image: url('https://mdbootstrap.com/img/Photos/Others/images/77.jpg');
        background-repeat: no-repeat;
        background-size: 750px;
        background-position: center;
        color: white;" >
        </div>
    `)
});

//add items
app.post('/items', (req, res) => {
    const newItem = {
        id: currentId++,
        ...req.body
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json(item);
});
//update items
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    Object.assign(item, req.body);
    res.json(item);
});

//delete items
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});