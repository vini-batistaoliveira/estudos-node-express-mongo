const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {

        //populate tras as informacoes relacionadas, EAGER LOAD
        const projects = await Project.find().populate(['user', 'tasks']);

        return res.send({ projects });

    } catch (error) {
        return res.status(400).send({ error: 'Error listing projects' });
    }
});

router.get('/:projectId', async (req, res) => {
    try {

        //populate tras as informacoes relacionadas, EAGER LOAD
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error listing projects' });
    }
});

//create
router.post('/', async (req, res) => {

    try {

        const { title, description, tasks } = req.body;

        const project = await Project.create({ title, description, user: req.userId });

        //Espera a resolucao de todas as promises
       await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();
           
            project.tasks.push(projectTask);

        }));

        await project.save();

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error creating new project' });
    }

});

router.put('/:projectId', async (req, res) => {
    try {

        const { title, description, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId , {
             title, description 
        }, {new: true }); //new true, retorna o objeto já atualizado

        project.tasks = [];
        await Task.remove({ project: project._id});
        
        //Espera a resolucao de todas as promises
       await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();
           
            project.tasks.push(projectTask);

        }));

        await project.save();

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error updating project' });
    }
});

router.delete('/:projectId', async (req, res) => {
    try {

        const project = await Project.findByIdAndRemove(req.params.projectId);

        return res.send();

    } catch (error) {
        return res.status(400).send({ error: 'Error listing projects' });
    }
});

module.exports = app => app.use('/projects', router);