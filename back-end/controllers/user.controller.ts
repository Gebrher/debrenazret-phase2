import { AppUser } from './../models/user.model';
import * as bcrypt from 'bcryptjs';



export const getUserById = function(id, callback) {
    AppUser.findById(id, callback);
  }
  
export const getUserByUsername = function(username, callback) {
    const query = {username: username}
    AppUser.findOne(query, callback);
  }

export const addUser = function(user, callback) {
         bcrypt.hash(user.password, 10, (err, hash) => {
           if(err) throw err;
           user.password = hash;
           user.save(callback);
         });
      
     }
  
  export const deleteUser = function(req, res,next) {
    AppUser.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({success: true, msg: 'User  has been deleted!'})
      }
    })
  }

  export const updateUser = function(req, res, next)  {
    AppUser.findByIdAndUpdate(req.params.id, {
         $set: req.body
       }, (error, data) => {
         if (error) {
           console.log(error);
           return next(error);
         } else {
          res.status(200).json({success: true, msg: 'User has been updated!'})
         }
      })
    }
    
  export const compareCredential = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }