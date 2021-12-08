import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { useFood } from "../../hooks/food";
import { useUser } from "../../hooks/user";

export default function AddFoodPage() {
  const { userSession } = useUser();
  const { foodListQuery, createFoodMutation, createFoodFormik } = useFood();

  const handleSubmit = async () => {
    if (!createFoodFormik.isValid) {
      return ToastAndroid.show("Algum campo inválido.", ToastAndroid.LONG);
    }
    try {
      await createFoodFormik.submitForm();
      ToastAndroid.show("Produto adicionado com sucesso!", ToastAndroid.LONG);
    } catch (err) {
      ToastAndroid.show("Houve algum erro.", ToastAndroid.LONG);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome do produto</Text>
            <TextInput
              style={styles.inputField}
              value={createFoodFormik.values.name}
              onChangeText={createFoodFormik.handleChange("name")}
              autoCorrect={false}
            />
            <Text style={styles.errorText}>{createFoodFormik.errors.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={styles.inputField}
              value={createFoodFormik.values.description}
              onChangeText={createFoodFormik.handleChange("description")}
              autoCorrect={false}
            />
            <Text style={styles.errorText}>
              {createFoodFormik.errors.description}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <TextInput
              style={styles.inputField}
              value={createFoodFormik.values.category}
              onChangeText={createFoodFormik.handleChange("category")}
              autoCorrect={false}
            />
            <Text style={styles.errorText}>
              {createFoodFormik.errors.category}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Preço</Text>
            <TextInput
              style={styles.inputField}
              value={String(createFoodFormik.values.price)}
              onChangeText={createFoodFormik.handleChange("price")}
              autoCorrect={false}
            />
            <Text style={styles.errorText}>
              {createFoodFormik.errors.category}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addProductButton}
            onPress={() => handleSubmit()}
            disabled={!createFoodFormik.dirty}
          >
            <Text style={styles.addProductButtonText}>Adicionar produto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  form: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    color: "#999",
    fontSize: 14,
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: "#F2F7FF",
    borderRadius: 8,
    padding: 15,
  },
  userTypeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  userTypeButton: {
    borderRadius: 20,
    borderColor: "#2550A3",
    borderWidth: 2,
    padding: 15,
    flex: 1,
  },
  userTypeButtonActive: {
    backgroundColor: "#F2F7FF",
  },
  userTypeButtonFirstChild: {
    marginRight: 20,
  },
  userTypeButtonText: {
    color: "#2550A3",
    textAlign: "center",
  },
  addProductButton: {
    borderRadius: 20,
    backgroundColor: "#2550A3",
    padding: 15,
    marginTop: 30,
  },
  addProductButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    color: "red",
  },
});
