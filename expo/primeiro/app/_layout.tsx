import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />

      {children}
    </Stack>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
  },
});
