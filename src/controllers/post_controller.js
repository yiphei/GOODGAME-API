// contains the main functionality for our API
import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;
  console.log('createPost', req.body.title, ' ', req.body.tags, ' ', req.body.content, ' ', req.body.cover_url, '\n');
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
      console.log(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  res.send('posts should be returned');
};
export const getPost = (req, res) => {
  res.send('single post looked up');
};
export const deletePost = (req, res) => {
  res.send('delete a post here');
};
export const updatePost = (req, res) => {
  res.send('update a post here');
};
