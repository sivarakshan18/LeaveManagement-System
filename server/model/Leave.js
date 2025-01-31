const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Leave', leaveSchema);
