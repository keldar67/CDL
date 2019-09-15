const router = require('express').Router();
const Player = require('../models/Player');
const bcrypt = require('bcryptjs');
const { registervalidation, loginvalidation } = require('../validation');

//REGISTER
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
        res.send({ player: player._id });
    }catch(err){
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //Validate the data before adding the player.
    const { error } = loginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    const player = await Player.findOne({email: req.body.email});
    if(!player) return res.status(400).send('Player: playername or password incorrect');

    //If password is correct
    const validpass = await bcrypt.compare(req.body.password, player.password);
    if(!validpass) return res.status(400).send('Password: playername or password incorrect');

    res.send('You are logged in!')

});
module.exports = router;