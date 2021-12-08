import { useNavigation, useRoute } from "@react-navigation/core";
import * as React from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderComponent from "../../components/OrderComponent";
import { useOrder } from "../../hooks/order";
import { useUser } from "../../hooks/user";
import { OrderStatus } from "../../types/Order";

interface Params {
  order_id: number;
}

export default function OrderPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderListQuery, updateOrderStatusMutation, updateOrderFormik } =
    useOrder();
  const { userSession } = useUser();
  const routeParams = route.params as Params;
  const [statusAction, setStatusAction] = React.useState("");
  const myOrder = orderListQuery?.data?.find(
    (order) => order.id === routeParams?.order_id
  );
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleUpdateStatusClick = (status: string) => {
    setStatusAction(status);
    setModalVisible(true);
  };

  const confirmAction = async () => {
    const listenerId = userSession?.user.is_merchant
      ? myOrder?.client_id
      : myOrder?.merchant_id;
    try {
      updateOrderFormik.setValues({
        id: routeParams?.order_id,
        status: statusAction,
        listener_id: listenerId || 0,
      });
      await updateOrderFormik.submitForm();
      ToastAndroid.show("Pedido atualizado com sucesso!", ToastAndroid.LONG);
      setModalVisible(false);
      navigation.navigate("OrdersPage", { scrollTop: true });
    } catch (err) {
      ToastAndroid.show("Houve algum erro.", ToastAndroid.LONG);
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Você tem certeza?</Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Não</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={confirmAction}
                >
                  <Text style={styles.textStyle}>Sim</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <OrderComponent
          order={myOrder}
          isClient={userSession?.user?.is_client}
        />
        <View style={styles.buttonsContainer}>
          {myOrder?.status === OrderStatus.open && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleUpdateStatusClick("cancel")}
            >
              <Text style={[styles.actionButtonText, { color: "#C63A31" }]}>
                Cancelar pedido
              </Text>
            </TouchableOpacity>
          )}
          {userSession?.user?.is_merchant &&
            myOrder?.status === OrderStatus.open && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateStatusClick("accept")}
              >
                <Text style={[styles.actionButtonText, { color: "#42C820" }]}>
                  Confirmar pedido
                </Text>
              </TouchableOpacity>
            )}
          {userSession?.user?.is_merchant &&
            myOrder?.status === OrderStatus.ongoing && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateStatusClick("finish")}
              >
                <Text style={[styles.actionButtonText, { color: "#2550A3" }]}>
                  Finalizar pedido
                </Text>
              </TouchableOpacity>
            )}
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  actionButton: {
    padding: 10,
    marginVertical: 5,
  },
  actionButtonText: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonCancel: {
    backgroundColor: "#C63A31",
  },
  buttonConfirm: {
    backgroundColor: "#42C820",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
});
