_script.js_
```
// Messages
const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message-btn');
const messagesContainer = document.getElementById('messages-container');

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const message = messageInput.value;
    // Send message to Firebase Realtime Database or Cloud Firestore
    firebase.database().ref('messages').push({
      sender: auth.currentUser.uid,
      message: message,
      timestamp: Date.now()
    });
    messageInput.value = '';
  }
});

// Calls
const callBtn = document.getElementById('call-btn');
const hangUpBtn = document.getElementById('hang-up-btn');

callBtn.addEventListener('click', () => {
  // Make voice call using WebRTC
  const peerConnection = new RTCPeerConnection();
  // ...
});

hangUpBtn.addEventListener('click', () => {
  // Hang up voice call
  peerConnection.close();
});

// Video Calls
const videoCallBtn = document.getElementById('video-call-btn');
const hangUpVideoBtn = document.getElementById('hang-up-video-btn');

videoCallBtn.addEventListener('click', () => {
  // Make video call using WebRTC
  const peerConnection = new RTCPeerConnection();
  // ...
});

hangUpVideoBtn.addEventListener('click', () => {
  // Hang up video call
  peerConnection.close();
});

// Chat Background Images
const backgroundImgInput = document.getElementById('background-img-input');
const setBackgroundBtn = document.getElementById('set-background-btn');

backgroundImgInput.addEventListener('change', (e) => {
  const backgroundImg = e.target.files[0];
  // Upload background image to Firebase Storage
  const storageRef = firebase.storage().ref();
  const imgRef = storageRef.child(`background-images/${backgroundImg.name}`);
  imgRef.put(backgroundImg).then((snapshot) => {
    // Set background image URL
    const backgroundImgUrl = snapshot.downloadURL;
    // Update chat background image
    messagesContainer.style.backgroundImage = `url(${backgroundImgUrl})`;
  });
});

// Communities
const createCommunityBtn = document.getElementById('create-community-btn');
const joinCommunityBtn = document.getElementById('join-community-btn');

createCommunityBtn.addEventListener('click', () => {
  // Create community in Firebase Realtime Database or Cloud Firestore
  const communityName = prompt('Enter community name');
  firebase.database().ref('communities').push({
    name: communityName,
    members: [auth.currentUser.uid]
  });
});

joinCommunityBtn.addEventListener('click', () => {
  // Join community in Firebase Realtime Database or Cloud Firestore
  const communityName = prompt('Enter community name');
  const communityRef = firebase.database().ref(`communities/${communityName}`);
  communityRef.once('value', (data) => {
    if (data.exists()) {
      // Add user to community members
      communityRef.update({
        members: [...data.val().members, auth.currentUser.uid]
      });
    }
  });
});
```

_html_
```
<div id="messages-container"></div>
<input type="text" id="message-input" placeholder="Message">
<button id="send-message-btn">Send</button>
<button id="call-btn">Call</button>
<button id="hang-up-btn">Hang Up</button>
<button id="video-call-btn">Video Call</button>
<button id="hang-up-video-btn">Hang Up Video</button>
<input type="file" id="background-img-input" accept="image/*">
<button id="set-background-btn">Set Background</button>
<button id="create-community-btn">Create Community</button>
<button id="join-community-btn">Join Community</button>
```
