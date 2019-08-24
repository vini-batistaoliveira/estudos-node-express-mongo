const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const Anotation = require('../models/Anotation');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {

        //populate tras as informacoes relacionadas, EAGER LOAD
        const anotation = await Anotation.find().populate(['user']);

        return res.send({ anotation });

    } catch (error) {
        return res.status(400).send({ error: 'Error listing anotation' });
    }
});

router.get('/:anotationId', async (req, res) => {
    try {

        //populate tras as informacoes relacionadas, EAGER LOAD
        const anotation = await Anotation.findById(req.params.anotationId).populate(['user']);

        return res.send({ anotation });

    } catch (error) {
        return res.status(400).send({ error: 'Error listing anotation' });
    }
});

//create
router.post('/', async (req, res) => {

    try {

        const { title, description } = req.body;

        const anotation = await Anotation.create({ title, description, user: req.userId });

        await anotation.save();

        return res.send({ anotation });

    } catch (error) {
        return res.status(400).send({ error: 'Error creating new anotation' });
    }

});

router.put('/:anotationId', async (req, res) => {
    try {

        const { title, description } = req.body;

        const anotation = await Anotation.findByIdAndUpdate(req.params.anotationId , {
             title, description 
        }, {new: true }); //new true, retorna o objeto já atualizado

        await anotation.save();

        return res.send({ anotation });

    } catch (error) {
        return res.status(400).send({ error: 'Error updating anotation' });
    }
});

router.delete('/:anotationId', async (req, res) => {
    try {

        const anotation = await Project.findByIdAndRemove(req.params.anotationId);

        return res.send();

    } catch (error) {
        return res.status(400).send({ error: 'Error deleting anotation' });
    }
});

module.exports = app => app.use('/anotations', router);