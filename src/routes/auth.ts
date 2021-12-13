import express from 'express';
import { Request, Response } from 'oauth2-server';
import app from '../app';

const router = express.Router();

router.all('/token', (req, res) => {
  const request = new Request(req);
  const response = new Response(res);
  return (app as any).oauth
    .token(request, response)
    .then(function (token: any) {
      res.json(token);
    })
    .catch(function (err: any) {
      res.status(err.code || 500).json(err);
    });
});

export const authenticateRequest = (req: any, res: any, next: any) => {
  const request = new Request(req);
  const response = new Response(res);
  return (app as any).oauth
    .authenticate(request, response)
    .then(function (data: any) {
      res.locals.user = data.user;
      next();
    })
    .catch(function (err: any) {
      res.status(err.code || 500).json(err);
    });
};

export default router;
