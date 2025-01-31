const express = require('express');
const router = express.Router();
const Leave = require('../model/Leave'); 


// Create a new leave request
router.post('/leaves', async (req, res) => {
    const leave = new Leave(req.body);
    try {
        await leave.save();
        res.status(201).send(leave);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all leave requests
router.get('/leaves', async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.status(200).send(leaves);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update leave status
router.patch('/leaves/:id', async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!leave) {
            return res.status(404).send();
        }
        res.send(leave);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
