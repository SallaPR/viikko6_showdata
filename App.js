import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function App() {
  const [randomImageUri, setRandomImageUri] = useState(null);
  const [breedImageUri, setBreedImageUri] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  // Fetch list of dog breeds
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((json) => {
        const breedList = Object.keys(json.message);
        setBreeds(breedList);
        getDogPic()
        setSelectedBreed("affenpinscher")
        getBreedDogPic("affenpinscher")
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get a random dog picture
  const getDogPic = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((json) => {
        setRandomImageUri(json.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get a dog picture of the selected breed
  const getBreedDogPic = (breed) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((response) => response.json())
      .then((json) => {
        setBreedImageUri(json.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View cute dog pictures</Text>

      {/* Select a breed and show the picture */}
      <Text style={{ fontSize: 20, padding: 10 }}>Pick a dog breed</Text>
      <RNPickerSelect
        onValueChange={(itemValue) => setSelectedBreed(itemValue)}
        items={breeds.map((breed) => ({
          label: breed,
          value: breed,
        }))}
        value={selectedBreed}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => getBreedDogPic(selectedBreed)}
      >
        <Text style={styles.buttonText}>Get a picture</Text>
      </TouchableOpacity>
      <Image source={{ uri: breedImageUri }} style={styles.image} />

      {/* Press a button to show a random dog picture */}
      <Text style={{ fontSize: 20, padding: 10 }}>Get a random dog picture</Text>
      <TouchableOpacity style={styles.button} onPress={() => getDogPic()}>
        <Text style={styles.buttonText}>Get a picture</Text>
      </TouchableOpacity>
      <Image source={{ uri: randomImageUri }} style={styles.image} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: 600,
    marginTop: 50,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#fa8ce2",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d579c1",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20
  },
});
