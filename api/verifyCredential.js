const jwt = require("jsonwebtoken");

const verifytoken = (req, res) => {
    const token = req.cookies.logindata;
    if(!token){
        return res.status(401, "Not authenticated");
    }

    jwt.verify(token, process.env.secretkey, (err, authenticate) => {
        if(err){
            res.status(403, "Invalid token");
        }
        req.authenticate = authenticate;
    })
    res.json("Hello user, you are logged in");
}

const verifyUser = (req, res) => {
    verifytoken(req, res => {
        if(req.authenticate.id === req.params.id || req.user.isAdmin){
            res.status(200).json("Valid");
        }
        else{
            res.status(403, "Not autjorized");
        }
    })
}

module.exports = verifytoken;
module.exports = verifyUser;