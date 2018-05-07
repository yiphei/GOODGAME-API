// contains the main functionality for our API
import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;
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
      console.log('success');
      console.log(result);
      res.send(result);
    }).catch((error) => {
      console.log('error');
      console.log(error);
      res.status(500).json({ error });
    });
};

export const updatePost = (req, res) => {
  res.send('update a post here');
};
