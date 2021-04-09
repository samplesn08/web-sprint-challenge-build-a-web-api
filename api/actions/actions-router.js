// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { checkActionId, checkActionContents } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Unable to obtain actions" })
        })
});

router.get('/:id', checkActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', checkActionContents, (req, res) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Unable to add the action" })
        })
});

router.put('/:id', checkActionId, checkActionContents, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(editedAction => {
            res.status(200).json(editedAction)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Unable to edit action" })
        })
})

router.delete('/:id', checkActionId, (req, res) => {
    Actions.remove(req.action)
        .then(()=>{
            res.status(200).json({ message: "Action has been deleted" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Unable to delete action" })
        })
});

module.exports = router;