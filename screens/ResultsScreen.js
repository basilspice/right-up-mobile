import { View, Text, SafeAreaView, ScrollView } from 'react-native'


const ResultsScreen = () => {
  return (
    <SafeAreaView
    className="flex bg-white justify-center m-10"
    //style={styles.container}
  >
    <ScrollView>
      <Text
        className="text-xl font-bold content-center text-center pt-50 mt-10 mb-10"
        //style={styles.returnTitle}
      >
        Enjoy your{" "}
        <Text
          className="justify-center content-center"
          //style={styles.title}
        >
          recipe
        </Text>
        !
      </Text>
      <Text
        className="font-bold mt-40px text-center text-[black] mb-20px"
        //style={styles.returnresults}
      >
        {result}
      </Text>
      <Pressable
        onPress={() => {
          onTryAgain();
          resetState();
        }}
        className="bg-[#4f2f4f] p-5 rounded-lg items-center my-5"
        //style={styles.button}
      >
        <Text
          className="text-[#fff] font-bold"
          //style={styles.buttonText}
        >
          Generate Another Recipe
        </Text>
      </Pressable>
    </ScrollView>
  </SafeAreaView>
);
}
export default ResultsScreen