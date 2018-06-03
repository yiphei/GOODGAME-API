# Lab5 part 1


## Description
This is a express.js and mongoDB CRUD API server for Good Game (source: https://github.com/dartmouth-cs52-18S/project-other-goodgame), a React Native app. Using this api you can retrieve, create, and update games, courts, and users. The api returns responses in returns JSON format.

The API has the following endpoints:

## Courts

## Games (posts)
* GET /api/posts/ returns only title and tags for all games [[{"id":"",title":"","tags":""},...]
* POST /api/posts/ with post parameters {'date', 'time', 'duration', 'location', 'players_needed', 'max_players', 'level'} creates a new post. The 'players_list' field automatically includes the user who created the game and adds players as they join the game. The 'author' field is automatically saved as the user who created the game.
* PUT /api/posts/:postID with parameters {'title', 'tags', 'content'} will update an entry
  * edit post vs update post 
* GET /api/posts/:postID returns the game found at postID
* DELETE /api/posts/:postID deletes the game found at postID
* update postgameevaluation

## Users


## starter express app template

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

## Deployment


