const Projects = require('../projects/projects-model')

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

module.exports = {
    checkProjectId,
}