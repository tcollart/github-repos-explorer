import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

function getRepoFromApiAsync(url) {
  return fetch(url)
    .then(response => response.json())
  .catch((error) => {
    console.error(error);
  });
}

class Details extends React.Component {
  constructor() {
    super();
    this.state = {result: {}};
  }
  componentWillMount() {
    getRepoFromApiAsync(this.props.url).then(
      result => this.setState({result})
    );
  }

  render() {
    if (this.state.result === {}) return <Text>Loading...</Text>
    return (
      <ScrollView>
        <View>
          <View style={styles.detailsContainer}>
            <Image
              source={{uri: this.state.result.owner && this.state.result.owner.avatar_url}}
              height={200}
              width={400}
              style={styles.detailsContainer}
            />
          </View>

          <View>
            <Text>Full name: {this.state.result.full_name}</Text>
            <Text>Private: <Octicons name="gist-secret" style={{color: this.state.result.private ? 'green' : 'red'}} /></Text>
            <Text>URL: {this.state.result.html_url}</Text>
            <Text>Description: {this.state.result.description}</Text>
            <Text>Fork: <Octicons name="repo-forked" style={{color: this.state.result.fork ? 'green' : 'red'}} /></Text>
            <Text>Created at: {this.state.result.created_at}</Text>
            <Text>Updated at: {this.state.result.updated_at}</Text>
            <Text>Pushed at: {this.state.result.pushed_at}</Text>
            <Text>Stars: {this.state.result.stargazers_count}</Text>
            <Text>Forks: {this.state.result.forks}</Text>
            <Text>Open issues: {this.state.result.open_issues}</Text>
            <Text>Network count: {this.state.result.network_count}</Text>
            <Text>Subscribers count: {this.state.result.subscribers_count}</Text>
            <Text>Language: {this.state.result.language}</Text>
            <Text>Has issues: <Octicons name="issue-opened" style={{color: this.state.result.has_issues ? 'green' : 'red'}} /></Text>
            <Text>Has downloads: <Octicons name="desktop-download" style={{color: this.state.result.has_downloads ? 'green' : 'red'}} /></Text>
            <Text>Has wiki: <Octicons name="book" style={{color: this.state.result.has_wiki ? 'green' : 'red'}} /></Text>
            <Text>Has pages: <Octicons name="browser" style={{color: this.state.result.has_pages ? 'green' : 'red'}} /></Text>
          </View>
        </View>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  detailsInfosContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  detailsInfos: {margin: 20, marginLeft: 32, flex: 1, flexDirection: 'row'},
  detailsInfosInfo: {color: '#ec2e5e', fontWeight: '900'},
  textLeft: {color: '#ec2e5e', fontWeight: '900', margin: 20, marginLeft: 32},
  textRight: {color: '#ec2e5e', fontWeight: '900', margin: 20, marginRight: 32},
  description: {margin: 20, marginLeft: 32, marginRight: 32, marginTop: 0},
  divider: {
    backgroundColor: 'rgba(255, 000, 000, 0.4)'
  },
  detailsContainer: {
    flex: 1,
    width: 400,
    height: 200
  },
  imageButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ec2e5e'
  },
  imageButton: {
    flex: 1,
    alignItems: 'center'
  },
  marginTwenty: {
    margin: 20
  },
  imageGridContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  imageGridRow: {
    flex: 1,
    flexDirection: 'row'
  },
  imageGridImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'stretch',
    height: 100,
    margin: 1
  },
});

export default Details;
