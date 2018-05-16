import mongoose, { Schema } from 'mongoose';
import bcryptjs from 'bcryptjs'; // for salt + hash
/* eslint-disable consistent-return */

// create a UserSchema with email and password fields
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  handle: { type: String },
});

// provides a mapping to id from _id,
// might need later if you want to link to users.
UserSchema.set('toJSON', {
  virtuals: true,
});

// mongoose pre save hook for saving password
// define function that is called when User object is saved
// function takes the plain text password and generates a salt+hash password
// saves salt+hash instead of plaintext password
UserSchema.pre('save', function beforeUserSave(next) {
  // the function runs in some other context so DO NOT bind it
  const user = this; // this is a reference to our model

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) { // if (!user.isModified('password')) return next();
    console.log('password not modified');
    return next();
  } else {
    console.log('password modified');
    // https://github.com/dcodeIO/bcrypt.js
    bcryptjs.genSalt(10, (err, salt) => { // generate salt
      // hash user.password with the salt
      // syntax: hash(string to hash, salt, callback, progressCallback=)
      bcryptjs.hash(user.password, salt, (err, hash) => {
        // Store hash in your password DB.
        // overwrite plain text password with encrypted password
        user.password = hash;
        console.log('hash error ', err);
        if (err) {
          return next(err);
        } else {
          return next();
        }
      });
    });
  }
});

// Comparing Salt+Hash
//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  console.log('in comparePassword');
  // is this the right way to get the hash? this.password
  bcryptjs.compare(candidatePassword, this.password) // this.password is the hash
    .then((res) => { // success
      return callback(null, res);
    }).catch((error) => {
      callback(error);
    });
};

// Saving Salt+Hash
// create UserModel class from schema
// needs to go after the schema otherwise comparepassword will not be saved as part of user model??
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
