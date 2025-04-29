import { Pressable, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página Inicial do Mundo de Dragon Ball</Text>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/pt/7/74/Dragon_Ball_Super_Key_visual.jpg' }}
            style={styles.image}
          />
          <Text style={styles.text2}>Dragon Ball é uma franquia de mídia japonesa criada por Akira Toriyama, que inclui mangá, anime, jogos e filmes. A história acompanha a jornada de Son Goku, um jovem com força e rabo de macaco, em sua busca pelas Esferas do Dragão, que concedem desejos. A série é conhecida por seus combates épicos, personagens memoráveis e a mensagem de que o trabalho duro e a perseverança são essenciais para superar desafios</Text>

        </View>

        <Link href="/about" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Clique aqui para saber mais sobre o mundo de Dragon Ball</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 12,
  }, 
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 350,
    height: 500,
    borderRadius: 10,
  }, 
  textButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 5,
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});
