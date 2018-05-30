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

// // a player's joined games
// router.route('/yourgames/')
//   .get(requireAuth, UserController.getUserGames)
//   .put(requireAuth, UserController.updateUserGames); // update a player's posts

// your routes will go here
// chaining method

router.route('/postssss/:id')
  .put(requireAuth, Posts.editPost);

router.route('/posts/')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);

router.route('/postss/:id')
  .put(requireAuth, Posts.updatePostGameEvaluation);

// for going to a user profile
router.route('/user/')
  .get(requireAuth, UserController.getUser);

router.route('/user/addgame')
  .put(requireAuth, UserController.addGame);

router.route('/user/delgame')
  .put(requireAuth, UserController.deleteGame);
// update game list
// get user games

// for ranking
// router.route('/users/')
//     .get(Posts.getPost)

router.route('/courts/')
  .get(Courts.getCourts)
  .post(Courts.createCourt);

router.route('/courts/:id')
  .get(Courts.getCourt);

export default router;
