
exports.checkLogin = (req, res,next) => {

    if (req.cookies.us) {
        next();     //If session exists, proceed to page
      } else {
        var err = new Error("Not logged in!");
    
        res.redirect('/home/login');
        //next(err);  //Error, trying to access unauthorized page!
      }
};

exports.getContext = (req) => {

   return req.cookies.us;
};