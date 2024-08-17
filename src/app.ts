import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5006;

app.get('/', (req: Request, res: Response) => {
  console.log(req);
  res.send('Hello world!');
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
