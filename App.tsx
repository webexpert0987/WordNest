import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';

function App() {
  const [trips, setTrips] = useState([]);
  const [tripName, setTripName] = useState('');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  const addTrip = () => {
    if (tripName.trim()) {
      setTrips([...trips, { id: Date.now().toString(), name: tripName }]);
      setTripName('');
    }
  };

  const editTrip = (id, newName) => {
    setTrips(trips.map(trip => (trip.id === id ? { ...trip, name: newName } : trip)));
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const selectTrip = (trip) => {
    setSelectedTrip(trip);
    setItems([]); // Clear items when selecting a new trip
  };

  const addItem = () => {
    if (itemName.trim()) {
      setItems([...items, { id: Date.now().toString(), name: itemName, packed: false }]);
      setItemName('');
    }
  };

  const togglePacked = (id) => {
    setItems(items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item)));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {!selectedTrip ? (
        <>
          <Text style={styles.header}>My Trips</Text>
          <FlatList
            data={trips}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.tripContainer}>
                <Text style={styles.tripName}>{item.name}</Text>
                <TouchableOpacity onPress={() => editTrip(item.id, prompt('Edit trip name:', item.name))}>
                  <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTrip(item.id)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectTrip(item)}>
                  <Text style={styles.select}>Select</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Trip Name"
              value={tripName}
              onChangeText={setTripName}
            />
            <Button title="Add Trip" onPress={addTrip} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.header}>{selectedTrip.name} Items</Text>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity onPress={() => togglePacked(item.id)}>
                  <Text style={item.packed ? styles.packed : styles.unpacked}>
                    {item.packed ? 'Unpack' : 'Pack'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Item Name"
              value={itemName}
              onChangeText={setItemName}
            />
            <Button title="Add Item" onPress={addItem} />
          </View>
          <Button title="Back to Trips" onPress={() => setSelectedTrip(null)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tripName: {
    fontSize: 18,
  },
  edit: {
    color: 'blue',
    marginHorizontal: 5,
  },
  delete: {
    color: 'red',
    marginHorizontal: 5,
  },
  select: {
    color: 'green',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
  },
  packed: {
    color: 'green',
  },
  unpacked: {
    color: 'orange',
  },
});

export default App;
