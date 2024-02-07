import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import loadingGif from "./assets/loading.gif";

const API_URL = `https://right-up.vercel.app/api`;

export default function App() {
  const [dishStyle, setDishStyle] = useState(initialState);
  const [ingredients, setIngredients] = useState(initialState);
  const [complexity, setComplexity] = useState(initialState);
  const [restrictions, setRestrictions] = useState(initialState);
  const [allergies, setAllergies] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const initialState = "";

  const resetState = () => {
    setDishStyle(initialState);
    setComplexity(initialState);
    setIngredients(initialState);
    setRestrictions(initialState);
  };

  const handleValueChangeComplexity = (itemValue) => setComplexity(itemValue);
  const handleValueChangeRestrictions = (itemValue) =>
    setRestrictions(itemValue);
  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/generate-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dishStyle,
          ingredients,
          complexity,
          restrictions,
          allergies,
        }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      Alert.alert("Failed to generate recipe. Try later");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <Text style={styles.subtitle}>
            Your recipe is coming{" "}
            <Text style={styles.subtitleFlair}>Right-Up</Text>
            <Text>!</Text>
          </Text>
          <Image
            source={loadingGif}
            style={{
              transform: [{ scaleX: -1 }],
              width: "100%",
            }}
            resizeMode="contain"
          />
        </View>
        <Text> </Text>
      </SafeAreaView>
    );
  }

  const onTryAgain = () => {
    setResult("");
  };

  if (result) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.returnTitle}>
            Enjoy your <Text style={styles.title}>recipe</Text>!
          </Text>
          <Text style={styles.returnresults}>{result}</Text>
          <Pressable
            onPress={() => {
              onTryAgain();
              resetState();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Generate Another Recipe</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Right-Up</Text>
          <Text style={styles.subtitle}>
            Turn some things into something{" "}
            <Text style={styles.subtitleFlair}>delicious</Text>
            <Text>!</Text>
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Dish Style</Text>
          <TextInput
            type="text"
            placeholder="e.g. Classic, Greek, Mexican, Korean..."
            keyboardType="default"
            style={styles.input}
            value={dishStyle}
            onChangeText={setDishStyle}
            required={true}
          />

          <Text style={styles.label}>Complexity</Text>
          <View>
            <View styles={styles.pickerContainer}>
              <Picker
                style={styles.pickerStyles}
                selectedValue={complexity}
                onValueChange={handleValueChangeComplexity}
              >
                <Picker.Item label="Basic" value="basic" />
                <Picker.Item label="Simple" value="simple" />
                <Picker.Item label="Average" value="average" />
                <Picker.Item label="Complex" value="complex" />
                {/* <Picker.Item label="Hard" value="hard" /> */}
                {/* <Picker.Item label="Master Chef" value="master level" /> */}
                <Picker.Item
                  label="Michelin Star"
                  value="michelin star level"
                />
              </Picker>
            </View>
          </View>

          <Text style={styles.label}>Restrictions</Text>
          <TextInput
            type="text"
            placeholder="e.g. No Stove, No Oven..."
            keyboardType="default"
            style={styles.input}
            value={allergies}
            onChangeText={setAllergies}
            required={true}
          />
          <Text style={styles.label}>Allergies</Text>
          <TextInput
            type="text"
            placeholder="e.g. Nothing, Tree Nuts, Shellfish..."
            keyboardType="default"
            style={styles.input}
            value={allergies}
            onChangeText={setAllergies}
            required={true}
          />
          <Text style={styles.label}>Ingredients</Text>
          <TextInput
            type="text"
            placeholder="e.g. 2 steaks, leftover meatloaf, 3 slices of bacon"
            keyboardType="default"
            style={styles.input}
            value={ingredients}
            onChangeText={setIngredients}
            required={true}
          />
          <Pressable style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Create A Recipe</Text>
          </Pressable>

          <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    margin: 10,
  },
  titlecontainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    margin: 10,
  },

  input: {
    fontSize: 23,
    borderColor: "#353740",
    borderWidth: 1,
    padding: 16,
    marginTop: 6,
    marginBottom: 12,
    borderRadius: 4,
  },
  label: {
    color: "gray",
    fontSize: 23,
  },
  title: {
    fontSize: 40,
    alignContent: "center",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 15,
    marginVertical: 10,
    color: "#4f2f4f",
  },
  subtitle: {
    fontSize: 20,
    paddingTop: 10,

    marginTop: 10,
    color: "#353740",
    textAlign: "center",
  },
  subtitleFlair: {
    fontSize: 20,
    paddingTop: 10,
    marginTop: 10,
    fontWeight: "bold",
    color: "#4f2f4f",
    textAlign: "center",
  },
  //selector
  selectorContainer: {
    flexDirection: "row",
  },
  selector: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "white",
    margin: 5,
    padding: 16,
    borderRadius: 5,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#4f2f4f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  pickerStyles: {
    fontSize: 16,
    borderColor: "#4f2f4f",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 10,
  },
  returnresults: {
    fontWeight: "bold",
    marginTop: "40px",
    textAlign: "center",
    color: "black",
    marginBottom: "20px",
  },
  returnTitle: {
    fontSize: 40,
    alignContent: "center",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 50,

    marginVertical: 10,
    color: "#353740",
  },
});
