import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import songRoutes from './routes/songRoutes';
import artistRoutes from './routes/artistRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://levskoy95:fJ6EetRtXzbAomFV@cluster0.262hyvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use(express.json());
const cors = require('cors');


app.use(cors());
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/users', authRoutes);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
