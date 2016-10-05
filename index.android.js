import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';

import List from './src/components/List';
import SplashPage from './src/components/SplashPage';
import Grid from './src/components/Grid';
import Details from './src/components/Details';
import Header from './src/components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {
        q: [],
        sort: [],
        order: [],
      },
    };
    this.onPressCell = this.onPressCell.bind(this);
  }

  render() {
    const { results } = this.state;
    const NavigationBarRouterMap = {
      LeftButton(route, navigator, index, navState) {
        if (route.name === 'Details') {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => { if (index > 0) { navigator.pop() } }}>
              <View>
                <Octicons name="x" size={32} color="rgba(255,255,255,.9)"/>
              </View>
            </TouchableHighlight>
          );
        }
      },
      RightButton(route, navigator, index, navState) {
        if (route.name === 'Q' ||
            route.name === 'Sort' ||
            route.name === 'Order') {
          let name;
          let next = false;
          if (route.name === 'Q') {
            name = 'Sort';
            if (results.q.length) next = true;
          }
          else if (route.name === 'Sort') {
            name = 'Order';
            if (results.order.length) next = true;
          }
          else if (route.name === 'Order') {
            name = 'List';
            if (results.sort.length) next = true;
          }
          return (
            <TouchableHighlight style={styles.flexOneFlexEnd}
              underlayColor="transparent"
              onPress={() => { if (next) navigator.push({name}) }}>
              <View>
                <Octicons
                  name="check"
                  size={32}
                  color={next ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.4)'}
                  style={styles.marginTwelve}
                />
              </View>
            </TouchableHighlight>
          );
        }
      },
      Title(route, navigator, index, navState) {
        if (route.name === 'Q' ||
            route.name === 'Sort' ||
            route.name === 'Order' ||
            route.name === 'List') {
          return <Header results={results} style={styles.headerContainer} />;
        }
        if (route.name === 'Details') {
          return <View style={styles.detailsContainer}><Text style={styles.detailsTitle}>{route.title}</Text></View>
        }
        return null;
      }
    };

    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{name: 'SplashPage'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouterMap}
          />
        }
      />
    );
  }

  configureScene(route, routeStack) {
    if (route.name === 'Q') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid;
    }
    if (route.name === 'Sort') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid;
    }
    if (route.name === 'Order') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  onPressCell(resultType, icon) {
    const itemIdInResultType = this.state.results[resultType].indexOf(icon);
    let results = {};
    const array = this.state.results[resultType];
    if (itemIdInResultType === -1) {
      array.push(icon);
    } else {
      array.splice(itemIdInResultType, 1);
    }
    this.setState({
      results: {
        q: this.state.results.q,
        sort: this.state.results.sort,
        order: this.state.results.order,
        [resultType]: array
      }
    });
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'SplashPage':
        return <SplashPage navigator={navigator} />;
      case 'Q':
        return (
          <Grid
            navigator={navigator}
            gridType={'q'}
            results={this.state.results}
            onPressCell={this.onPressCell}
          />
        );
      case 'Sort':
        return (
          <Grid
            navigator={navigator}
            gridType={'sort'}
            results={this.state.results}
            onPressCell={this.onPressCell}
          />
        );
      case 'Order':
        return (
          <Grid
            navigator={navigator}
            gridType={'order'}
            results={this.state.results}
            onPressCell={this.onPressCell}
          />
        );
      case 'List':
        return <List navigator={navigator} results={this.state.results} />;
      case 'Details':
        return (
          <Details
            navigator={navigator}
            url={route.url}
            title={route.title}
            onBack={() => { navigator.pop(); }}
          />
        );
      default:
        return this.noRoute(navigator);
    }
  }
  noRoute(navigator) {
    return (
      <View><Text>404</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    marginLeft: -40,
    marginRight: 50
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  detailsTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 22,
    marginTop: 3,
    textShadowColor: '#424242',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 15,
  },
  marginTwelve: {
    margin: 12,
    marginBottom: 0
  },
  flexOneFlexEnd: {
    flex:1,
    justifyContent: 'flex-end'
  }
});

AppRegistry.registerComponent('githubexplorer', () => App);
