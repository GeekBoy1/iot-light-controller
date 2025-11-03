// TODO: Replace with your Firebase config later
const firebaseConfig = {
    apiKey: "AIzaSyDJXwqQOdTKflJ5IL_8M-aQv0x3tkksXns",
  authDomain: "student-light-controller.firebaseapp.com",
  projectId: "student-light-controller",
  storageBucket: "student-light-controller.firebasestorage.app",
  messagingSenderId: "939189427217",
  appId: "1:939189427217:web:91277522c6efb7dc3725b0",
  measurementId: "G-5XEX05C2PD"
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
