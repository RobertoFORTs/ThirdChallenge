# ThirdChallenge


## Table of Contents
* [General Info](https://github.com/RobertoFORTs/ThirdChalleng/tree/development#general-info)
* [Technologies](https://github.com/RobertoFORTs/ThirdChalleng/tree/development#technologies)
* [Deploy](https://github.com/RobertoFORTs/ThirdChalleng/tree/development#deploy)
* [Setup](https://github.com/RobertoFORTs/ThirdChalleng/tree/development#setup)
* [Features](https://github.com/RobertoFORTs/ThirdChalleng/tree/development#features)
* [Document](https://github.com/RobertoFORTs/ThirdChalleng/blob/development/README.md#document)


## General Info
This is a training project to learn building a node.js mongoose API.

In this project. An user is able to create itself, create, update, delete and list cars as well as for reserves. The user only gain access to any funcionality of the project if he is logged in. To login, he can use the login route.

## Technologies
Project is created with:
### Dependencies
* node.js@18.13.0 
* express@4.18.2
* @types/joi@17.2.3,
* axios@1.3.4,
* bcrypt@5.1.0
* dotenv@16.0.3
* express@4.18.2
* express-async-errors@3.1.1
* joi@17.8.3
* jsonwebtoken@9.0.0
* mongoose@7.0.1
* reflect-metadata@0.1.13
* swagger-jsdoc@6.2.8
* swagger-ui-express@4.6.2
* util@0.12.5

### devDependencies
* "@types/bcrypt": "^5.0.0"
* "@types/express": "^4.17.17"
* "@types/jsonwebtoken": "^9.0.1"
* "@types/mongoose": "^5.11.97"
* "@types/swagger-ui-express": "^4.1.3"
" "@types/swagger-jsdoc": "^6.0.1",
" "@types/jest": "^29.5.0",
* "jest": "^29.5.0",
* "jest-mock-extended": "^3.0.4",
* "ts-jest": "^29.0.5",
* "ts-node": "^10.9.1",
* "ts-node-dev": "^2.0.0"
* "typescript": "^4.9.5"

## Deploy


## Setup
Please see the appropriate guide for the enviroment of choice.

To run this project, install locally usign npm:

If you only downloaded the repository, use in the same repository directory:

```npm install```

For Dependencies:

```npm i "packageName@version"```

For devDependencies:

```npm i @types/"packageName" -D```

```npm i "packageName@version" -D```

**To start the project locally, use:**

```npm start``` in the terminal

**To run tests**

```npm test``` in the terminal

Besides that, you can also install and use Postman or any other client simulator to send requests

### Routes 
**For every Route, there will be a variable {{URL}} which stands for "localhost:port/api/v1"**

**For every route, except the create User, you will have to set an Authorization header of type Bearer Token. That means you have to either Log In or Create an User(automatically logs in) to have access to any route**

e.g.:

![image](https://user-images.githubusercontent.com/114432972/224572652-effaec36-0d0a-4835-afbb-1c64cba49113.png)
--------------------------------------------------------------
**Another important setup for your postman is(This should be applied only in Log in and Sign Up routes):**

**Instead of using the commmand you see on this image, Use:**

```pm.environment.set("jwt", pm.response.json().data.loggedUser.token)```


![image](https://user-images.githubusercontent.com/114432972/224577983-cb42b184-c069-4376-8094-92918da81357.png)

--------------------------------------------------------------
**For every route, the required body to make the request follow the requisits documentation for this project!!**

#### Car Routes
--------------------------------------------------------------
```{{URL}}/car/register```

--------------------------------------------------------------  
```{{URL}}/car/?query=xyz```

--------------------------------------------------------------
```{{URL}}/car/:id```

--------------------------------------------------------------
```{{URL}}/car/update/:id```
 
--------------------------------------------------------------
```{{URL}}/car/update/:id/accessories/:id```

--------------------------------------------------------------
```{{URL}}/car/delete/:id```

--------------------------------------------------------------
 
#### User Routes
--------------------------------------------------------------
```{{URL}}/user/register```

--------------------------------------------------------------  
```{{URL}}/user/?query=xyz```

--------------------------------------------------------------
```{{URL}}/user/:id```

--------------------------------------------------------------
```{{URL}}/user/update/:id```

--------------------------------------------------------------
```{{URL}}/user/delete/:id```

--------------------------------------------------------------

#### Session Routes
 --------------------------------------------------------------
```{{URL}}/user/authenticate```


#### Reserve Routes
--------------------------------------------------------------
```{{URL}}/reserve/register```

--------------------------------------------------------------  
```{{URL}}/reserve/?query=xyz```

--------------------------------------------------------------
```{{URL}}/reserve/:id```

--------------------------------------------------------------
```{{URL}}/reserve/update/:id```

--------------------------------------------------------------
```{{URL}}/reserve/delete/:id```

--------------------------------------------------------------


## Document

Swagger documentation:


Postman: <https://www.postman.com/solar-satellite-852587/workspace/my-first-workspace/collection/26268056-0c29c3b7-da3d-47e2-b334-9375f887787a?ctx=documentation>

--------------------------------------------------------------
## Features
There are no user Roles:
 - User can login
 - Can do all CRUD operations for Users
 - Can do all CRUD operations for Reserves 
 - Can do all CRUD operations for Cars (plus the operation of updating an specific accessory)
