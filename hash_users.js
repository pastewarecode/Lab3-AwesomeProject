// Utility script to generate hashed user passwords

// hash_users.js
const CryptoJS = require('crypto-js');
const fs = require('fs');

// Sample user data with plaintext passwords
const rawUsers = [
		{ username: 'joe', password: 'secret' },
		{ username: 'bob', password: 'password' },
];

// Hash passwords using SHA-256
const hashedUsers = rawUsers.map(user => ({
  username: user.username,
  passwordHash: CryptoJS.SHA256(user.password).toString(),
}));

// Output to users.json
fs.writeFileSync('users.json', JSON.stringify(hashedUsers, null, 2));
console.log('✅ Hashed user data written to users.json');
