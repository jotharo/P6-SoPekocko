# 📎 Project 6 - SoPekocko

## Skills Assessed

* Implement a logical data model in accordance with the regulations: OWASP and RGPD
* Store data securely
* Implement CRUD operations in a secure manner

## Goal : Build a secure API for a gastronomic reviews app called So Pekocko

* [The Project in OpenClassrooms (written in french)](https://openclassrooms.com/fr/projects/676/assignment "Cliquez pour voir le projet")
* [Memorandum](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/P6_Note%20de%20cadrage%20So%20Pekocko_V3.pdf)
* [Guidelines](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Guidelines+API.pdff)

## Tools

| Server                   | Database           |
|:------------------------:|:------------------:|
| Framework : Express       | MongoDB            |
| Server : NodeJS           | Mongoose           |


***

# 🔨 Installation 

Clone this project from GitHub.

#### Frontend

Open a terminal, cd "frontend" :

    * "npm install"
    * "npm install node-sass" 
    * "ng serve"
    * Join : http://localhost:4200/

#### Backend

Open a terminal, cd "backend" :

           * "npm install-g nodemon",
           * "nodemon server",
           * The server is listening on port : http://localhost:3000



**Important** :  ***create a '.env' file in the backend folder.***

Inside this '.env' file, add this line with your Mongo DB Id and Password following this model :

```
MONGODB_URI="mongodb+srv://<YourMongoDbId>:<YourMongoDbPassword>@cluster0.acudl.mongodb.net/SoPekocko?retryWrites=true&w=majority"
```

***

# Connecting to the app

* Open [localhost:4200](http://localhost:4200/) 
* Enter an **Email** and **Password** (minimum 8 characters !)

***
# 💡 What can I do in this app ?

* GET All sauces
* GET One sauce
* GET One sauce Copy
* POST Create sauce
* PUT Modify sauce
* DEL Delete sauce
* POST Like or Dislike a sauce
* PUT Modify sauce Copy





