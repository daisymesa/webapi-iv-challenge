const express = require('express');
const Data = require('./data/db');

const router = express.Router();

// 1. Creates a post using the information sent inside the request body.
router.post('/', async (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            errorMessage: 'Please provide title and contents for this post.'
        })
    } else {
        db.insert({ title, contents })
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({ error: 'There was an error while saving the post to the database.' })
            })
    }
})

// 2. Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', async (req, res) => {
    const id = req.params.id;
    const text = req.params.text;
    if (!id) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    } else if (!text) {
        res.status(400).json({ errorMessage: 'Please provide text for the comment.' })
    } else {
        db.insertComment(comment)
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error saving the comment to the database.' })
        })
    }

})

// 3. Returns an array of all the post objects contained in the database.
router.get('/', async (req, res) => {
    db.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error: 'The posts information could not be retrieved.' }))
})

// 4. Returns the post object with the specified id.
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(id => {
            if (id) {
                db.findById(id)
                    .then(id => {
                        res.status(200).json(id);
                    });
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The post information could not be retrieved.' }))
})

// 5. Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', async (req, res) => {
    const id = req.params.id;
    db.findCommentsById(id)
        .then(id => {
            if (id) {
                db.findCommentsById(id)
                    .then(id => {
                        res.status(200).json(id);
                    });
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The comments information could not be retrieved.' }))
})

// 6. Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(id => {
            if (id) {
                res.sendStatus(204).end()
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The post could not be removed.' }))
})

// 7. Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!id) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    } else if (!req.body) {
        res.status(400).json({ errorMessage: 'Please provide the title and contents for this post.' })
    } else {
        db.update(id, changes)
        .then (post => {
            res.status(200).json()
        })
        .catch(error => res.status(500).json({ error: 'The post information could not be modified.' }))
    }
})


module.exports = router;