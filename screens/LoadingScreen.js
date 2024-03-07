import { View, Text, SafeAreaView, Image } from "react-native";
import loadingGif from "../assets/loading.gif";

const LoadingScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text
          className="text-xl pt-2.5 mt-2.5 justify-center text-center text-[#4f2f4f]"
          //style={styles.subtitle}
        >
          Your recipe is coming{" "}
          <Text
            className="text-xl pt-2.5 mt-2.5 font-bold text-center text-[#4f2f4f]"
            // style={styles.subtitleFlair}
          >
            Right-Up
          </Text>
          <Text className="text-xl pt-2.5 mt-2.5 font-bold text-center">!</Text>
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
    </SafeAreaView>
  );
};

export default LoadingScreen;
