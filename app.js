let velocity = [0, 0, 0]; // Velocity in m/s
let distance = [0, 0, 0]; // Distance in meters
let lastTimestamp = null; // To store the last timestamp
const dt = 0.1; // Time step for calculations (10 Hz)

// Check if the DeviceMotionEvent is supported
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(event) {
        // Get the acceleration values (without gravity)
        var acceleration = event.acceleration;

        // Check if acceleration data is available
        if (acceleration) {
            // Display acceleration data
            document.getElementById('x').innerHTML = 'X: ' + acceleration.x.toFixed(2) + ' m/s²';
            document.getElementById('y').innerHTML = 'Y: ' + acceleration.y.toFixed(2) + ' m/s²';
            document.getElementById('z').innerHTML = 'Z: ' + acceleration.z.toFixed(2) + ' m/s²';

            // Integrate acceleration to get velocity
            for (let i = 0; i < 3; i++) {
                velocity[i] += acceleration[i] * dt;
            }

            // Integrate velocity to get distance
            for (let i = 0; i < 3; i++) {
                distance[i] += velocity[i] * dt;
            }

            // Update distance display
            document.getElementById('distance').innerHTML =
                `Distance: X: ${distance[0].toFixed(2)} m, Y: ${distance[1].toFixed(2)} m, Z: ${distance[2].toFixed(2)} m`;
        }
    });
} else {
    // If DeviceMotionEvent is not supported, display an error message
    document.getElementById('x').innerHTML = 'Accelerometer not supported.';
    document.getElementById('y').style.display = 'none';
    document.getElementById('z').style.display = 'none';
}
