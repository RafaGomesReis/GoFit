
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const handleClick = () => {
    alert('Botão pressionado')
  }

  return (
    <View style={styles.container}>
      <Text>opamn</Text>
    <Pressable style={styles.button} onPress={handleClick}>
      <Text>Clique aqui</Text>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  
});
