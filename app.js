document.addEventListener('DOMContentLoaded', function () {
    const classSelect = document.getElementById('classSelect');
    const attendanceForm = document.getElementById('attendanceForm');
    const resetButton = document.getElementById('resetButton');
    const ctx = document.getElementById('attendanceChart').getContext('2d');
  
    let attendanceChart;
  
    // Function to render chart
    function renderChart(attendanceData) {
      if (attendanceChart) {
        attendanceChart.destroy(); // Destroy previous chart instance to avoid duplicate charts
      }
  
      attendanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Student 1', 'Student 2'],
          datasets: [{
            label: 'Days Present',
            data: attendanceData,
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    // Function to fetch attendance data from the backend for selected class
    async function fetchAttendanceData(className) {
      try {
        const response = await fetch(`http://localhost:3000/attendance/${className}`);
        const data = await response.json();
        if (response.status === 200) {
          renderChart(data.attendanceData);
        } else {
          alert('Error fetching attendance data');
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    }
  
    // Event listener for class selection
    classSelect.addEventListener('change', (event) => {
      const selectedClass = event.target.value;
      fetchAttendanceData(selectedClass);
    });
  
    // Function to handle attendance submission
    async function submitAttendance(event) {
      event.preventDefault();
  
      const className = document.getElementById('className').value;
      const attendanceData = [
        { studentId: 'S1', daysPresent: parseInt(document.getElementById('S1').value) },
        { studentId: 'S2', daysPresent: parseInt(document.getElementById('S2').value) }
      ];
  
      try {
        const response = await fetch('http://localhost:3000/submitAttendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ className, attendanceData })
        });
  
        const data = await response.json();
        if (response.status === 200) {
          alert(data.message);
          fetchAttendanceData(className); // Refresh the chart with updated data
        } else {
          alert('Error submitting attendance');
        }
      } catch (error) {
        console.error('Error submitting attendance:', error);
        alert('Error submitting attendance');
      }
    }
  
    // Function to reset attendance data
    async function resetAttendance() {
      const className = document.getElementById('className').value;
  
      try {
        const response = await fetch('http://localhost:3000/resetAttendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ className })
        });
  
        const data = await response.json();
        if (response.status === 200) {
          alert(data.message);
          document.getElementById('S1').value = 0;
          document.getElementById('S2').value = 0;
          fetchAttendanceData(className); // Refresh the chart with reset data
        } else {
          alert('Error resetting attendance');
        }
      } catch (error) {
        console.error('Error resetting attendance:', error);
        alert('Error resetting attendance');
      }
    }
  
    // Add event listeners
    if (attendanceForm) {
      attendanceForm.addEventListener('submit', submitAttendance);
    }
  
    if (resetButton) {
      resetButton.addEventListener('click', resetAttendance);
    }
  
    // Load initial data for the first selected class
    fetchAttendanceData(classSelect.value);
  });
  