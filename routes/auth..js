const router = require('express').Router();
const Player = require('../models/Player');
const bcrypt = require('bcryptjs');
const { registervalidation } = require('../validation');

router.post('/register', async (req, res) => {
    //Validate the data before adding the player.
    const { error } = registervalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    const playerexists = await Player.findOne({email: req.body.email});
    if(playerexists) return res.status(400).send('Player with this email address already exists, please login.');

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const player = new Player({
        fname: req.body.fname,
        lname: req.body.lname,
        nickname: req.body.nickname,
        email: req.body.email,
        password: hashedpassword,
    });
    try{
        const savedUser = await player.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;