# Appliance

This is an example of an implementation in **NodeJS** of a backend service used to control an appliance such as a washing machine.

### Installation
##### Requirements
* [Node.js](https://nodejs.org/) v8.2.1+
* npm v5.3.0+
* MySQL environment such as [XAMPP](https://www.apachefriends.org/index.html) if on Windows

First create a database called "**appliance**" and import the strucure from the file "**appliance.sql**" found in the root folder of the project.

Modify the **./config/mysql.config.js** file according to your MySQL environment, setting the host address, the user and the password.
```javascript
const parameters={
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appliance'
};
```

Check if you are running **npm** in development environment
```sh
$ npm config get production
```
It should return **false**, if not set it with:
```sh
$ npm config set -g production false
```
Install the dependencies and start the server, it will run on **localhost:3000**

```sh
$ cd Appliance
$ npm install
$ npm start
```
Run the unit test from another console window
```sh
$ npm test
```
It should pass **43** tests.

### Routes
For executing the API calls manually, I suggest using [Postman](https://www.getpostman.com/)

##### Reset
* Reset database to its initial state:
    * GET http://localhost:3000/reset
##### Models
* List of available washing machines models:
    * GET http://localhost:3000/models
* List of available programs for a certain model
    * GET http://localhost:3000/models/:modelName (e.g. http://localhost:3000/models/E44JTSB7)
##### Centrifuges
* List of valid centrifuge rpm parameters (for all models):
    * GET http://localhost:3000/centrifuges
##### Units
* List of instantiated units:
    * GET http://localhost:3000/units
* Power ON an individual unit:
    * GET http://localhost:3000/units/powerOn/:id (e.g. http://localhost:3000/units/powerOn/2)
* Power OFF an individual unit:
    * GET http://localhost:3000/units/powerOff/:id (e.g. http://localhost:3000/units/powerOff/2)
* Set state to "running" of an individual unit:
    * GET http://localhost:3000/units/run/:id (e.g. http://localhost:3000/units/run/2)
* Set state to "paused" of an individual unit:
    * GET http://localhost:3000/units/pause/:id (e.g. http://localhost:3000/units/pause/2)
* Set state to "waiting" of an individual unit:
    * GET http://localhost:3000/units/wait/:id (e.g. http://localhost:3000/units/wait/2)
* Add a new unit of a certain model:
    * POST http://localhost:3000/units/
        * Headers ("Content-Type: application/x-www-form-urlencoded")
        * Params ("model: idModel") (a valid model id can be seen from previous request (GET http://localhost:3000/models) )
* Set program to an individual unit:
    * PATCH http://localhost:3000/units/program/:id
        * Headers ("Content-Type: application/x-www-form-urlencoded")
        * Params ("program: idProgram") (a valid program id can be seen from previous request (GET http://localhost:3000/models/:modelName) )
* Set timer to an individual unit:
    * PATCH http://localhost:3000/units/timer/:id
        * Headers ("Content-Type: application/x-www-form-urlencoded")
        * Params ("minutes: amountOfMinutes")
* Toggle "intensive" of an individual unit:
    * GET http://localhost:3000/units/toggleIntensive/:id (e.g. http://localhost:3000/units/toggleIntensive/2)
* Delete the instance of an individual unit:
    * DELETE http://localhost:3000/units/delete/:id (e.g. http://localhost:3000/units/delete/2)

