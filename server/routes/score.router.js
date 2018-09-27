const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', function (req, res) {
    console.log('In GET route');
    // The query we want to run
    const query = 'SELECT "id", "name", "hole_quantity" FROM "course";';
    pool.query(query).then((results) => {
        console.log(results); // This is an object
        res.send(results.rows); // result.rows is an Array of feedback
    }).catch((error) => {
        console.log('Error making GET', error);
        res.sendStatus(500);
    });
}); // END GET ROUTE

// THIS IS A GET ON p1Score from round

router.get('/p1score', function (req, res) {
    console.log('In GET route');
    // The query we want to run
    const query = 'SELECT * FROM "round";';
    pool.query(query).then((results) => {
        console.log(results); // This is an object
        res.send(results.rows); // result.rows is an Array of feedback
    }).catch((error) => {
        console.log('Error making GET', error);
        res.sendStatus(500);
    });
}); // END GET ROUTE

router.get('/myInfoOnScore/:id', function (req, res) {
    if (req.isAuthenticated()) {
        console.log('In get myInfoOnScore');
        const query = `SELECT "round"."my_score", "round"."timestamp", "course"."name" FROM "round"
        JOIN "course" ON "course"."id" = "round"."course_id"
        WHERE "course_id" = $1 AND "round"."user_id" = $2;`;
        pool.query(query, [req.params.id, req.user.id]).then((results) => {
            console.log(results);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error making /myInfoOnScore get', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
    
})

/**
 * POST route template
 */
router.post('/', function (req, res) {
    const courseToAdd = req.body; // This the data we sent
    console.log('In POST route - product:', courseToAdd); // Has a name, and hole quantity
    const query = 'INSERT INTO "course" ("name", "user_id", "hole_quantity") VALUES ($1, $2, $3);';
    // $ with index (e.g. $1) will help improve the security of your db
    // Avoids SQL injection -- see bobby drop table comic
    pool.query(query, [courseToAdd.name, req.user.id, courseToAdd.hole_quantity]).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});

router.post('/p1Score', function (req, res) {
    const p1ScoreToAdd = req.body; // This the data we sent
    console.log('In POST route - p1ScoreToAdd:', p1ScoreToAdd); // Has a name, and hole quantity
    const query = 'INSERT INTO "round" ("course_id", "user_id", "my_score") VALUES ($1, $2, $3);';
    // $ with index (e.g. $1) will help improve the security of your db
    // Avoids SQL injection -- see bobby drop table comic
    pool.query(query, [p1ScoreToAdd.course_id, req.user.id, p1ScoreToAdd.my_score]).then(() => {
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