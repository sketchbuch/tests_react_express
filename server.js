// @flow

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const users = [
  {
    id: 1,
    fname: "Stephen",
    lname: "Bungert",
  },
  {
    id: 2,
    fname: "John",
    lname: "Smith",
  },
  {
    id: 3,
    fname: "Lindell",
    lname: "Bungert",
  }
];

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express 2' });
});

app.get('/api/users', (req, res) => {
  res.send({
    success: true,
    users: users,
  });
});

app.get('/api/users/:userId', (req, res) => {
  let response = {
    success: false,
    user: {},
    error: {
      message: "No user ID provided.",
    },
  };

  const userId = parseInt(req.params.userId);

  if (userId > 0) {
    const user = users.find(user => user.id === userId);

    if (user) {
      response = {
        success: true,
        user: user,
        error: {},
      };

    } else {
      response.error.message = `User with ID ${userId} not found`;
    }
  }

  res.send(response);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
