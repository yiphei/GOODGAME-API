# Good Game API
#Starter pack Lab5 part 1 

## Description
This is a express.js and mongoDB CRUD API server for a simple blog. A blog post has a title, content, tags, and a cover_url (an image or gif). Using this api you can retrieve all posts, retreive a single post, create a post, update a post, and delete a post. It returns JSON.

The API has the following endpoints:

* GET /api/posts/ returns only title and tags for all posts [[{"id":"",title":"","tags":""},...]
* POST /api/posts/ with post parameters {'title', 'tags', 'content'} creates a new post
* PUT /api/posts/:postID with parameters {'title', 'tags', 'content'} will update an entry
* GET /api/posts/:postID returns the post found at postID
* DELETE /api/posts/:postID deletes the post found at postID

## starter express app template

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)
