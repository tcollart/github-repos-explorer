import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

function getReposFromApiAsync(language='javascript', sort='stars', order='asc') {
  return fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=${sort}&order=${order}`)
    .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  });
}

const ItemExample = ({name, language, stars, forks, url, title, onPressCard}) => (
  <TouchableOpacity onPress={() => onPressCard(url, title)}>
    <View style={{borderColor: '#424242', borderWidth: 1, margin: 2}}>
      <View style={styles.itemExamplesTitleContainer}>
        <Text style={styles.itemExamplesTitle}>{name}</Text>
      </View>
      <View style={styles.detailsInfosContainer}>
        <View style={styles.detailsInfo}>
          <Text style={styles.heartNumber}>stars: {stars} - </Text>
          <Text style={styles.heartNumber}>forks: {forks}</Text>
        </View>
        <View style={styles.kmInfo}>
          <Text style={styles.kmText}>{language}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

class List extends React.Component {
  constructor() {
    super();
    this.state = {items: []};
  }

  componentWillMount() {
    const results = this.props.results;
    getReposFromApiAsync(results.q[0], results.sort[0], results.order[0]).then(
      result => this.setState({items: result.items})
    );
  }

  render() {
    const onPressCard = (url, title) => {
      this.props.navigator.push({name: 'Details', url, title});
    }
    return (
      <View style={[styles.listContainer, {backgroundColor: 'white'}]}>
        <ScrollView style={styles.list}>
          {this.state.items.map(item =>
            <ItemExample
              name={item.name}
              language={item.language}
              stars={item.stargazers_count}
              forks={item.forks_count}
              url={item.url}
              title={item.name}
              onPressCard={onPressCard}
              key={item.name}
            />)}
        </ScrollView>
      </View>
    );
  }
}

List.propTypes = {
  navigator: PropTypes.object,
  results: PropTypes.object
};

const styles = StyleSheet.create({
  itemExamplesTitleContainer: {
    margin: 10,
    marginLeft: 15
  },
  itemExamplesTitle: {
    color: '#424242',
    fontWeight: '600'
  },
  detailsInfosContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailsInfo: {
    marginBottom: 10,
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row'
  },
  heartLogo: {
    color: '#424242',
    fontWeight: '900'
  },
  heartNumber: {
    color: '#424242',
    fontWeight: '600'
  },
  kmInfo: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  kmText: {
    marginBottom: 10,
    marginRight: 15,
    color: '#424242',
    fontWeight: '600'
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  list: {
    flex: 4,
    marginTop: 60
  }
});

export default List;
