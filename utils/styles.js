import {
 
  StyleSheet
} from 'react-native';

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