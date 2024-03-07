import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
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
import logo from "./assets/iconcropped.png";
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
    setAllergies(initialState);
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
        <View>
          <Image
            source={loadingGif}
            style={{
              transform: [{ scaleX: -1 }],
              width: "100%",
            }}
            resizeMode="contain"
          />
          <Text className="text-xl pt-2.5 mt-2.5 justify-center text-center">
            Your recipe is coming{" "}
            <Text className="text-xl pt-2.5 mt-2.5 font-bold text-center text-[#4f2f4f]">
              Right-Up
            </Text>
            <Text className="text-xl text-[black] pt-2.5 mt-2.5 font-bold text-center">
              !
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const onTryAgain = () => {
    setResult("");
  };

  if (result) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center m-2.5">
        <ScrollView>
          <Text className="text-xl font-bold content-center text-center pt-25 mt-2.5 mb-2.5">
            Enjoy your{" "}
            <Text className="justify-center content-center">recipe</Text>!
          </Text>
          <Text className="font-bold mt-40px text-center text-[black] mb-20px">
            {result}
          </Text>
          <Pressable
            onPress={() => {
              onTryAgain();
              resetState();
            }}
            className="bg-[#4f2f4f] p-5 rounded-lg items-center my-5"
          >
            <Text className="text-[#fff] font-bold">
              Generate Another Recipe
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView>
        <View className="bg-white justify-center items-center m-10">
          <Image
            className="justify-center content-center pt-5 pb-5 my-5"
            //style={styles.image}
            source={logo}
          />
          <Text className="text-lg pt-8">
            Turn some things into something{" "}
            <Text className="text-lg text-[#4f2f4f] pt-8 mt-8 font-bold">
              delicious
            </Text>
            <Text className="text-black">!</Text>
          </Text>
        </View>

        <View className="flex-1 bg-white justify-center m-2.5">
          <Text className="text-[gray] text-xl">Dish Style</Text>
          <TextInput
            type="text"
            placeholder="Dessert, Korean Dinner, Greek, Italian..."
            keyboardType="default"
            className="text-2xl border-slate-500 border p-4 mt-1.5 mb-3 rounded-md"
            value={dishStyle}
            onChangeText={setDishStyle}
            required={true}
          />

          <Text className="text-[gray] text-xl">Complexity</Text>
          <TextInput
            type="text"
            placeholder="e.g. Michelin Star, Simple, Advanced..."
            keyboardType="default"
            className="text-2xl border-slate-500 border p-4 mt-1.5 mb-3 rounded-md"
            value={complexity}
            onChangeText={setComplexity}
            required={true}
          />

          <Text className="text-xl ">Allergies</Text>
          <TextInput
            type="text"
            placeholder="e.g. Nothing, Tree Nuts, Shellfish, Dairy..."
            keyboardType="default"
            className="text-2xl border-slate-500 border p-4 mt-1.5 mb-3 rounded-md"
            value={allergies}
            onChangeText={setAllergies}
            required={true}
          />
          <Text className="text-[gray] text-xl">Ingredients</Text>
          <TextInput
            type="text"
            placeholder="e.g. Panang Curry, 3 Slices of Bacon, 2 Duck Eggs"
            keyboardType="default"
            className="text-2xl border-slate-500 border p-4 mt-1.5 mb-3 rounded-md"
            value={ingredients}
            onChangeText={setIngredients}
            required={true}
          />
          <Pressable
            className="bg-[#4f2f4f] p-4 rounded items-center my-5"
            onPress={onSubmit}
          >
            <Text className="text-white font-bold">Create A Recipe</Text>
          </Pressable>

          <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
