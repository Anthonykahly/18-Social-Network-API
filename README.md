# 18-Social-Network-API
 Chapter 18 NoSQL weekly project for the 2023 CWRU full stack web course.

[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://lbesson.mit-license.org/)

## Table of Contents

- [Description](#description)
- [Technology](#Technology)
- [Installation](#installation)
- [Usage](#usage)
- [Licenses](#licenses)
- [Contributions](#contributions)
- [Questions](#questions)

## Description:

This project tasked up to create an API for a social networking application for users to share thoughts, react to friends, and even create functioning friends lists.

#### User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

#### Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Technology:

Technology used for this project:

- Express.js
- Javascript
- Node.js
- Mongoose
- MongoDB

## Installation

To run this project, will need to install the required files using the `npm install` command in their terminal.

## Usage

To invoke this application the user will need to run the command `npm start`

#### API Routes

**`/api/users`**

- `GET` all users

- `GET` a single user by its `_id` and populated thought and friend data

- `POST` a new user:

- `PUT` to update a user by its `_id`

- `DELETE` to remove user by its `_id`

## Licenses

    This project is covered under the MIT license. To learn more about what this means, click the license button at the top.

## Contributions

This project was created for the 2023 CWRU full stack course and is not currently accepting future contributors.

## Questions:

Any questions, comments, or concerns, please feel free to contact me at:

- Github: (https://github.com/Anthonykahly)
- Email: akahly@gmail.com
