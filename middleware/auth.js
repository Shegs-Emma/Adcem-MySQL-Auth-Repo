const jwt = require('jsonwebtoken');


module.exports = (req, res, next)=>{
	
	// console.log(req.cookies.auth);
	// console.log(req.cookies);
	
    try{
        // extract token from request
        // const token = req.headers.authorization.split(' ')[1];
		const token = req.cookies.auth;
        // decode the token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // console.log(decodedToken)
        //extract userId
        const userId = decodedToken.userId;
		const admin = req.cookies.userData.isAdmin;
		// const userAdmin = decodedToken.user.isAdmin;
        if(userId && admin === 1){
            next()
        } else{
            // return res.status(401).json({ error: 'Not Authorized'})
			return res.redirect('/show');
        }
    }catch(err){
		req.flash("error", 'Access Denied');
		res.redirect('/login');
        // res.status(401).json({
        //     error: new Error('Invalid request!')
        // });
    };
};