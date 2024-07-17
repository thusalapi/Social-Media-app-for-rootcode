import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
mongoose
    .connect("mongodb+srv://isnoc:test123@cluster0.anz78wm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err + ", Could not connect to MongoDB"));
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Node.js backend!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map