_script.js_
```
// Short Video Messages with TTL
const videoInput = document.getElementById('video-input');
const videoPreview = document.getElementById('video-preview');
const sendVideoBtn = document.getElementById('send-video-btn');
const videoMessagesContainer = document.getElementById('video-messages-container');

videoInput.addEventListener('change', (e) => {
  const videoFile = e.target.files[0];
  // Upload video to Firebase Storage
  const storageRef = firebase.storage().ref();
  const videoRef = storageRef.child(`videos/${videoFile.name}`);
  videoRef.put(videoFile).then((snapshot) => {
    // Get video URL
    const videoUrl = snapshot.downloadURL;
    // Send video message to Firebase Realtime Database or Cloud Firestore
    const videoMessage = {
      sender: auth.currentUser.uid,
      videoUrl: videoUrl,
      timestamp: Date.now(),
      ttl: 86400 // 1 day in seconds
    };
    firebase.database().ref('videoMessages').push(videoMessage);
  });
});

// Display video messages
firebase.database().ref('videoMessages').on('child_added', (data) => {
  const videoMessage = data.val();
  const videoContainer = document.createElement('div');
  videoContainer.innerHTML = `
    <video width="100%" controls>
      <source src="${videoMessage.videoUrl}" type="video/mp4">
    </video>
    <p>Expires in: <span id="timer-${data.key}"></span></p>
    <button onclick="deleteMessage('${data.key}')">Delete</button>
  `;
  videoMessagesContainer.appendChild(videoContainer);
  // Start countdown timer
  countdownTimer(data.key, videoMessage.ttl);
  // Delete message after TTL expires
  setTimeout(() => {
    firebase.database().ref(`videoMessages/${data.key}`).remove();
  }, videoMessage.ttl * 1000);
});

// Countdown timer function
function countdownTimer(key, ttl) {
  const timerSpan = document.getElementById(`timer-${key}`);
  const interval = setInterval(() => {
    const timeLeft = ttl - Math.floor((Date.now() - firebase.database().ref('videoMessages').child(key).child('timestamp').val()) / 1000);
    timerSpan.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}

// Delete message function
function deleteMessage(key) {
  firebase.database().ref(`videoMessages/${key}`).remove();
}

// Format time function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}:${secondsLeft.toString().padStart(2, '0')}`;
}
```

_html_
```
<div id="video-messages-container"></div>
<input type="file" id="video-input" accept="video/*">
<button id="send-video-btn">Send Video</button>
```

_script.js_
```
// Short Video Messages with TTL
const videoInput = document.getElementById('video-input');
const videoPreview = document.getElementById('video-preview');
const sendVideoBtn = document.getElementById('send-video-btn');
const videoMessagesContainer = document.getElementById('video-messages-container');

videoInput.addEventListener('change', (e) => {
  const videoFile = e.target.files[0];
  // Upload video to Firebase Storage
  const storageRef = firebase.storage().ref();
  const videoRef = storageRef.child(`videos/${videoFile.name}`);
  videoRef.put(videoFile).then((snapshot) => {
    // Get video URL
    const videoUrl = snapshot.downloadURL;
    // Send video message to Firebase Realtime Database or Cloud Firestore
    const videoMessage = {
      sender: auth.currentUser.uid,
      videoUrl: videoUrl,
      timestamp: Date.now(),
      ttl: 86400 // 1 day in seconds
    };
    firebase.database().ref('videoMessages').push(videoMessage);
  });
});

// Display video messages
firebase.database().ref('videoMessages').on('child_added', (data) => {
  const videoMessage = data.val();
  const videoContainer = document.createElement('div');
  videoContainer.innerHTML = `
    <video width="100%" controls>
      <source src="${videoMessage.videoUrl}" type="video/mp4">
    </video>
    <p>Expires in: <span id="timer-${data.key}"></span></p>
    <button onclick="deleteMessage('${data.key}')">Delete</button>
  `;
  videoMessagesContainer.appendChild(videoContainer);
  // Start countdown timer
  countdownTimer(data.key, videoMessage.ttl);
  // Delete message after TTL expires
  setTimeout(() => {
    firebase.database().ref(`videoMessages/${data.key}`).remove();
  }, videoMessage.ttl * 1000);
});

// Countdown timer function
function countdownTimer(key, ttl) {
  const timerSpan = document.getElementById(`timer-${key}`);
  const interval = setInterval(() => {
    const timeLeft = ttl - Math.floor((Date.now() - firebase.database().ref('videoMessages').child(key).child('timestamp').val()) / 1000);
    timerSpan.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}

// Delete message function
function deleteMessage(key) {
  firebase.database().ref(`videoMessages/${key}`).remove();
}

// Format time function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}:${secondsLeft.toString().padStart(2, '0')}`;
}
```

_html_
```
<div id="video-messages-container"></div>
<input type="file" id="video-input" accept="video/*">
<button id="send-video-btn">Send Video</button>
```

