
import { View, SafeAreaView, StatusBar, StyleSheet, Image, Text, FlatList} from 'react-native';
import {list} from './data';
import {ProductItem} from './components/product-item'
import {Product} from './types/product'

function App() {
  return(
    <SafeAreaView style={styles.conntainer}>
      <Image
        source={require('./assets/usdrip.jpeg')}
        resizeMode= "cover"
        style={styles.hero}
      />
      <View style={styles.area}>
        <Text style={styles.h1}>Produtos</Text>
        <FlatList
          data={list}
          renderItem={({item}: {item: Product}) => (
            <ProductItem product={item} /> 
            ) }
          keyExtractor={item => item.id.toString()}
        />
      </View>

    </SafeAreaView>
  );
} 
const styles = StyleSheet.create({
  conntainer: {
    marginTop: StatusBar.currentHeight || 0
  }, 
  hero :{
    width: '100%',
    height: 150
  },
  area: {
    padding: 10
  },
  h1: {
    fontSize: 24,
    marginBottom: 10
  }


});


export default App;