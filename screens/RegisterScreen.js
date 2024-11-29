import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    if (email === '' || password === '') {
      alert('Error: Email and Password cannot be empty');
      return;
    }

    try {
      // Create a new user using Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful!');
     navigation.navigate('Main'); // Navigate to Login after registration
    } catch (error) {
      console.error('Error during registration: ', error.message);
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/736x/0f/d6/34/0fd634fa93b940642fd7f509abf5ce6c.jpg',
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.circle}>
          <ImageBackground
            source={{
              uri: 'https://i.pinimg.com/736x/2d/61/88/2d618835e6b583d2ba65df62a6a3c983.jpg',
            }}
            style={styles.circleImage}
            imageStyle={{ borderRadius: 75 }}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  linkText: {
    marginTop: 15,
    color: '#E91E63',
    textDecorationLine: 'underline',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 
 