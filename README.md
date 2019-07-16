# Rest API for RestAPI (GraphQL)

 Hello guys! My name is Arturo Torres and this is my solution to your API
## How to run it

I already deployed the API to Heroku and it can be found at [innohub-test.herokuapp.com](https://innohub-test.herokuapp.com/graphql)

This should open the GUI for GraphQL, where you can test the rest API (**examples provided below**)

### Built With:

The technologies used for this application were the following:

* [Node.js](https://nodejs.org/en/)
* [Express](https://www.npmjs.com/package/express)
* [CORS](https://www.npmjs.com/package/cors)
* [GraphQL](https://graphql.org/)
* [Moment](https://momentjs.com/)
* [Mongoose](https://mongoosejs.com/)

## Requests

Here are documented what queries and mutations are available and how to perform them from GraphQL GUI.

## Queries

These can be thought as the `GET`s of the rest API, though, because of GraphQL we will be using "POST" for all of them.

### Hello (returns a small hi)

* **GraphQL(GUI):** `{ hello }`
* **Method:** POST <br />
* **URL:** `https://innohub-test.herokuapp.com/graphql` <br />
* **Response:** `{
  "data": {
    "hello": "Hello you guys over at Innohub!"
  }
}` <br />
* **Status:** `200 OK`

### UserGradeAverage <_UserID_> (Returns a user's average score)

* **GraphQL(GUI):** `{userGradeAverage(id: <_UserID_>){user{_id name} average}}`
    * **Example:** `{
  userGradeAverage(id: "5d2cb6d0ef7e181b6c3f79e1") {
    user {
      _id
      name
    }
    average
  }
}
`


* **Method:** POST <br />
* **URL:** `https://innohub-test.herokuapp.com/graphql` <br />
* **Response:** 
```
{
  "data": {
    "userGradeAverage": {
      "user": {
        "_id": "5d2cb6d0ef7e181b6c3f79e1",
        "name": "Arthur"
      },
      "average": 8.333333333333334
    }
  }
}
``` 
* **Status:** `200 OK`

### ProjectsByType  (Returns projects grouped by type)

* **GraphQL(GUI):** `{
  projectsByType {
    _id
    tasks
  }
}`


* **Method:** POST <br />
* **URL:** `https://innohub-test.herokuapp.com/graphql` <br />
* **Response:** 
```
{
  "data": {
    "projectsByType": {
      "_id": [
        "Not Important",
        "Important"
      ],
      "tasks": [
        [
          "Small Project One",
          "Small Project Two"
        ],
        [
          "Big Project One",
          "Big Project Two",
          "Big Project Three"
        ]
      ]
    }
  }
}
``` 
The first part of the grouping would be by "_id:" where we have 'Not Important' and 'Important' with their respective positions of 1 and 2
Soon after we have "tasks:" where again, the group in position 1 are the 'Not Important' type projects and in position 2 we have the 'Important' projects

* **Status:** `200 OK`

### Users (returns all users)

* **GraphQL(GUI):** `{
  users {
    users {
      _id
      name
      curp
      username
      password
      email
      createdAt
      updatedAt
    }
    totalUsers
  }
}
`
* **Method:** POST <br />
* **URL:** `https://innohub-test.herokuapp.com/graphql` <br />
* **Response:** 
```
{
  "data": {
    "users": {
      "users": [
        {
          "_id": "5d2cb735ef7e181b6c3f79e4",
          "name": "Victor",
          "curp": "sadasdasdasdasd",
          "username": "Vic",
          "password": "secret",
          "email": "vic@gmail.com",
          "createdAt": "2019-07-15T17:26:13.130Z",
          "updatedAt": "2019-07-15T17:26:13.130Z"
        },
        {
          "_id": "5d2cb72bef7e181b6c3f79e3",
          "name": "Mariou",
          "curp": "sadasdasdasdasd",
          "username": "Mario",
          "password": "secret",
          "email": "mario@gmail.com",
          "createdAt": "2019-07-15T17:26:03.921Z",
          "updatedAt": "2019-07-15T17:26:03.921Z"
        },
        {
          "_id": "5d2cb71cef7e181b6c3f79e2",
          "name": "Lino",
          "curp": "sadasdasdasdasd",
          "username": "Lino",
          "password": "secret",
          "email": "lino@gmail.com",
          "createdAt": "2019-07-15T17:25:48.458Z",
          "updatedAt": "2019-07-15T17:25:48.458Z"
        },
        {
          "_id": "5d2cb6d0ef7e181b6c3f79e1",
          "name": "Arthur",
          "curp": "sadasdasdasdasd",
          "username": "Arturo",
          "password": "secret",
          "email": "arturo@gmail.com",
          "createdAt": "2019-07-15T17:24:32.956Z",
          "updatedAt": "2019-07-15T17:24:32.956Z"
        }
      ],
      "totalUsers": 4
    }
  }
}
```
* **Status:** `200 OK`


### Tasks (returns all tasks)

* **GraphQL(GUI):** `{
  tasks {
    tasks {
      _id
      name
      description
      deadline
      workers {_id name curp username password email createdAt updatedAt}
      grade
      createdAt
      updatedAt
    }
  }
}
`
* **Method:** POST <br />
* **URL:** `https://innohub-test.herokuapp.com/graphql` <br />
* **Response:** 
```
{
  "data": {
    "tasks": {
      "tasks": [
        {
          "_id": "5d2ced36945a5a3a4c301706",
          "name": "Exam",
          "description": "Numbers",
          "deadline": "1994-12-12T06:00:00.000Z",
          "workers": [
            {
              "_id": "5d2cb6d0ef7e181b6c3f79e1",
              "name": "Arthur",
              "curp": "sadasdasdasdasd",
              "username": "Arturo",
              "password": "secret",
              "email": "arturo@gmail.com",
              "createdAt": "1563211472956",
              "updatedAt": "1563211472956"
            }
          ],
          "grade": 7,
          "createdAt": "2019-07-15T21:16:38.386Z",
          "updatedAt": "2019-07-15T22:27:01.417Z"
        },
        {
          "_id": "5d2ced0ae7c1f20e14b142d2",
          "name": "Exam",
          "description": "Numbers",
          "deadline": "1994-12-12T06:00:00.000Z",
          "workers": [],
          "grade": 10,
          "createdAt": "2019-07-15T21:15:54.051Z",
          "updatedAt": "2019-07-15T21:15:54.051Z"
        },
        {
          "_id": "5d2cd93a7adf973cb4d5ea1c",
          "name": "Final Second Exam",
          "description": "It matters most",
          "deadline": "1995-12-12T06:00:00.000Z",
          "workers": [
            {
              "_id": "5d2cb6d0ef7e181b6c3f79e1",
              "name": "Arthur",
              "curp": "sadasdasdasdasd",
              "username": "Arturo",
              "password": "secret",
              "email": "arturo@gmail.com",
              "createdAt": "1563211472956",
              "updatedAt": "1563211472956"
            }
          ],
          "grade": 8,
          "createdAt": "2019-07-15T19:51:22.613Z",
          "updatedAt": "2019-07-15T22:26:40.741Z"
        },
        {
          "_id": "5d2cd9237adf973cb4d5ea1b",
          "name": "Final Exam",
          "description": "It matters",
          "deadline": "1994-12-12T06:00:00.000Z",
          "workers": [
            {
              "_id": "5d2cb6d0ef7e181b6c3f79e1",
              "name": "Arthur",
              "curp": "sadasdasdasdasd",
              "username": "Arturo",
              "password": "secret",
              "email": "arturo@gmail.com",
              "createdAt": "1563211472956",
              "updatedAt": "1563211472956"
            },
            {
              "_id": "5d2cb735ef7e181b6c3f79e4",
              "name": "Victor",
              "curp": "sadasdasdasdasd",
              "username": "Vic",
              "password": "secret",
              "email": "vic@gmail.com",
              "createdAt": "1563211573130",
              "updatedAt": "1563211573130"
            },
            {
              "_id": "5d2cb72bef7e181b6c3f79e3",
              "name": "Mariou",
              "curp": "sadasdasdasdasd",
              "username": "Mario",
              "password": "secret",
              "email": "mario@gmail.com",
              "createdAt": "1563211563921",
              "updatedAt": "1563211563921"
            }
          ],
          "grade": 10,
          "createdAt": "2019-07-15T19:50:59.799Z",
          "updatedAt": "2019-07-15T20:50:07.651Z"
        }
      ]
    }
  }
}
```
* **Status:** `200 OK`

### Projects (returns all projects)

* **GraphQL(GUI):** `{
  projects {
    projects {
      _id
      name
      type
      tasks {
        _id
        name
        description
        deadline
        workers {
          _id
          name
          curp
          username
          password
          email
        }
        grade
      }
      createdAt
      updatedAt
    }
  }
}
`
* **Method:** POST <br />
* **URL:** `https://innohub-test.herokuapp.com/graphql` <br />
* **Response:** 
```
{
  "data": {
    "projects": {
      "projects": [
        {
          "_id": "5d2ceb64060b0c0f383887a2",
          "name": "Big Project One",
          "type": "Important",
          "tasks": [
            {
              "_id": "5d2cd9237adf973cb4d5ea1b",
              "name": "Final Exam",
              "description": "It matters",
              "deadline": "787212000000",
              "workers": [
                {
                  "_id": "5d2cb6d0ef7e181b6c3f79e1",
                  "name": "Arthur",
                  "curp": "sadasdasdasdasd",
                  "username": "Arturo",
                  "password": "secret",
                  "email": "arturo@gmail.com"
                },
                {
                  "_id": "5d2cb735ef7e181b6c3f79e4",
                  "name": "Victor",
                  "curp": "sadasdasdasdasd",
                  "username": "Vic",
                  "password": "secret",
                  "email": "vic@gmail.com"
                },
                {
                  "_id": "5d2cb72bef7e181b6c3f79e3",
                  "name": "Mariou",
                  "curp": "sadasdasdasdasd",
                  "username": "Mario",
                  "password": "secret",
                  "email": "mario@gmail.com"
                }
              ],
              "grade": 10
            },
            {
              "_id": "5d2cd93a7adf973cb4d5ea1c",
              "name": "Final Second Exam",
              "description": "It matters most",
              "deadline": "818748000000",
              "workers": [
                {
                  "_id": "5d2cb6d0ef7e181b6c3f79e1",
                  "name": "Arthur",
                  "curp": "sadasdasdasdasd",
                  "username": "Arturo",
                  "password": "secret",
                  "email": "arturo@gmail.com"
                }
              ],
              "grade": 8
            }
          ],
          "createdAt": "2019-07-15T21:08:52.514Z",
          "updatedAt": "2019-07-15T22:02:17.422Z"
        },
        {
          "_id": "5d2d12aed76faa3738700471",
          "name": "Big Project Two",
          "type": "Important",
          "tasks": [],
          "createdAt": "2019-07-15T21:08:52.514Z",
          "updatedAt": "2019-07-15T22:02:17.422Z"
        },
        {
          "_id": "5d2d12c2d76faa3738700472",
          "name": "Big Project Three",
          "type": "Important",
          "tasks": [
            {
              "_id": "5d2cd9237adf973cb4d5ea1b",
              "name": "Final Exam",
              "description": "It matters",
              "deadline": "787212000000",
              "workers": [
                {
                  "_id": "5d2cb6d0ef7e181b6c3f79e1",
                  "name": "Arthur",
                  "curp": "sadasdasdasdasd",
                  "username": "Arturo",
                  "password": "secret",
                  "email": "arturo@gmail.com"
                },
                {
                  "_id": "5d2cb735ef7e181b6c3f79e4",
                  "name": "Victor",
                  "curp": "sadasdasdasdasd",
                  "username": "Vic",
                  "password": "secret",
                  "email": "vic@gmail.com"
                },
                {
                  "_id": "5d2cb72bef7e181b6c3f79e3",
                  "name": "Mariou",
                  "curp": "sadasdasdasdasd",
                  "username": "Mario",
                  "password": "secret",
                  "email": "mario@gmail.com"
                }
              ],
              "grade": 10
            },
            {
              "_id": "5d2cd93a7adf973cb4d5ea1c",
              "name": "Final Second Exam",
              "description": "It matters most",
              "deadline": "818748000000",
              "workers": [
                {
                  "_id": "5d2cb6d0ef7e181b6c3f79e1",
                  "name": "Arthur",
                  "curp": "sadasdasdasdasd",
                  "username": "Arturo",
                  "password": "secret",
                  "email": "arturo@gmail.com"
                }
              ],
              "grade": 8
            }
          ],
          "createdAt": "2019-07-15T21:08:52.514Z",
          "updatedAt": "2019-07-15T22:02:17.422Z"
        },
        {
          "_id": "5d2d12ccd76faa3738700473",
          "name": "Small Project One",
          "type": "Not Important",
          "tasks": [],
          "createdAt": "2019-07-15T21:08:52.514Z",
          "updatedAt": "2019-07-15T22:02:17.422Z"
        },
        {
          "_id": "5d2d12d5d76faa3738700474",
          "name": "Small Project Two",
          "type": "Not Important",
          "tasks": [],
          "createdAt": "2019-07-15T21:08:52.514Z",
          "updatedAt": "2019-07-15T22:02:17.422Z"
        }
      ]
    }
  }
}
```
* **Status:** `200 OK`
