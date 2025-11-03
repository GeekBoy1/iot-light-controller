// TODO: Replace with your Firebase config later
const firebaseConfig = {
    apiKey: "AIzaSyAWuFuG120Xab2Ev64I8wNv3tTIBKtrpPw",
    authDomain: "copper-triumph-332605.firebaseapp.com",
    databaseURL: "https://demo.firebaseio.com",
    projectId: "copper-triumph-332605",
    storageBucket: "copper-triumph-332605.firebasestorage.app",
    messagingSenderId: "591607114664",
    appId: "1:591607114664:web:3faf538edfe6d3715a8b9d"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM Elements
const lightSwitch = document.getElementById('lightSwitch');
const statusText = document.getElementById('status');

console.log("🔥 Connected to REAL Firebase!");

// Listen for changes from ANY device
database.ref('lightState').on('value', (snapshot) => {
    if (snapshot.exists()) {
        const isLightOn = snapshot.val();

        if (isLightOn) {
            lightSwitch.textContent = 'ON';
            lightSwitch.className = 'on';
            statusText.textContent = 'Light is: ON 🟢';
            console.log("📱 Light turned ON (from another device)");
        } else {
            lightSwitch.textContent = 'OFF';
            lightSwitch.className = 'off';
            statusText.textContent = 'Light is: OFF 🔴';
            console.log("📱 Light turned OFF (from another device)");
        }
    }
});

// When button is clicked - update for ALL devices
lightSwitch.addEventListener('click', () => {
    const currentState = lightSwitch.classList.contains('on');
    const newState = !currentState;

    // This updates Firebase, which triggers the listener above
    database.ref('lightState').set(newState)
        .then(() => {
            console.log(`✅ Updated Firebase: ${newState ? 'ON' : 'OFF'}`);
        })
        .catch((error) => {
            console.error('❌ Firebase error:', error);
        });
});

// Check connection status
database.ref('.info/connected').on('value', (snapshot) => {
    if (snapshot.val() === true) {
        console.log("🌍 Connected to Firebase - Live updates enabled!");
    } else {
        console.log("❌ Disconnected from Firebase");
    }
});