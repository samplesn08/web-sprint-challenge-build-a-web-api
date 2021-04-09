const Projects = require('../projects/projects-model');
const Actions = require('../actions/actions-model');

const checkProjectId = async (req, res, next) => {
    const {id} = req.params 
    try{
        const project = await Projects.get(id)
        if(!project){
            res.status(404).json({ message: "No project with that ID found" })
        }else{
            req.project = project
            next()
        }
    }catch(err){
        res.status(500).json(err.message)
    }
}

const checkProjectContents = (req, res, next) => {
    const {id} = req.params;
    Projects.get(id)
        .then(project => {
            if(!project.name || !project.description) {
                res.status(400).json({ message: "Name and description are required" })
            }else{
                next()
            }
        })
}

const checkActionId = async (req, res, next) => {
    const {id} = req.params;
    try{
        const action = await Actions.get(id)
        if(!action){
            res.status(404).json({ message: "No action with that ID found" })
        }else{
            req.action = action;
            next()
        }
    }catch(err){
        res.status(500).json(err.message)
    }
}

const checkActionContents = (req, res, next) => {
    const {id} = req.params;
    Actions.get(id)
        .then(action => {
            if(!action.description || !action.notes) {
                res.status(400).json({ message: "Description and notes are required" })
            }else{
                next()
            }
        })
}

module.exports = {
    checkProjectId,
    checkProjectContents,
    checkActionId,
    checkActionContents
}