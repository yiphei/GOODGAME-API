import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */

dotenv.config({ silent: true });

// functions we call for express routes: /signin /signup

// We’re verifying username/password with a passport middleware
// so our signin function will already be protected.
// Our signin function returns a new token
export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

// verify the user doesn't exist in the system already aka check their email address
// if they dont exist, create a new User object and save it
export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('req.body ', req.body);
  console.log('email ', email, ' password ', password);

  // user must give email and password
  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  const query = { email };
  User.findOne(query)
    .then((result) => {
      // check if user exists
      console.log('signup result ', result);
      if (result !== null) {
        // user exists
        return res.status(500).send('User with this email already exists');
      } else {
        // user does not exist: create new user
        const user = new User();
        user.email = email;
        user.password = password;

        // Save the new User object
        user.save()
          .then((saveResult) => {
            console.log('user.save ');
            // return a token same as you did in in signin
            console.log('user ', user);
            // console.log('req.user ', req.user);
            res.send({ token: tokenForUser(user) });
            // res.send({ token: tokenForUser(req.user) });
          })
          .catch((error) => {
            console.log('user.save error ');
            res.status(600).json({ error });
          });
      }
    }).catch((error) => {
      console.log('signup error');
      res.status(500).json({ error });
    });
};

// helper function: encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
