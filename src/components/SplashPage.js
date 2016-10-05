import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

class SplashPage extends Component {
  componentWillMount() {
    const navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        name: 'Q'
      });
    }, 500);
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.text}>GitHub Explorer <Octicons name="rocket" style={styles.text} /></Text>
      </View>
    );
  }
}

SplashPage.propTypes = {
  navigator: PropTypes.object
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#424242',
    fontSize: 32,
  }
});

export default SplashPage;
