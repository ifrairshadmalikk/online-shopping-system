import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'https://ifrahsproject-default-rtdb.firebaseio.com'; // Replace with your actual Firebase URL


const CartScreen = ({ cart, setCart }) => {
  const navigation = useNavigation();
  const [updateQuantity, setUpdateQuantity] = useState('');
  const [isUpdating, setIsUpdating] = useState(null);
  
  const getCartData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart.json`);
      const data = response.data;
      if (data) {
        const itemsArray = Object.entries(data).map(([id, item]) => ({
          id,
          categoryId: item.categoryId,
          image: item.image,
          title: item.title,
          reviews: item.reviews,
          price: item.price,
          quantity: item.quantity || 1, // Ensure quantity field is present
        }));
        setCart(itemsArray); // Update local state with the fresh cart data
      }
    } catch (error) {
      console.error('Error fetching cart data:', error.response ? error.response.data : error.message);
    }
  };

  // Update quantity in Firebase using axios
  const updateCartItem = async (id, updatedProduct) => {
    try {
      await axios.put(`${BASE_URL}/cart/${id}.json`, updatedProduct);
      Alert.alert('Quantity Updated');
      setIsUpdating(null); // Reset the state after updating
      setUpdateQuantity(''); // Clear the input field after update

      // Update the local state (cart) to reflect the change
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: updatedProduct.quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
  };

  // Delete product from Firebase using axios
  const deleteCartItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${id}.json`);
      Alert.alert('Deleted', 'Item has been removed from your cart');

      // Remove the item from the local state (cart) after deletion
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      
      // Optionally, you can re-fetch cart data to sync with Firebase
      getCartData(); // Refetch cart data after deletion (can be skipped if you already update local state)
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
    }
  };

  // Calculate total price
  const calculateTotal = (cart) => {
    return cart
      .reduce((total, item) => total + (parseFloat(item.price.slice(1)) * item.quantity), 0)
      .toFixed(2);
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    getCartData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Cart Items</Text>

      {/* List of Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
            <Text style={{ flex: 1 }}>{item.title}</Text>

            {/* Update Option */}
            {isUpdating === item.id ? (
              <TextInput
                value={updateQuantity}
                onChangeText={setUpdateQuantity}
                keyboardType="numeric" // Ensure the input is numeric
                style={{ borderWidth: 1, marginRight: 10, width: 50 }}
              />
            ) : (
              <Text style={{ marginRight: 10 }}>Quantity: {item.quantity}</Text>
            )}

            {/* Buttons for Update, Delete */}
            {isUpdating === item.id ? (
              <Button
                title="Save"
                onPress={() => {
                  const updatedItem = { ...item, quantity: parseInt(updateQuantity) }; // Update quantity
                  updateCartItem(item.id, updatedItem); // Save the updated quantity
                }}
              />
            ) : (
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {
                  setIsUpdating(item.id);
                  setUpdateQuantity(item.quantity.toString()); // Pre-fill the input with the current quantity
                }}
              >
                <Text style={styles.addToCartText}>Update Quantity</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => deleteCartItem(item.id)}
            >
              <Text style={styles.addToCartText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Total: ${calculateTotal(cart)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => navigation.navigate('CheckoutScreen', { cart })}
      >
        <Text style={styles.addToCartText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};



export default CartScreen;


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  image: {
    width: 150, // Adjust the width according to your needs
    height: 150, // Adjust the height according to your needs
    marginBottom: 20,
     // Space between the image and text
  },
  container1: {
    flex: 1, // Ensure the container takes up the full screen height
    justifyContent: 'center', // Centers children vertically
    alignItems: 'center', // Centers children horizontally
    padding: 20,
    backgroundColor: '#ffff',
  },
  container3: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    color: '#28a745',
    marginBottom: 8,
  },
  productReviews: {
    fontSize: 16,
    color: '#777',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  headerText1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  orderConfirmationText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  header: {
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBar: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  searchIcon: {
    marginLeft: -30,
  },
  categoryList: {
    marginVertical: 10,
  },
  formContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
  },
  input1: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  category: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    marginTop: 5,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  productTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  productReviews: {
    fontSize: 12,
    color: 'gray',
  },
  productPrice: {
    fontSize: 14,
    color: '#d9534f',
    marginTop: 5,
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#e91e63',
    paddingVertical: 5,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    textAlign: 'center',
  },
  productRow: {
    justifyContent: 'space-between', // or another valid value like 'center', 'flex-start'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#e91e63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
 
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

