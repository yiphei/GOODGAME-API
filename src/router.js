import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import * as Courts from './controllers/court_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

// /signin route.
// requireSignin is the passport middleware. Makes this route protected by
// the password+username strategy we defined in our passport.js file.
// Only once the user is authenticated via that method, will it allow
// the UserController.signin function to run.
router.post('/signin', requireSignin, UserController.signin);

// /signup route
router.post('/signup', UserController.signup);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// your routes will go here
// chaining method
router.route('/posts/')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);

  router.route('/courts/')
    .get(Courts.getCourt)
    .post(Courts.createCourts)

  router.route('/courts/:id')
    .get(Courts.getCourt)

export default router;
