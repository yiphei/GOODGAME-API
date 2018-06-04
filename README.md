# Lab5 part 1


## Description
This is a express.js and mongoDB CRUD API server for Good Game (source: https://github.com/dartmouth-cs52-18S/project-other-goodgame), a React Native app. Using this api you can retrieve, create, and update games, courts, and users. The api returns responses in returns JSON format.

Deployed at https://good-game.herokuapp.com/api/ 

## The API has the following endpoints:

### Courts

* Fetch courts
  * GET /api/courts/ returns all courts [{'_id','title', 'coordinate', 'game_list'},...]
* Create a court
  * POST /api/courts/ with post parameters {'date', 'time', 'duration', 'location', 'players_needed', 'max_players', 'level'} creates a new court. The 'players_list' field automatically includes the user who created the game and adds players as they join the game. The 'author' field is automatically saved as the user who created the game.
* Add game to a court
  * PUT /api/courts/:postID adds a game to a court. This is used when user creates a game and chooses an existing court for the game to take place at.
* Get a court 
  * GET /api/courts/:postID will get a specific court

### Games (posts)
* Fetch games
 * GET /api/posts/ returns all games [{'_id','players_list','date', 'time','duration','players_needed', 'max_players','level', 'author'},...]
* Create new game 
 * POST /api/posts/ with post parameters {'date', 'time', 'duration', 'location', 'players_needed', 'max_players', 'level'} creates a new post. The 'players_list' field automatically includes the user who created the game and adds players as they join the game. The 'author' field is automatically saved as the user who created the game.
* Get a game
 * GET /api/posts/:postID returns the game found at postID
* Delete a game
 * DELETE /api/posts/:postID deletes the game found at postID

* update Post Game Evaluation
 * PUT api/postss/:id updatePostGameEvaluation
* Edit a game
 * PUT /api/posts/:postID with parameters {'title', 'tags', 'content'} will update an entry
router.route('/postssss/:id')
  .put(requireAuth, Posts.editPost);

### Users
* Sign in
 * POST /api/signin 
* Sign up 
 * POST /api/signup
* Get user profile
 * GET /api/user 
* Add user to game (join game)
 * PUT /user/addgame
* Remove user from game (leave game)
 * PUT /user/delgame

## starter express app template

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

## Deployment

Deployed using Heroku Git:

Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login
Clone the repository
Use Git to clone good-game's source code to your local machine.

$ heroku git:clone -a good-game
$ cd good-game
Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master
