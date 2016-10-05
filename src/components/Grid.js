import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import elements from '../mocks/elements';
import Octicons from 'react-native-vector-icons/Octicons';

const Row = ({items, onPressCell, gridType, results, goToNextPage}) => (
  <View style={styles.row}>
    {items.map(item =>
      <TouchableOpacity
        key={item.id}
        style={styles.cellContainer}
        onPress={() => {
          onPressCell(gridType, item.query);
          goToNextPage();
        }}>
        {gridType === 'q' ?
          <Text style={{fontFamily: 'devicon', fontSize: 42}}>{item.icon}</Text> :
          <Octicons style={{fontSize: 42}} name={item.icon} />
        }
        <Text style={results[gridType].indexOf(item.icon) === -1 ? styles.cellText : styles.cellTextSelected}>{item.title}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const Rows = ({onPressCell, gridType, results, goToNextPage}) => {
  if (gridType === 'sort') {
    return <Row
      items={[0, 1, 2].map(i => elements[gridType][i])}
      onPressCell={onPressCell}
      gridType={gridType}
      goToNextPage={goToNextPage}
      results={results}
    />
  } else if (gridType === 'order') {
    return <Row
      items={[0, 1].map(i => elements[gridType][i])}
      onPressCell={onPressCell}
      gridType={gridType}
      goToNextPage={goToNextPage}
      results={results}
    />
  }
  return (
    <View>
      <Row
        items={[0, 1, 2].map(i => elements.q[i])}
        onPressCell={onPressCell}
        gridType={gridType}
        goToNextPage={goToNextPage}
        results={results}
      />
      <Row
        items={[3, 4, 5].map(i => elements.q[i])}
        onPressCell={onPressCell}
        gridType={gridType}
        goToNextPage={goToNextPage}
        results={results}
      />
      <Row
        items={[6, 7, 8].map(i => elements.q[i])}
        onPressCell={onPressCell}
        gridType={gridType}
        goToNextPage={goToNextPage}
        results={results}
      />
      <Row
        items={[9, 10, 11].map(i => elements.q[i])}
        onPressCell={onPressCell}
        gridType={gridType}
        goToNextPage={goToNextPage}
        results={results}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 10,
  },
  cellText: {
    color: '#424242',
    fontWeight: '400',
    textAlign: 'center'
  },
  cellTextSelected: {
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center'
  },
  helpTextTitle: {
    color: '#424242',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20
  },
  helpTextSubTitle: {
    color: '#424242',
    fontWeight: '300',
    fontSize: 16,
    textAlign: 'center',
  },
  grid: {
    flex: 1,
    marginTop: 60,
    flexDirection: 'column',
  },
  gridContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  helpTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  rowsContainer: {
    flex: 5,
    justifyContent: 'center'
  }
});

const HelpText = () => (
  <View>
    <Text style={styles.helpTextTitle}>Github trending repos</Text>
    <Text style={styles.helpTextSubTitle}>Select a language, sort and order.</Text>
  </View>
);

const Grid = ({navigator, gridType, results, onPressCell}) => {
  const goToNextPage = () => {
    if (gridType === 'q' && results.q.length === 1) {
      navigator.push({name: 'Sort'});
    }
    if (gridType === 'sort' && results.sort.length === 1) {
      navigator.push({name: 'Order'});
    }
    if (gridType === 'order' && results.order.length === 1) {
      navigator.push({name: 'List'});
    }
  };
  return (
    <View style={[styles.gridContainer, {backgroundColor: 'white'}]}>
      <View style={styles.grid}>
        <View style={styles.helpTextContainer}>
          <View style={{flex:1,  justifyContent: 'flex-end'}} >
            <HelpText />
          </View>
        </View>
        <View style={styles.rowsContainer}>
          <Rows
            onPressCell={onPressCell}
            gridType={gridType}
            goToNextPage={goToNextPage}
            results={results}
          />
        </View>
      </View>
    </View>
  );
};

Grid.propTypes = {
  navigator: PropTypes.object,
  gridType: PropTypes.string,
  results: PropTypes.object,
  onPressCell: PropTypes.func
};

export default Grid;
