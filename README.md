# MEVN Stack

This project is intended to be used as a quickstarter for building a
[**M**ongo](https://www.mongodb.com/) [**E**xpress](https://expressjs.com/) [**V**ueJS](https://vuejs.org/) [**N**ode](https://nodejs.org/en/) stack. This is similar to a MEAN stack, except Angular has been swapped out for a VueJS single page application rendered on the client side.

## Technologies
This project uses:

[Mongo](https://www.mongodb.com/) for a NoSQL database.

[Express](https://expressjs.com/) For an HTTP Server

[VueJS](https://vuejs.org/) For Views, with the [Vuetify](https://vuetifyjs.com/) Material Design Framework

[Node](https://nodejs.org/en/) For a JavaScript runtime

## Installation

To install this project simply clone or download the repo:

`git clone <dir name>`

`cd <dir name>`

`npm install`

### Setup/Development

To develop using this project you can run 

`npm run dev:serve`

and

`npm run dev:client` 

in seperate terminal instances. This will allow hot reloading of both changes to the server and changes to the client.

The server will require you to be running a local instance of [MongoDB](https://www.mongodb.com/).

`npm run static` will build the client-side JavaScript and start the hot reloading of the server environment. `npm run dev:serve` can also be used to just start the API if you are working on that prior to worrying about the client.

#### Scripts

A more detailed breakdown of the scripts are as follows:

| Command `npm run`| Server | Client |
| :------------- |:------------- |:- 
| `start`| Static| Static (requires `npm run build`)
| `dev:serve`      	| Hot reload | Static
| `dev:client` 		| None | Hot Reload 
| `build` | None | Bundled by Webpack
| `static` | Hot reload | Static

### Project Structure

`/src`

`--/controllers/`-- Contains controllers for our API resources.

`--/database/`

`----/models/`-- Contains the models for our API Resources using [Mongoose](http://mongoosejs.com/).

`--/middleware/`-- Any middleware you may need can go here.

`--/routes/`-- All route definitions are here.

`----/api.js`-- Routes for the API.

`----/user.js`-- Routes specific to the user resource.

### User Resource
The example resource is as follows

| Attribute     | Type          | Required|
| :-------------: |:-------------:| :-----:  |
| `name`      	| String 		| `true`  |
| `age`      	| Number        | `true`  |
| `email` 		| String        | `true`  |


### Existsing Routes

All user endpoints are behind the `/api` endpoint.

#### `GET`
`/users` - returns a list of all users inside of an array called `data`.

`/users/:id` - where `:id` is the id of a `user` resource. The resource is then returned in JSON format.

#### `POST`
`/users` - Creates a new `user` resource based on the payload of the request.

#### `DELETE`
`/users/:id` - Delete a user resouce matching the `:id` specified.

#### `PUT`
`/users` - Update a user based on the payload of the request

##

The Client can be accessed by hitting the document root:

`localhost:8080/` Will send you to the application.