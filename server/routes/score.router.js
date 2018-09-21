const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */


router.get('/', function (req, res) {
    console.log('In GET route');
    // The query we want to run
    const query = 'SELECT "name", "hole_quantity" FROM "course";';
    pool.query(query).then((results) => {
        console.log(results); // This is an object
        res.send(results.rows); // result.rows is an Array of feedback
    }).catch((error) => {
        console.log('Error making GET', error);
        res.sendStatus(500);
    });
}); // END GET ROUTE

/**
 * POST route template
 */
router.post('/', function (req, res) {
    const shoeToAdd = req.body; // This the data we sent
    console.log('In POST route - product:', shoeToAdd); // Has a name, size and cost
    const query = 'INSERT INTO "shoes" ("name", "cost", "size") VALUES ($1, $2, $3);';
    // $ with index (e.g. $1) will help improve the security of your db
    // Avoids SQL injection -- see bobby drop table comic
    pool.query(query, [shoeToAdd.name, shoeToAdd.cost, shoeToAdd.size]).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', function (req, res) {
    console.log('In DELETE route');
    const orderToDelete = req.params.id;
    const query = 'DELETE FROM "?" WHERE "id"=$1;';
    pool.query(query, [orderToDelete]).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);

        res.sendStatus(500);
    });
});

module.exports = router;