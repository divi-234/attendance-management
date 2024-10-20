const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

let attendanceData = {
    classA: { present: 0, absent: 0 },
    classB: { present: 0, absent: 0 }
};

// Endpoint to submit attendance data
app.post('/submit-attendance', (req, res) => {
    const { className, present, absent } = req.body;

    if (attendanceData[className]) {
        attendanceData[className].present += present;
        attendanceData[className].absent += absent;
        res.status(200).send('Attendance recorded successfully.');
    } else {
        res.status(400).send('Invalid class name.');
    }
});

// Endpoint to fetch attendance data for a specific class
app.get('/attendance-data', (req, res) => {
    const className = req.query.class; // Get class from query parameters
    if (attendanceData[className]) {
        res.json(attendanceData[className]);
    } else {
        res.status(404).send('Class not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
