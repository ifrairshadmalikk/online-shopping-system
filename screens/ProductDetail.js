import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';

import { StyleSheet} from 'react-native';
const ProductDetail = ({ route }) => {
  const { product } = route.params;

  const addToCart = () => {
    Alert.alert('Success', `${product.title} has been added to the cart!`);
  };

  return (
    <View style={styles.detailsContainer}>
      <Image source={{ uri: product.image }} style={styles.detailsImage} />
      <Text style={styles.titleText}>{product.title}</Text>
      <Text style={styles.priceText}>{product.price}</Text>
        <Text style={styles.titleText}>{product.description}</Text>
      <TouchableOpacity  style={styles.addToCartButton} onPress={addToCart}>
      
        <Text style={styles. buttonText}>Add to Cart</Text>
         
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
  detailsImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
    marginBottom: 16, // Space between image and other elements
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#007BFF', // Blue button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
