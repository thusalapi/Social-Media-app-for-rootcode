import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

export default app;