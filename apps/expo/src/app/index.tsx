import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { api } from "@/utils/api";

const Index = () => {
  const message = api.example.hello.useQuery({
    message: "world!",
  });

  return (
    <SafeAreaView className="">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text>{message.data}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
