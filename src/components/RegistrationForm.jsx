import { useReducer } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const initialState = {
	name: "",
	email: "",
	password: "",
	message: ""
};

function registrationReducer(state, action) {
	switch (action.type) {
		case 'SET_FIELD':
			return { ...state, [action.field]: action.value };
		case 'SET_MESSAGE':
			return { ...state, message: action.message };
		case 'RESET_FIELDS':
			return {
				...state,
				name: "",
				email: "",
				password: ""
			};
		default:
			return state;
	};
};

export function RegistrationForm() {
	const [state, dispatch] = useReducer(registrationReducer, initialState);

	const handleSubmit = () => {
		const { name, email, password } = state;

		if (name && email && password) {
			dispatch({ type: 'SET_MESSAGE', message: `Welcome, ${name}` });
			dispatch({ type: 'RESET_FIELDS' });
		} else {
			dispatch({ type: 'SET_MESSAGE', message: 'Please fill in all fields.' });
		};
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Register</Text>
			<TextInput
				style={styles.input}
				placeholder="Name"
				value={state.name}
				onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: "name", value: text })}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={state.email}
				onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: "email", value: text })}
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={state.password}
				onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: "password", value: text })}
				secureTextEntry
			/>
			<Button
				title="Register"
				onPress={handleSubmit}
			/>
			{state.message && <Text>{state.message}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#333'
	},
	input: {
		height: 40,
		width: '80%',
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
		borderRadius: 8
	}
});