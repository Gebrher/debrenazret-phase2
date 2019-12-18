import { User } from './user';
import {model, Schema} from 'mongoose';
import * as mongoose from 'mongoose';

// User Schema
const UserSchema = new Schema<User> ({

  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: false
  },
  email:{
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
});

export const AppUser  =  model('AppUser', UserSchema);

