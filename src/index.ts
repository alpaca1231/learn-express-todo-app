import express from 'express';
import todoRoutes from './interfaces/routes/todoRoutes';

const app = express();
app.use(express.json());

app.use('/api', todoRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});
