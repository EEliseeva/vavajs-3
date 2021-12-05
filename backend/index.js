
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const port = 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Client } = require("pg");

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: "password",
    port: 5432
});

client.connect(err => {
    if (err) throw err;
})

//Express route definitions
app.get("/", (req, res) => {
    res.send("Main page");
});

// get the values
app.get("/products", (req, res) => {
    console.log("STARTED QUERY /products")
    client.query('SELECT * FROM public.products', (err, result) => {
        console.log("FINISHED QUERY /products")
        if (err) {
            console.log("ERROR /products")
            throw error;
        }
        res.status(200).json(result.rows);
    });
});

app.get("/ad", (req, res) => {
    client.query('SELECT * FROM public.ad LIMIT 1', (err, result) => {
        console.log("FINISHED GET QUERY /ad")
        if (err) {
            console.log("ERROR /ad")
            throw err;
        }
        console.log(result.rows[0]);
        res.status(200).json(result.rows[0]);
    });
})

app.post("/adP", (req, res) => {
    client.query(`UPDATE public.ad SET pocitadlo=${req.body.pocitadlo + 1} WHERE id=${req.body.id}`, (err, result) => {
        console.log("FINISHED POST QUERY /ad")
        if (err) {
            console.log("ERROR /ad")
            res.status(400);
            throw err;
        }
        res.status(200);
    });
})

// now the post -> insert value
app.post("/order", async (req, res) => {
    console.log(req.body);
    console.log(req.body.items);
    for (var item of req.body.items){
        delete item['inCart'];
        delete item['id'];
        delete item['price'];
        delete item['img'];
    }
    var items = JSON.stringify(req.body.items);
    console.log(items)
    var query = `INSERT INTO public.customers (email, meno, adresa) VALUES ('${req.body.email}', '${req.body.name}', '${req.body.address}');`;
    client.query(query, (errCust, resCust) => {
        console.log("FINISHED CUSTOMERS QUERY /orders")
        if (errCust) {
            console.log("ERROR /orders")
            throw errCust;
        }
        client.query(`SELECT id FROM public.customers WHERE email='${req.body.email}'`, (errId, resID) => {
            console.log("FINISHED ID QUERY /orders")
            if (errId) {
                console.log("ERROR /orders")
                throw errId;
            }
            client.query(`INSERT INTO public.orders (stav, customer_id, produkty) VALUES ('accepted', '${resID.rows[0].id}', '${items}')`, (errItem, resItem) => {
                console.log("FINISHED INSERT QUERY /orders")
                if (errItem) {
                    console.log("ERROR /orders")
                    throw errItem;
                }
                res.status(200);
            })
        })
    });
});

app.listen(port, err => {
    console.log(`Listening on ${port}`);
});
