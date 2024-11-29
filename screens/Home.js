import React, { useState,useEffect } from 'react'; 
import {
  View,Text, StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {  Button } from 'react-native';
import {addToCartFirebase } from './CartScreen'
import { Ionicons } from '@expo/vector-icons';
import CartScreen from './CartScreen'
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';

const BASE_URL = 'https://ifrahsproject-default-rtdb.firebaseio.com';
const HomeScreen = ({ cart, setCart }) => {
  
  const categories = [
    { id: '1', name: 'Clothing', image: 'https://i.pinimg.com/enabled_lo_mid/236x/9e/54/07/9e540776485e17ab81c54914711c1c29.jpg' },
    { id: '2', name: 'Heel', image: 'https://i.pinimg.com/enabled_lo_mid/236x/01/35/05/0135051e1d642b59b6347597ea1435fe.jpg' },
    { id: '3', name: 'Beauty', image: 'https://i.pinimg.com/enabled_lo_mid/474x/e5/b9/d7/e5b9d7a6a43a20d6b5fe3614a8ffd24a.jpg' },
    { id: '4', name: 'Jewelry', image: 'https://i.pinimg.com/736x/79/ea/57/79ea579708e7f4ef86e1474f5ea0a533.jpg' },
    { id: '6', name: 'Watches', image: 'https://i.pinimg.com/236x/4a/2a/28/4a2a2809b54f1892374be893d6e2cfb7.jpg' },
    { id: '5', name: 'Jackets', image: 'https://i.pinimg.com/236x/57/4c/fc/574cfc3a7e21cba50b3551e1a10d7ef6.jpg' },
  ];
  
  const allProducts = [
    {
      id: '1',
      categoryId: '1', // Clothing
      image: 'https://i.pinimg.com/736x/02/f2/4d/02f24d52ded5010f8f968675f29602ec.jpg',
      title: 'Solid Color Notch Neck Blouse',
      reviews: '26,793',
      price: '$12.99',
    },
    {
      id: '2',
      categoryId: '1', // Curve & Plus
      image: 'https://i.pinimg.com/736x/e7/ed/f4/e7edf46c91aedc22dd021164ed82f3e8.jpg',
      title: 'Asymmetrical Long Sleeve Dress',
      reviews: '61,708',
      price: '$19.99',
    },
    {
      id: '3',
      categoryId: '3', // Beauty
      image: 'https://i.pinimg.com/enabled_lo_mid/736x/9e/dc/49/9edc49c17cf4620a973d653bd13b48b3.jpg',
      title: 'Lipstick Set',
      reviews: '12,000',
      price: '$15.99',
    },
    {
      id: '4',
      categoryId: '4', // Jewelry
      image: 'https://i.pinimg.com/enabled_lo_mid/236x/84/9a/eb/849aebe96fd4e51866ecfda111469bdb.jpg',
      title: 'Gold Necklace',
      reviews: '8,000',
      price: '$29.99',
    },
       {
      id: '5',
      categoryId: '6', // watches
      image: 'https://i.pinimg.com/736x/95/bf/e9/95bfe9b6d8104cf1c62df7c176deaf57.jpg',
      title: 'Watch',
      reviews: '8,000',
      price: '$39.99',
    },
       {
      id: '6',
      categoryId: '5', // Jewelry
      image: 'https://i.pinimg.com/736x/db/73/89/db73892a22fa26466f4dcf4c95392a2b.jpg',
      title: 'Jackets',
      reviews: '9,000',
      price: '$60.99',
    },
       {
      id: '7',
      categoryId: '5', // Jewelry
      image: 'https://i.pinimg.com/736x/59/13/96/591396fd2b6745efbf1a684c1b918a0f.jpg',
      title: 'Fur Jackets',
      reviews: '7,000',
      price: '$34.99',
    },
       {
      id: '8',
      categoryId: '3', // Jewelry
      image: 'https://i.pinimg.com/236x/4f/60/e8/4f60e8624e069183a514917ad0268762.jpg',
      title: 'Lipstick',
      reviews: '7,000',
      price: '$15.99',
    },

     {
      id: '9',
      categoryId: '4', // Jewelry
      image: 'https://i.pinimg.com/736x/36/22/4f/36224fe53169947e61300224562d3eea.jpg',
      title: 'Girls Watch',
      reviews: '6,000',
      price: '$30.99',
    },
    
    {
      id: '10',
      categoryId: '5', // Jewelry
      image: 'https://i.pinimg.com/736x/59/13/96/591396fd2b6745efbf1a684c1b918a0f.jpg',
      title: 'fur jacket',
      reviews: '6,000',
      price: '$30.99',
    },
       {
      id: '11',
      categoryId: '2', // Jewelry
      image: 'https://i.pinimg.com/736x/63/51/1e/63511ee9f8264656c6cc4092809910aa.jpg',
      title: 'coat shoes',
      reviews: '6,000',
      price: '$30.99',
    },
    {
     id: '12',
      categoryId: '2', // Jewelry
      image: 'https://i.pinimg.com/736x/11/ce/f5/11cef5438412cf1d49e8ea338d63c3d6.jpg',
      title: 'High Heels',
      reviews: '6,000',
      price: '$30.99',
    },
     
  ]; 
  
const navigation = useNavigation();
  // Add a product to the cart (both local state and Firebase)
  const addToCartFirebase = async (product) => {
    try {
      console.log('Adding product to Firebase:', product);
      const response = await axios.post(`${BASE_URL}/cart.json`, product);
      console.log('Product added to Firebase:', response.data); // Log Firebase response
    } catch (error) {
      console.error('Error adding to Firebase:', error);
    }
  };
  // Add product to cart locally and Firebase
  const addToCart = async (product) => {
    // Update local state immediately
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Show success toast notification
    Toast.show({
      type: 'success',
      position: 'Top',
      text1: `${product.title} added to cart`,
      text2: `You have added ${product.title} to your cart.`,
      visibilityTime: 1000,
      autoHide: true,
    });

    // Add product to Firebase
    await addToCartFirebase(product);
  };


  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const handleCategorySelect = (categoryId) => {
    if (categoryId === 'all') {
      setFilteredProducts(allProducts); // Show all products
    } else {
      setFilteredProducts(allProducts.filter((product) => product.categoryId === categoryId));
    }
  };
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discover your style without limitation</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={searchQuery}
          onChangeText={handleSearch} // Update search query
        />
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
      </View>
     

<FlatList
  horizontal
  data={categories}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.category}
      onPress={() => handleCategorySelect(item.id)} // Handle category selection
    >
      <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  )}
  showsHorizontalScrollIndicator={false}
  style={styles.categoryList}
/>

<FlatList
  data={filteredProducts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.productCard}>
      {/* Product Card - Touchable */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { product: item })} // Navigate to product detail
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productReviews}>{item.reviews} reviews</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>

      {/* Add to Cart Button */}
      <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart(item)} // Add to local cart and Firebase
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
    </View>
  )}
  numColumns={2}
  columnWrapperStyle={styles.productRow}
/>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
    addToCartButton1: {
    paddingVertical: 12, // Adjust for button height
    paddingHorizontal: 20, // Adjust for button width
  },
  addToCartText1: {
    fontSize: 18, // Increase or decrease font size
    fontWeight: 'bold',
    color: '#fff', // Text color
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
    paddingVertical: 20,
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