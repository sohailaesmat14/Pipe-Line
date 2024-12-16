async function fetchData() {
    try {
        const response = await fetch("http://127.0.0.1:5000/get_data");
        const data = await response.json();

        document.getElementById("temp-reading").innerText = data.temperature + " °C";
        document.getElementById("pressure-reading").innerText = data.pressure + " hPa";
        document.getElementById("humidity-reading").innerText = data.humidity + " g.m⁻³";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// تحديث البيانات كل ثانية
setInterval(fetchData, 1000);

const videoContainer = document.getElementById('video-container');
const liveStream = document.getElementById('live-stream');

checkCameraConnection();

// إعداد الخريطة باستخدام Leaflet
const map = L.map('map').setView([30.0444, 31.2357], 15); // [30.0444, 31.2357] = إحداثيات افتراضية

// إضافة طبقة خريطة من OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// إضافة Marker للروبوت
let robotMarker = L.marker([30.0444, 31.2357]).addTo(map);

// تحديث مكان الروبوت بناءً على GPS
function updateRobotPosition(latitude, longitude) {
    robotMarker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], 15);
}

// تحديث مكان الروبوت بشكل وهمي كل 3 ثوانٍ (للتجربة)
setInterval(() => {
    const newLatitude = 30.0444 + Math.random() * 0.01 - 0.005;
    const newLongitude = 31.2357 + Math.random() * 0.01 - 0.005;
    updateRobotPosition(newLatitude, newLongitude);
}, 3000);