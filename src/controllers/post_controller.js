// contains the main functionality for our API
import Post from '../models/post_model';
// import User from '../models/user_model';

/* eslint-disable consistent-return */
export const createPost = (req, res) => {
  const post = new Post();
  post.date = req.body.date;
  post.time = req.body.time;
  post.duration = req.body.duration;
  post.location = req.body.location;
  post.players_needed = req.body.players_needed;
  post.max_players = req.body.max_players;
  post.level = req.body.level; // this may change - level of creator
  post.players_list = new Array(req.user); // [req.user]; // req.user._id creator
  post.author = req.user; // req.user._id creator

  post.players_status = new Array({ playerId: req.user._id, status: 'Joined' });

  console.log('req.user ', req.user);
  console.log('req.body.user ', req.body.user);
  // console.log('createPost', req.body.title, ' ', req.body.tags, ' ', req.body.content, ' ', req.body.cover_url, '\n');
  post.save()
    .then((result) => {
      res.send(result);
      // console.log(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// export const createPost = (req, res) => {
//   console.log('IN CREATEPOST API');
//   const post = new Post();
//   post.date = req.body.date;
//   post.time = req.body.time;
//   post.duration = req.body.duration;
//   post.location = req.body.location;
//   post.players_needed = req.body.players_needed;
//   post.max_players = req.body.max_players;
//   post.level = req.body.level; // this may change - level of creator
//   post.players_list = new Array(req.user); // [req.user]; // req.user._id creator
//   post.author = req.user; // req.user._id creator
//
//   post.players_status = new Array({ playerId: req.user._id, status: 'Joined' });
//
//   console.log(req.body);
//   console.log(req.user);
//   post.save()
//     .then((result) => {
//       console.log('SUCCESSS!!!');
//       console.log(req.user);
//       console.log(result);
//       console.log(post);
//       const query = { _id: req.user._id };
//       console.log('BEFORE PUSH');
//       req.user.games.push(result);
//       console.log(req.user);
//       console.log('AFTER PUSH');
//       User.findOneAndUpdate(query, req.user)
//         .then((result) => {
//           console.log('GAME CREATED SUCCESSs');
//           console.log(result);
//           res.json({ message: 'Post created!' });
//         }).catch((error) => {
//           console.log('Add game to user not successful');
//           console.log(error);
//           res.status(500).json({ error });
//         });
//     })
//     .catch((error) => {
//       console.log('NOT SUCCESSS!!!');
//       res.status(500).json({ error });
//     });
// };

export const getPosts = (req, res) => {
  // console.log('IN get POsts');
  Post.find()
    .then((result) => {
      // console.log('Found posts');
      res.send(result);
    }).catch((error) => {
      res.status(500).json({ error });
    });
};

// http://mongoosejs.com/docs/api.html#findbyid_findById
export const getPost = (req, res) => {
  // console.log(req.params.id);
  Post.findById(req.params.id).populate('author').populate('players_list')
    .then((result) => {
      // console.log('success');
      // console.log(result);
      res.send(result);
    })
    .catch((error) => {
      // console.log('error');
      // console.log(error);
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
    .then((result) => {
      // console.log('success');
      // console.log(result);
      res.send(result);
    }).catch((error) => {
      // console.log('error');
      // console.log(error);
      res.status(500).json({ error });
    });
};

// Join game
export const updatePost = (req, res) => {
  const query = { _id: req.params.id };
  console.log('IN UPDATEPOST API');
  console.log(req.body);
  console.log(req.user);

  // if user is in players_list, ignore
  // https://stackoverflow.com/questions/2430000/determine-if-string-is-in-list-in-javascript
  if (req.body.players_list.filter((e) => { return e.id == req.user._id; }).length > 0) {
    console.log('User is already in this game');
    const index = req.body.players_list.findIndex((p) => { return p.id == req.user._id; });
    if (index > -1) {
      req.body.players_list.splice(index, 1);
      const update = req.body;
      Post.findOneAndUpdate(query, update)
        .then((result) => {
          console.log('success: PLAYER DELETED');
          console.log(result);
          res.send(result);
        }).catch((error) => {
          console.log('error: PLAYER NOT DELETED');
          res.status(500).json({ error });
        });
    } else {
      console.log('INDEX NOT FOUND');
    }
  } else {
    console.log(' Player not in the game');
    req.body.players_list.push(req.user); // add player to player_list
    const update = req.body;
    // if user not in players_list, add player to the list
    Post.findOneAndUpdate(query, update)
      .then((result) => {
        // console.log('success');
        // console.log(result);
        res.send(result);
      }).catch((error) => {
        // console.log('error');
        // console.log(error);
        res.status(500).json({ error });
      });
  }
};


export const editPost = (req, res) => {
  const query = { _id: req.params.id };
  console.log('IN editPost API');
  console.log(req.body);


  const update = req.body;
  // if user not in players_list, add player to the list
  Post.findOneAndUpdate(query, update)
    .then((result) => {
      // console.log('success');
      // console.log(result);
      res.send(result);
    }).catch((error) => {
      // console.log('error');
      // console.log(error);
      res.status(500).json({ error });
    });
};


export const updatePostGameEvaluation = (req, res) => {
  // A.findOneAndUpdate(conditions, update)
  console.log('req.params', req.body);

  Post.findOne({ postGameEvaluation: { $elemMatch: { playerId: req.user._id } } }, (err, gameEval) => {
    if (err) {
      console.log('Error');
      res.status(500).json({ err });
    }

    if (gameEval) {
      console.log('This player has already completed their postGameEvaluation');
      return res.status(500).send('This player has already completed their postGameEvaluation');
    } else {
      console.log('Player evaluation not found :GOOD');
      console.log('req.params.id', req.params.id);

      Post.findById(req.params.id)
        .then((post) => {
          console.log('post game:', post);
          console.log('user id:', req.user._id);
          post.postGameEvaluation.push(req.body.postGameEvaluation); // add player to player_list
          // post.players_status.push({ playerId: req.user._id, status: 'Evaluted' });

          // Post.update({ 'players_status.playerId': req.user._id }, { $set: { 'players_status.$.status': 'Evaluted' } });


          post.save()
            .then((result) => {
              console.log('success: udated postGameEvaluation');
              res.json({ message: 'Post updated!' });
            })
            .catch((error) => {
              res.status(500).json({ error });
            });
        })
        .catch((error) => {
          console.log('Error: failed to update postGameEvaluation');
          res.status(500).json({ error });
        });
    }
  });
};
