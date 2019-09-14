const router = require('express').Router();
const Player = require('../models/Player');
//VALIDATION
const Joi = require('@hapi/joi');

const schema = {
    fname: Joi.string()
        .min(6)
        .required(),
    lname: Joi.string()
        .min(6)
        .required(),
    nickname: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email()
};

router.post('/register', async (req, res) => {
    //Validate the data before adding the player.
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);
        
    const player = new Player({
        fname: req.body.fname,
        lname: req.body.lname,
        nickname: req.body.nickname,
        email: req.body.email,
    });
    try{
        const savedUser = await player.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;