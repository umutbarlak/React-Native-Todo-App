import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Plus from '../assets/icons/Plus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Notification from '../assets/icons/Notification';
import Completed from '../assets/icons/Completed';
import DeleteIcon from '../assets/icons/DeleteIcon';
import EditIcon from '../assets/icons/EditIcon';

const TodosScreen = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  console.log(todo);

  const getTodos = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('todos'));

    setTodos(data ? data : []);

    console.log('veriler geldi');
  };

  useEffect(() => {
    getTodos();
  }, []);

  const saveTodos = async todos => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    if (todo && todo.trim() !== '') {
      const newTodos = [
        ...todos,
        {id: uuid.v4(), text: todo, completed: false},
      ];

      await saveTodos(newTodos);

      setTodos(newTodos);
      setTodo('');
    }
  };

  const completeTodo = async id => {
    const updatedTodos = todos.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );

    await saveTodos(updatedTodos);

    setTodos(updatedTodos);
  };

  const deleteTodo = async id => {
    const updatedTodos = todos.filter(i => i.id !== id);

    await saveTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  const updatedTodo = async id => {
    const founded = todos.find(i => i.id === id);

    if (!founded) return;

    Alert.prompt(
      'Edit Todo',
      'Update your task:',
      async newUpdateText => {
        if (newUpdateText && newUpdateText.trim() !== '') {
          const updatedTodos = todos.map(item =>
            item.id === id ? {...item, text: newUpdateText} : item,
          );

          await saveTodos(updatedTodos);
          setTodos(updatedTodos);
        }
      },
      'plain-text',
      founded.text,
    );
  };

  const deleteAll = async () => {
    await AsyncStorage.removeItem('todos');
    setTodos([]);
  };

  return (
    <LinearGradient style={styles.container} colors={['#fef3c7', '#a78bfa']}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>TO-DO LIST</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={todo}
              onChangeText={setTodo}
              placeholder="Type a Todo"
              style={styles.input}
            />

            <TouchableOpacity
              onPress={addTodo}
              style={[styles.button, styles.addButton]}>
              <Plus width={30} color="#ff8a65" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => deleteAll()}>
              <Text>Clear all todos</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.flatList}
            data={todos}
            renderItem={({item}) => (
              <View style={styles.todoItem}>
                <Text
                  style={[
                    styles.todoText,
                    item.completed
                      ? styles.completedText
                      : styles.unCompletedText,
                  ]}>
                  {item.text}
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => completeTodo(item.id)}>
                    {item.completed ? (
                      <Completed width={24} height={24} color="green" />
                    ) : (
                      <Notification width={24} height={24} color="#F95454" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updatedTodo(item.id)}>
                    <EditIcon width={24} height={24} color={'#4CC9FE'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                    <DeleteIcon width={24} height={24} color={'red'} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            key={item => item.id}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 15,
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 700,
  },
  inputContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  button: {
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    marginHorizontal: 10,
  },
  flatList: {
    marginVertical: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  todoText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    flexWrap: 'wrap',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  unCompletedText: {
    textDecorationLine: 'none',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    height: '100%',
  },
});
