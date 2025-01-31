const express = require('express');
const http = require('http'); 
const mongoose = require('mongoose');
const cors = require('cors');
const leaveRoutes = require('./routes/leaveRoutes'); 
const userRoutes = require('./routes/userRoutes'); 

const app = express();
const server = http.createServer(app); 
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/leaveManagementDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api', leaveRoutes);
app.use('/api', userRoutes);

app.patch('/api/leaves/:id', async (req, res) => {
    try {
        const leave = await leave.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!leave) {
            return res.status(404).send();
        }
        res.send(leave); // No more WebSocket broadcasting
    } catch (error) {
        res.status(400).send(error);
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
