import { StatusBar } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF305B" />
      <View style={styles.content}>
        <Text style={styles.title}>GoFit</Text>
        <Text style={styles.subtitle}>Seu app de academia</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF305B',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
