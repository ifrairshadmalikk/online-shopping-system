import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/736x/0f/d6/34/0fd634fa93b940642fd7f509abf5ce6c.jpg', // Background image URL
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <Text style={styles.welcomeTextTop}>🎗Fashion Fuel</Text>
        <Text style={styles.welcomeTextCenter}>
             Discover new things without limitation
        </Text>
      </View>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Get Started ➡</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  welcomeTextTop: {
    fontSize: 40,
    color: '#e91e63', // Dark pink color
    fontWeight: 'bold',
    fontStyle: '', // Italic text
    marginBottom: 5,
     // Space between the texts
  },
  welcomeTextCenter: {
    fontSize: 18,
    color: '#e91e63', // Dark pink color
    fontStyle: 'italic', // Italic text
     
  },
  getStartedButton: {
    width: 180,
    height: 50,
    backgroundColor: '#e91e66', // Dark pink color
    borderRadius: 20, // Slightly rounded edges
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40, // Positioned at the bottom-center
  },
  buttonText: {
    color: 'white', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
