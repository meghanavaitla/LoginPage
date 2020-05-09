const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs');
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }

    }
);
const User = mongoose.model('User',UserSchema);
module.exports = User;

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}
module.exports.getUserByUsername = function(username, callback){
    const query = { username: username}
    User.findOne(query, callback);
}
module.exports.addUser = function(newUser, callback){
   bcrpyt.genSalt(10, (err,salt) =>  {
       bcrpyt.hash(newUser.password, salt, (err, hash) =>{
        if(err) 
        throw err;
       newUser.password = hash;
        newUser.save(callback);
       });
    });
       
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
bcrpyt.compare(candidatePassword, hash, (err, isMatch) =>
{
 if(err)
 throw err;
 callback(null, isMatch);
});
}