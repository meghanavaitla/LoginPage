const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../backend/models/user')
const config = require('../config/database');

//register
router.post('/register', (req,res,next) => 
{
    let newUser= new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err,user) => {
        if(err)
        res.json({success:false, msg: 'failed to register user'});
        else
        res.json({success:true, msg: 'user registered'});
    });
});
//authenticate
router.post('/authenticate', (req,res,next) => 
{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) => 
    {
        if(err)
        throw err;
        if(!user)
        return res.json({success:false, msg: 'user not found'})
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err)
            throw err;
            if(isMatch)
            {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800
                });
                res.json({succes:true, token: 'Bearer '+token, user: {
                    id: user._id,
                    name: user.name,
                    useranme: user.username,
                    email: user.email
                }});
            }
            else{
                return res.json({success:false, msg: 'wrong pwd'});
            }
        });
    });
});
//profile
router.get('/profile', passport.authenticate('jwt', {session:false}) ,(req,res,next) => 
{
    res.json({user: req.user});
});
/*validate
router.get('/validate', (req,res,next) => 
{
    res.send('VALIDATE');
});*/
module.exports = router;