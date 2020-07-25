import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send(`
  <link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">
    <style>
        .box{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .box p {
            font-family: 'Rowdies', cursive;
            font-size: 30px;
        }
    </style>
    <div class="box">
        <p>🐦 Twitter clone API Securely protected with JWT.</p>
    </div>
  `);
});

export default router;
