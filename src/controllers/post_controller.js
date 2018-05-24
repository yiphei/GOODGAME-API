// contains the main functionality for our API
import Post from '../models/post_model';
/* eslint-disable consistent-return */

export const createPost = (req, res) => {
  const post = new Post();
  post.date = req.body.date;
  post.time = req.body.time;
  post.duration = req.body.duration;
  post.lat = req.body.lat;
  post.long = req.body.long;
  post.players_needed = req.body.players_needed;
  post.max_players = req.body.max_players;
  post.level = req.body.level; // this may change - level of creator
  post.players_list = [req.user]; // req.user._id creator
  post.author = req.user; // req.user._id creator
  console.log('req.user ', req.user);
  console.log('req.body.user ', req.body.user);
  // console.log('createPost', req.body.title, ' ', req.body.tags, ' ', req.body.content, ' ', req.body.cover_url, '\n');
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
      // console.log(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    }).catch((error) => {
      res.status(500).json({ error });
    });
};

// http://mongoosejs.com/docs/api.html#findbyid_findById
export const getPost = (req, res) => {
  // console.log(req.params.id);
  Post.findById(req.params.id)
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
  // A.findOneAndUpdate(conditions, update)
  // console.log('req.params', req.body);
  const query = { _id: req.params.id };
  // const update = req.body;

  // if user is in players_list, ignore
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Browser_compatibility
  if (req.body.players_list.includes(req.body.user)) {
    return res.status(500).send('User is already in this game');
  } else {
    req.body.players_list.push(req.body.user); // add player to player_list
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
