const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 메모리 데이터
let items = [
    {
        id: 1,
        name: "Apple",
        description: "Red Apple"
    },
    {
        id: 2,
        name: "Banana",
        description: "Yellow Banana"
    }
];

let nextId = 3;

/**
 * GET /
 */
app.get("/", (req, res) => {
    res.json({
        message: "Node REST API Server",
        endpoints: {
            health: "GET /health",
            list: "GET /items",
            get: "GET /items/:id",
            create: "POST /items",
            update: "PUT /items/:id",
            delete: "DELETE /items/:id"
        }
    });
});

/**
 * HEALTH CHECK
 * GET /health
 */
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

/**
 * CREATE
 * POST /items
 */
app.post("/items", (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "name is required"
        });
    }

    const item = {
        id: nextId++,
        name,
        description: description || ""
    };

    items.push(item);

    res.status(201).json(item);
});

/**
 * READ ALL
 * GET /items
 */
app.get("/items", (req, res) => {
    res.json(items);
});

/**
 * READ ONE
 * GET /items/:id
 */
app.get("/items/:id", (req, res) => {
    const id = Number(req.params.id);

    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    res.json(item);
});

/**
 * UPDATE
 * PUT /items/:id
 */
app.put("/items/:id", (req, res) => {
    const id = Number(req.params.id);

    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    const { name, description } = req.body;

    if (name !== undefined)
        item.name = name;

    if (description !== undefined)
        item.description = description;

    res.json(item);
});

/**
 * DELETE
 * DELETE /items/:id
 */
app.delete("/items/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    const deleted = items.splice(index, 1);

    res.json({
        message: "Deleted successfully",
        item: deleted[0]
    });
});

/**
 * 404
 */
app.use((req, res) => {
    res.status(404).json({
        message: "API Not Found"
    });
});

/**
 * Start
 */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
