import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
import CryptoJS from 'crypto-js';
import userData from '../src/data/users.json'; // Import the JSON file with hashed passwords

export interface IUser {
	username: string;
	password: string;
}

interface IStoredUser {
	username: string;
	passwordHash: string;
}

interface IProps {
	onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Login'> & IProps;

export default function Login(props: TProps) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	/*
	 * ERROR: Hardcoded user data
	 *
	 * FIX: Hashed passwords and stored them securely, updated code for compatibility.
	 */
	// const users: IUser[] = [
	// 	{ username: 'joe', password: 'secret' },
	// 	{ username: 'bob', password: 'password' },
	// ];
	const users: IStoredUser[] = userData;

	function login() {
		const hashedInputPassword = CryptoJS.SHA256(password).toString();

		const matchedUser = users.find(
			user =>
				user.username.toLowerCase() === username.toLowerCase() &&
				user.passwordHash === hashedInputPassword
		);

		if (matchedUser) {
			// Pass a cleaned-up user object (without password hash)
			props.onLogin({ username: matchedUser.username, password: '' });
		} else {
			Alert.alert('Error', 'Username or password is invalid.');
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.username}
				value={username}
				onChangeText={setUsername}
				placeholder="Username"
			/>
			<TextInput
				style={styles.password}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
			/>
			<Button title="Login" onPress={login} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	username: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	password: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	}
});