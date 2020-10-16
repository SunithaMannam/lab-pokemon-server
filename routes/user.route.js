

const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model')
const Session = require('../models/Session.model')

/**  ============================
 *          SignUp Router   
 *   ============================
*/
router.post("/signUp", (req, res) => {
    console.log("route => /signUp: " ,req.body);
    const { username, email, address, password } = req.body;

    // check whether username, password, eamil are empty or not
    if(!username || !email || !password){
        return res.status(200).json({errorMessage:"Fields Username, Email, Password are mandatory!"})
    }
    // check for the password strength
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if( regex.test(password)){
       return  res.status(200).json({errorMessage:"Entered password is invalid"})
    }
    // get the password hash 
    bcryptjs.genSalt(saltRounds)
    .then( salt => bcryptjs.hash(password,salt))
    .then( passwordHash => {
        User.create({username,email,address,passwordHash})
        .then(userFromDB => {
            Session.create({userId:userFromDB._id,createdAt:Date.now()})
            .then( sessionfromDB => {
                return res.status(200).json({ accessToken: sessionfromDB._id, userFromDB })
            })
        }).catch(error => {
            console.log("error-4");
            if (error.code === 11000) {
                console.log("error-2")
                return res.status(200).json({
                    errorMessage:
                        "Username and email need to be unique. Either username or email is already used.",
                });
            }
            })
    })
    .catch(error => {   
        if (error instanceof mongoose.Error.ValidationError) {
        console.log("error-1")
       return  res.status(200).json({ errorMessage: error.message });
    } else if (error.code === 11000) {
        console.log("error-2")
        return res.status(200).json({
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
    } else {
        console.log("error-3")
        return res.status(500).json({ errorMessage: error });
      }}) // End of catch 
});


/**  ============================
 *          Login Router   
 *   ============================
*/
router.post("/login", (req, res) => {
    console.log("route => /login: " ,req.body);
    const {email,password} = req.body;

    // check whether username, password, eamil are empty or not
    if( !email || !password){
        return res.status(200).json({errorMessage:"Fields  Email, Password are mandatory!"})
    }

    User.findOne({email})
    .then( userFromDB => {
        if(!userFromDB){
            return res.status(200).json({errorMessage: "Email is not registered with the App"});
        } 
        if(bcryptjs.compareSync(password, userFromDB.passwordHash)){
            Session.create({userId:userFromDB._id, createdAt:Date.now() })
            .then( session => {
                if(session){
                    return res.status(200).json({ accessToken: session._id,userFromDB})
                }
            })
        }else{
            return res.status(200).json({errorMessage: "Entered password is invalid"});
        }
    }).catch( error =>  console.log( error))
})


/**  ============================
 *          Logout Router   
 *   ============================
*/
router.delete("/logout/:id", (req, res) => {
    
    console.log("route => /logout: " ,req.params);
    const {accessToken} = req.params;

    Session.deleteOne({  userId: accessToken,})
    .then((session) => {
      res.status(200).json({ success: "User was logged out" });
    })
    .catch((error) => res.status(500).json({ errorMessage: error }));
})

/**  ============================
 *          Validate session token Router   
 *   ============================
*/
router.get("/session/:accessToken", (req, res) => {
  const { accessToken } = req.params;
  Session.findById({ _id: accessToken }).populate("userId").then((session) => {
    if (!session) {
      res.status(200).json({
        errorMessage: "Session does not exist",
      });
    } else {
      res.status(200).json({
        session
      });
    }
  })
  .catch(err => res.status(500).json({errorMessage: err}))
});

/**  ============================
 *        delete session  
 *   ============================
*/
router.delete("/session/:accessToken", (req, res) => {
    Session.findByIdAndDelete({ _id: req.params.accessToken })
        .then(response => {
            res.status(200).json({success:"Access Token deleted"})
        }).catch(err => res.status(500).json({err}))
});
/** ================   */
module.exports = router;