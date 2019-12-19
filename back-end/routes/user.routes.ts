import {
         getUserByUsername,
         addUser,deleteUser,updateUser,
         compareCredential} from './../controllers/user.controller';
import { AppUser } from './../models/user.model';
//import { User }  from '../models/user.model';
import * as express from 'express';
import * as  passport from 'passport';
import * as jwt from 'jsonwebtoken';
import * as config  from  '../config/database.config';


//Router definition

export const router = express.Router();


// Signup Route
router.post('/signup', (req, res, next) => {
  let user = new AppUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
  });

  addUser(user, (err, user) => {
    if(err) {
      
      res.json({success: false, msg: 'Unable to signup user, please try agian later!'});
    } else {
      res.json({success: true, msg: 'Congratualtions! You signed up successfuly!'});
    }
  });
});

// Signin route

router.post('/signin', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'Invalid username or password'});
    }
  
  compareCredential(password, user.password, (err, isMatch) => {
      if(err) throw err;
        if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week time
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Invalid username or password'});
      }
    });
  });
});

// Update Profile route
router.put('/update/:id', updateUser);

//Delete Route
 router.delete('/delete/:id', deleteUser)


// View Edit Profile Route
 router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
 });
