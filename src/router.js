import { Router } from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here
// chaining method
router.route('/posts/')
  .post((req, res) => {
    // res.send('Get posts ');
    Posts.createPost(req, res);
  })
  .get((req, res) => {
    // res.send('Get posts ');
    Posts.getPosts(req, res);
  });

router.route('/posts/:id')
  .get((req, res) => {
    // res.send('Get posts ');
    Posts.getPost(req, res);
  })
  .put((req, res) => {
    // res.send('Get posts ');
    Posts.updatePost(req, res);
  })
  .delete((req, res) => {
    // res.send('Get posts ');
    Posts.deletePost(req, res);
  });

export default router;
