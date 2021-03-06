/* eslint-disable */
import { Router } from 'express';
import * as authService from '../services/authService';
import * as userService from '../services/userService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
  .post('/login', authenticationMiddleware, (req, res, next) => authService.login(req.user)
    .then(data => res.send(data))
    .catch(next))
  .post('/register', registrationMiddleware, (req, res, next) => authService.register(req.user)
    .then(data => res.send(data))
    .catch(next))
  .get('/user', jwtMiddleware, (req, res, next) => userService.getUserById(req.user.id)
    .then(data => res.send(data))
    .catch(next))
  .put('/user', jwtMiddleware, (req, res, next) => userService.updateUser(req.user.id, req.body.imageId, req.body)
    .then(data => res.send(data))
    .catch(err => {
      req.io.to(req.user.id).emit('user_data', err.message); // notify a user if username or email isn't unique
      res.status(400).send();
    }));

export default router;
