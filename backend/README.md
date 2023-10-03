# Standard-Recycling-Company

The main idea of this API is to create an API that contain all the objects that can be recycled and show the different places where you can sell it

- This is the Database Schema

![alt text](https://github.com/campusricardo/standard-recycling-company/tree/development/standard-recycling-company-ER.svg?raw=true)

First EndPoint

```

Create an User

localhost:4000/api/users

body Structure
{
    "name": "",
    "username": "",
    "email": "@gmail.com",
    "password": "",
    "age": 0,
    "id": 0
}

Log User

localhost:4000/api/users/login

body Structure


{
    "username": "riadfrancoq",
    "password": "123456"
}

Add raw Materials

localhost:4000/api/raw-materials

body Structure

{
    "name": "carboard",
    "valuePerTon": 1000,
    "weightGcubicM": 10000
}

You must put in headers api-jwt, but before log in.

```
