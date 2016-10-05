import React, { PropTypes } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import elements from '../mocks/elements';

const getIconFromQuery = (query, iconType)  => {for (const element of elements[iconType]) if (element.query === query) return element.icon}

const HeaderElement = ({iconType, results, i}) => (
  <View style={styles.headerElement}>
  {iconType === 'q' ?
    <Text style={{fontFamily: 'devicon', fontSize: 24}}>{getIconFromQuery(results[iconType][i], iconType)}</Text> :
    <Octicons style={{fontSize: 24}} name={getIconFromQuery(results[iconType][i], iconType)} />
  }
  </View>
);

const Header = ({results}) => {
  const elements = [];
  const addOrNot = (iconType, i) => {
    if (results[iconType].length > i && results[iconType][i]) {
      elements.push(<HeaderElement iconType={iconType} results={results} i={i} key={`${iconType}-header-${i}`} />);
    }
  };
  addOrNot('q', 0);
  addOrNot('sort', 0);
  addOrNot('order', 0);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.emotionsContainer}>
        {elements}
      </View>
    </View>
  );
};

Header.propTypes = {
  results: PropTypes.object
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    height: 110,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: 70,
  },
  headerElement: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    height: 32,
    width: 32
  },
  headerLogo: {
    height: 28,
    width: 28
  },
  emotionsContainer: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0
  },
});

export default Header;
