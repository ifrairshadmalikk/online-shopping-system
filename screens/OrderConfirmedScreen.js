import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const OrderConfirmedScreen = ({ route }) => {
  const orderDetails = route?.params || null;

  if (!orderDetails) {
    return (
      <View style={styles.container1}>
        <Text style={styles.headerText1}>No Order Found</Text>
        <Text style={styles.orderConfirmationText}>
          Please place an order to view the confirmation screen.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container1}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/c9/73/56/c97356032ef81b89504fd43d8d35c115.jpg',
        }}
        style={styles.image}
      />
      <Text style={styles.headerText1}>Order Confirmed</Text>
      <Text style={styles.orderConfirmationText}>
        Thank you for your order! Your order is being processed and will be shipped soon.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerText1: {
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
  },
  orderConfirmationText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default OrderConfirmedScreen;
