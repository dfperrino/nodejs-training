import express from 'express';
const router = express.Router();

router.get('/info', (_req, res) => {
  res.json({ title: 'hola' });
});

export default router;
