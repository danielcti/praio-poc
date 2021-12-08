import { useRoute } from "@react-navigation/core";
import React, { useEffect } from "react";
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

interface Params {
  food_id: number;
}

export default function EditFoodPage() {
  const { userSession } = useUser();
  const route = useRoute();
  const { foodListQuery, updateFoodMutation, updateFoodFormik } = useFood();
  const routeParams = route.params as Params;
  const myFood = foodListQuery?.data?.find(
    (food) => food.id === routeParams?.food_id
  );

  const handleSubmit = async () => {
    if (!updateFoodFormik.isValid) {
      return ToastAndroid.show("Algum campo inválido.", ToastAndroid.LONG);
    }
    try {
      await updateFoodFormik.submitForm();
      ToastAndroid.show("Produto atualizado com sucesso!", ToastAndroid.LONG);
    } catch (err) {
      ToastAndroid.show("Houve algum erro.", ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    updateFoodFormik.setValues({
      category: myFood?.category || "",
      description: myFood?.description || "",
      id: myFood?.id || 0,
      merchant_id: myFood?.merchant_id || 0,
      name: myFood?.name || "",
      price: myFood?.price || 0,
    });
  }, [routeParams?.food_id]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome do produto</Text>
            <TextInput
              style={styles.inputField}
              value={updateFoodFormik.values.name}
              onChangeText={updateFoodFormik.handleChange("name")}
              autoCorrect={false}
            />
            <Text style={styles.errorText}>{updateFoodFormik.errors.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={styles.inputField}
              value={updateFoodFormik.values.description}
              onChangeText={updateFoodFormik.handleChange("description")}
              autoCorrect={false}
            />
            <Text style={styles.errorText}>
              {updateFoodFormik.errors.description}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <TextInput
              style={styles.inputField}
              value={updateFoodFormik.values.category}
              onChangeText={updateFoodFormik.handleChange("category")}
              autoCorrect={false}
            />
            <Text style={styles.errorText}>
              {updateFoodFormik.errors.category}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Preço</Text>
            <TextInput
              style={styles.inputField}
              value={String(updateFoodFormik.values.price)}
              onChangeText={updateFoodFormik.handleChange("price")}
              autoCorrect={false}
            />
            <Text style={styles.errorText}>
              {updateFoodFormik.errors.category}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addProductButton}
            onPress={() => handleSubmit()}
            disabled={!updateFoodFormik.dirty}
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
