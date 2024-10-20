document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-btn');
    const classSelect = document.getElementById('class-select');
    const presentInput = document.getElementById('present-input');
    const absentInput = document.getElementById('absent-input');
    const chartCanvas = document.getElementById('attendanceChart');

    let attendanceChart;

    // Function to submit attendance data to the backend
    async function submitAttendance(className, presentCount, absentCount) {
        try {
            await fetch('https://attendance-management-rvzk.onrender.com/submit-attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    className,
                    present: presentCount,
                    absent: absentCount
                })
            });
        } catch (error) {
            console.error("Error submitting attendance:", error);
        }
    }

    // Function to fetch attendance data from the backend
    async function fetchAttendanceData(className) {
        try {
            const response = await fetch(`https://attendance-management-rvzk.onrender.com/attendance-data?class=${className}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    }


    // Function to render the chart
    function renderChart(attendanceData) {
        if (attendanceChart) {
            attendanceChart.destroy();  // Destroy existing chart to avoid canvas re-use error
        }

        const labels = ['Present', 'Absent'];
        const data = attendanceData ? [attendanceData.present, attendanceData.absent] : [0, 0];

        attendanceChart = new Chart(chartCanvas, {
            type: 'pie', // or 'bar'
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#4CAF50', '#FF6384']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // When the submit button is clicked
    submitButton.addEventListener('click', async function () {
        const className = classSelect.value;
        const presentCount = parseInt(presentInput.value) || 0;
        const absentCount = parseInt(absentInput.value) || 0;

        // Send attendance data to the backend
        await submitAttendance(className, presentCount, absentCount);

        // Fetch updated attendance data and re-render the chart
        const attendanceData = await fetchAttendanceData(className);
        renderChart(attendanceData);
    });

    // Initial chart rendering
    const initialClass = classSelect.value;
    fetchAttendanceData(initialClass).then(data => {
        renderChart(data);
    });

    // Add event listener for class change
    classSelect.addEventListener('change', async function () {
        const selectedClass = this.value;
        const attendanceData = await fetchAttendanceData(selectedClass);
        renderChart(attendanceData);
    });
});
