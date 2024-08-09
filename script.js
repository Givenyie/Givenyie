```
import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
	// Your Firebase config here
});

const auth = firebase.auth();

const createAccountForm = document.getElementById('create-account-form');
const createAccountBtn = document.getElementById('create-account-btn');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const profileInfo = document.getElementById('profile-info');

createAccountBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	auth.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			userCredential.user.updateProfile({
				displayName: username
			});
		})
		.catch((error) => {
			console.error('Error creating user account:', error);
			alert('Error creating account: ' + error.message);
		});
});

loginBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const email = document.getElementById('login-email').value;
	const password = document.getElementById('login-password').value;
	auth.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			console.log('User logged in:', userCredential.user);
		})
		.catch((error) => {
			console.error('Error logging in:', error);
			alert('Error logging in: ' + error.message);
		});
});

auth.onAuthStateChanged((user) => {
	if (user) {
		profileInfo.innerHTML = `
			<h2>Welcome, ${user.displayName}!</h2>
			<button id="logout-btn">Logout</button>
		`;
	} else {
		profileInfo.innerHTML = '';
	}
});

logoutBtn.addEventListener('click', () => {
	auth.signOut()
		.then(() => {
			console.log('User logged out');
		})
		.catch((error) => {
			console.error('Error logging out:', error);
		});
});
```

