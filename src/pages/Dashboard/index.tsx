import { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../../routes/app.routes'
import { api } from '../../services/api';

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  const [number, setNumber] = useState('')

  async function openOrder() {
    if (number === "") { return }

    const response = await api.post('/order', {
      table: Number(number)
    })

    // FAZER A REQUISIÇÃO E ABRIR A MESA E NAVEGAR PARA PROXIMA TELA
    navigation.navigate('Order', { number: number, order_id: response.data.id })

    setNumber('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} >Novo pedido</Text>

      <TextInput
        style={styles.input}
        placeholder='Numero da mesa'
        placeholderTextColor={'#f0f0f0'}
        keyboardType='numeric'
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={openOrder}
      >
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026',
  }
})