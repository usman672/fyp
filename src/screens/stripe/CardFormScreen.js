import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import stripe from 'tipsi-stripe';
import Button from '../../components/stripe/Button';
stripe.setOptions({
  publishableKey:
    'pk_test_51GsCkoJngS3nWOeWuwVxkps0ZRWzSq2sHSTH223Tv87QTuf42F5TW2JO7P6Cs33CfRCGiemBmDPZHyY0Z2BagMBm00V0aU2N0I',
});
export default class CardFormScreen extends PureComponent {
  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
    success: null,
  };

  doPayment = async () => {
    // Use firebase serve for local testing if you don't have a paid firebase account

    await fetch('http://192.168.100.21:8000/api/doPayment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFiMjU3Mzg2MjA1MjEzMTg4ZTRlNGIiLCJpYXQiOjE1OTc2OTIxNzJ9.nHarYcFziNBXIz2qmxlX5PQe9bdikg1gGmnkEopoEUo',
      },
      body: JSON.stringify({
        token: this.state.token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          success: responseJson.status == 'succeeded' ? true : false,
          response: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null });
      const token = await stripe.paymentRequestWithCardForm({
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Enappd Store',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: '',
            country: 'Estonia',
            postalCode: '31217',
            email: 'admin@enappd.com',
          },
        },
      });

      this.setState({ loading: false, token });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, token, success, response } = this.state;

    return (
      <View style={styles.container}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: 'https://enappd.com/static/images/enappd-logo-blue.png',
          }}
        />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Stripe Payment in React Native</Text>
          <Text style={styles.subtitle}>by Enappd</Text>
        </View>
        <Text style={styles.header}>Card Form Example</Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
        />
        <View style={styles.token}>
          {token && (
            <>
              <Text style={styles.instruction}>Token: {token.tokenId}</Text>
              <Button
                text="Make Payment"
                loading={loading}
                onPress={this.doPayment}
              />
            </>
          )}
          {success && (
            <>
              <Text style={styles.instruction}>Status: {response.status}</Text>
              <Text style={styles.instruction}>ID: {response.id}</Text>
              <Text style={styles.instruction}>Amount: {response.amount}</Text>
            </>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitle: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});
