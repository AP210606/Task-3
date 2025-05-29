const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample users
let users = [
  { id: 1, name: "Anil", username: "anil123", email: "anil@example.com" },
  { id: 2, name: "Happy", username: "happy456", email: "happy@example.com" },
  { id: 3, name: "Ajit", username: "Ajit789", email: "ajit@example.com" }
];

// 1. Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// 2. Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// 3. Search user by name and username
app.get('/users/search/:name/:username', (req, res) => {
  const { name, username } = req.params;
  const user = users.find(u => u.name === name && u.username === username);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// 4. Sort users by ID
app.get('/users/sort', (req, res) => {
  const order = req.query.order;
  const sorted = [...users].sort((a, b) => order === 'desc' ? b.id - a.id : a.id - b.id);
  res.json(sorted);
});

// 5. Add new user (from body)
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ message: "User added", user: newUser });
});

// 6. Add new user (from params + query)
app.post('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, username, email } = req.query;
  const newUser = { id: parseInt(id), name, username, email };
  users.push(newUser);
  res.status(201).json({ message: "User added", user: newUser });
});

// 7. Delete user by ID
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

// 8. Update user name/email by ID
app.patch('/users/:id', (req, res) => {
  const { name, email } = req.query;
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  if (name) user.name = name;
  if (email) user.email = email;

  res.json({ message: "User updated", user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});