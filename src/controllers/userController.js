import { userService } from '../services/userService.js';

export const userController = {
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async getById(req, res) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async create(req, res) {
    try {
      const newUser = await userService.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'Email already exists', keyValue: err.keyValue });
      }
      res.status(400).json({ message: err.message });
    }
  },
  async update(req, res) {
    try {
      const updated = await userService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'User not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async remove(req, res) {
    try {
      await userService.remove(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
