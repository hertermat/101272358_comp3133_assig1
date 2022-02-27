const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const webToken = require('jsonwebtoken');



module.exports = {
    createUser: (args) => {
        return User.findOne({email:args.userInput.email, username:args.userInput.username})
        .then(user => {
            if(user.email) {
                throw new Error ('This email is already in the database')
            }
            else if(user.username){
                throw new Error ('This user name is already in use')
            }

            return bcrypt.hash(args.userInput.password, 12)
        })
        .then(hashedPassword => {
            const user = new User({
                username: args.userInput.username,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                userType: args.userInput.userType,
                password: hashedPassword
            });
            return user.save();
        })
        .then(result => {
            return {...result._doc, password: null, _id: result.id};
        })
        .catch(err => {
            throw err;
        });
    },
    
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('Invalid Credentials')
        }
        const passwordValidation = await bcrypt.compare(password, user.password);
        if(!passwordValidation){
            throw new Error('Invalid Credentials')
        }

        const token = webToken.sign({userId: user.id, email: user.email}, 'justHopeThisAuthenticationWorks',{
            expiresIn: '1h'
        });
        return {userId: user.id, token: token,tokenExpiration: 1}


    }
};