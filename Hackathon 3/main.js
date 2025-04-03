const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Path to the JSON file
const DATA_FILE = './data.json';

// Helper function to read data from the JSON file
const readData = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// GET /api/items - Retrieve all items
app.get('/api/items', (req, res) => {
    const items = readData();
    res.json(items);
});

// GET /api/items/:id - Retrieve an item by its ID
app.get('/api/items/:id', (req, res) => {
    const items = readData();
    const item = items.find((i) => i.id === req.params.id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

// POST /api/items - Create a new item
app.post('/api/items', (req, res) => {
    const items = readData();
    const newItem = req.body;
    newItem.id = (items.length + 1).toString(); // Generate a new ID
    items.push(newItem);
    writeData(items);
    res.status(201).json(newItem);
});

// PUT /api/items/:id - Update an existing item
app.put('/api/items/:id', (req, res) => {
    const items = readData();
    const index = items.findIndex((i) => i.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    items[index] = { ...items[index], ...req.body };
    writeData(items);
    res.json(items[index]);
});

// DELETE /api/items/:id - Delete an item
app.delete('/api/items/:id', (req, res) => {
    const items = readData();
    const index = items.findIndex((i) => i.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const deletedItem = items.splice(index, 1);
    writeData(items);
    res.json(deletedItem);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});