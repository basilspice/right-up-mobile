import { View, Text, Pressable } from 'react-native'


export default function Button() {
  return (
    <Pressable className="bg-[#4f2f4f] p-4 rounded items-center my-5" onPress={onSubmit}>
    <Text className="text-white font-bold">Create A Recipe</Text>
  </Pressable>
  )
}