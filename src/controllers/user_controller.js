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
  const handle = req.body.handle;
  console.log('req.body ', req.body);
  console.log('email ', email, ' password ', password, ' handle ', handle);

  // user must give email and password
  if (!email || !password || !handle) {
    return res.status(422).send('You must provide email, password, and handle');
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
        // now check if the handle is unique. if not, return error;

        // user does not exist: create new user
        const user = new User();
        user.email = email;
        user.password = password;
        user.handle = handle;
        user.games = [];

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

// // update player's list of games
// export const updateUserGames = (req, res) => {
//   // A.findOneAndUpdate(conditions, update)
//   // console.log('req.params', req.body);
//   const query = { _id: req.params.id }; // game id
//   // const update = req.body;
//
//   // if game is in games list, ignore
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Browser_compatibility
//   if (req.user.games.includes(req.params.id)) {
//     return res.status(500).send('User is already in this game');
//   } else {
//     // if user not in players_list, add player to the list
//     req.body.games.push(req.params.id); // add game to games list
//     const update = req.body;
//
//     User.findOneAndUpdate(query, update)
//       .then((result) => {
//         // console.log('success');
//         // console.log(result);
//         res.send(result);
//       }).catch((error) => {
//         // console.log('error');
//         // console.log(error);
//         res.status(500).json({ error });
//       });
//   }
// };


// http://mongoosejs.com/docs/api.html#findbyid_findById
export const getUser = (req, res) => {
  // console.log(req.params.id);
  console.log('in API getUser');
  console.log(req.user);
  User.findById(req.user._id)
    .then((result) => {
      console.log('getUser success');
      // console.log('success');
      // console.log(result);
      res.send(result);
    }).catch((error) => {
      // console.log('error');
      // console.log(error);
      res.status(500).json({ error });
    });
};


export const addGame = (req, res) => {
  // A.findOneAndUpdate(conditions, update)
  // console.log('req.params', req.body);
  const query = { _id: req.user._id };
  console.log('In AddGame API');
  console.log(req.user);
  console.log(req.body);


  if (req.user.games.indexOf(req.body.id) >= 0) {
    return res.status(500).send('User has already this game');
  } else {
    console.log(' User not in game');

    // const update = req.user;
    req.user.games.push(req.body);

    // Object.assign({}, req.user, update);

    User.findOneAndUpdate(query, req.user)
      .then((result) => {
        console.log('success');
        console.log(result);
        res.send(result);
      }).catch((error) => {
        console.log('Add game to user not successful');
        console.log(error);
        res.status(500).json({ error });
      });
  }
};
