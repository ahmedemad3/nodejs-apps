var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.generateToken = (userId , username , email , fullname , userRoles , userTypeCode)=>{
    var token = jwt.sign({
        userId:userId,
        username:username,
        email: email,
        fullname:fullname,
        roles:userRoles,
        userType : userTypeCode,
    } , process.env.SECRET , {expiresIn :"3d"})
    return token;
}

exports.verifyToken = function(roles){
    return async (req, res, next) => {
        try {
            const {token} = req.headers;
            console.log("token : " + token)
            if(!token){
                console.log("No token exist");
                return res.status(500).send({error : 'Token is not exist'})
            }
            // should validate if loggedIn user has the same role
            var decode = jwt.verify(token , process.env.SECRET);
            console.log("decode:"  + JSON.stringify(decode))
            req.user = {
                userId:decode.userId,
                username:decode.username,
                email: decode.email,
                fullname:decode.fullname,
                roles:decode.roles,
                userType : roles.userType
            }
            console.log("roles : " + roles);
           
            if(!this.hasRole(roles , decode.roles)){
                console.log("Error : not have the same role");
                return res.status(401).send({error : 'Authentication failed'})
            }
            console.log("valid token");
            next();
        } catch (error) {
            next(error);
        }
            
    }
}

exports.hasRole = function(routeRoles , userRoles){
    console.log("routeRoles : " + routeRoles) 
    let result= false;
    userRoles.forEach(role => {
        if(routeRoles.includes(role)){
            result = true;
            return;
        }
    });
    console.log("result : " + result);
    return result;
}

