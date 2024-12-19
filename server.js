const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory data storage
const attendanceRecords = {
  'Class A': [{ studentId: 'S1', daysPresent: 0 }, { studentId: 'S2', daysPresent: 0 }],
  'Class B': [{ studentId: 'S1', daysPresent: 0 }, { studentId: 'S2', daysPresent: 0 }]
};

// Endpoint to get attendance data for a class
app.get('/attendance/:className', (req, res) => {
  const className = req.params.className;
  if (attendanceRecords[className]) {
    const attendanceData = attendanceRecords[className].map(record => record.daysPresent);
    res.status(200).json({ attendanceData });
  } else {
    res.status(404).json({ message: 'Class not found' });
  }
});

// Endpoint to submit attendance
app.post('/submitAttendance', (req, res) => {
  const { className, attendanceData } = req.body;
  if (attendanceRecords[className]) {
    attendanceRecords[className] = attendanceData;
    res.status(200).json({ message: 'Attendance submitted successfully' });
  } else {
    res.status(404).json({ message: 'Class not found' });
  }
});

// Endpoint to reset attendance
app.post('/resetAttendance', (req, res) => {
  const { className } = req.body;
  if (attendanceRecords[className]) {
    attendanceRecords[className] = [{ studentId: 'S1', daysPresent: 0 }, { studentId: 'S2', daysPresent: 0 }];
    res.status(200).json({ message: 'Attendance reset successfully' });
  } else {
    res.status(404).json({ message: 'Class not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
