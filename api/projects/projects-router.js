// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { checkProjectId } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error retrieving projects data" })
        })
});

router.get('/:id', checkProjectId, (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Project could not be found with that ID" })
        })
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error adding new project" })
        })
});

router.put('/:id', checkProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(editedProject => {
            res.status(200).json(editedProject)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error updating the project" })
        })
});

router.delete('/:id', checkProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Project has been deleted" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Unable to delete project" })
        })
});

router.get('/:id/actions', checkProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error getting actions for that project" })
        })
})

module.exports = router;