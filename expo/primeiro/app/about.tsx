import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Sobre tudo que você precisa saber sobre o meu site de Dragon Ball</Text>
      <Text style={styles.texto2}>Dragon Ball é uma famosa série de mangá e anime criada por Akira Toriyama. A história segue as aventuras de Goku, um guerreiro com poderes extraordinários, em sua busca pelas Esferas do Dragão e sua jornada para se tornar o lutador mais forte do universo. A série é conhecida por suas batalhas épicas, personagens carismáticos e temas de amizade, superação e crescimento pessoal.</Text>
      <View>      
        <Text style={styles.texto}>Personagens Principais:</Text>
        <Text style={styles.texto2}>1. Goku - O protagonista principal, um Saiyajin que busca constantemente se tornar mais forte</Text>
        <Text style={styles.texto2}>2. Vegeta - O príncipe dos Saiyajins, rival e depois aliado de Goku</Text>
        <Text style={styles.texto2}>3. Piccolo - Um Namekuseijin que se torna um dos maiores aliados da Terra</Text>
        <Text style={styles.texto2}>4. Bulma - Uma cientista brilhante e uma das primeiras amigas de Goku</Text>
        <Text style={styles.texto2}>5. Freeza - Um dos vilões mais icônicos da série, responsável pela destruição do planeta Vegeta</Text>
      </View>
      <Link href="/" asChild>
        <Pressable style={styles.link}>
          <Text style={styles.textLink}>Clique aqui para voltar para a página inicial</Text>
        </Pressable>
      </Link>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
   texto: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
   texto2: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 10,
  },
   link: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginTop: 10,
  },
   textLink: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 5,
    borderRadius: 5,
  }
});
