import { React, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  getTimeLogsByEmployeeId,
  getTimeLogsByEmployeeIdRange,
} from "../../services/timelogService.js";
import { useRoute } from "@react-navigation/native";
import Navbar from "../../components/Navbar";
import TimeLog from "./components/TimeLog/index.js";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimeLogs() {
  const route = useRoute();
  const [timeLogs, setTimeLogs] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
    showEndDatepicker(false);
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
    setShowStartDate(false);
  };

  const showEndDatepicker = (param) => {
    setShowEndDate(param);
  };

  const showStartDatepicker = (param) => {
    setShowStartDate(param);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    async function fetchData(userId) {
      try {
        const responseTimeLogs = await getTimeLogsByEmployeeId(userId);
        if (Array.isArray(responseTimeLogs.data)) {
          setTimeLogs(responseTimeLogs.data);
        } else {
          throw Error(responseTimeLogs.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(route.params.user.id);
  }, [route.params.user]);

  const filterTimeLogs = async () => {
    try {
      if (endDate >= startDate) {
        let editStartDate = startDate
          .toLocaleDateString("pt-BR")
          .replace(/\//g, "-");
        let editEndDate = endDate
          .toLocaleDateString("pt-BR")
          .replace(/\//g, "-");
        editEndDate = `${editEndDate.split("-").reverse().join("-")}`;
        editStartDate = `${editStartDate.split("-").reverse().join("-")}`;
        const userId = route.params.user.id;
        const response = await getTimeLogsByEmployeeIdRange(
          userId,
          editStartDate,
          editEndDate
        );
        setTimeLogs(response.data);
        setStartDate(new Date());
        setEndDate(new Date());
      } else {
        throw Error("Data final menor que a data inicial");
      }
    } catch (error) {
      console.error(error);
    }

    setModalVisible(!isModalVisible);
  };

  const cancelFilter = () => {
    setEndDate(new Date());
    setStartDate(new Date());
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      {timeLogs.length > 0 ? (
        <FlatList
          data={timeLogs}
          renderItem={({ item }) => <TimeLog timeLog={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <Navbar
              title={"Meus registros"}
              filter={true}
              setModalVisible={setModalVisible}
              toggleModal={toggleModal}
            />
          )}
          ItemSeparatorComponent={
            <View style={styles.itemSeparatorComponent} />
          }
        />
      ) : (
        <>
          <Navbar title={"Meus registros"} />
          <Text style={styles.text}>Nenhum registo de ponto encontrado</Text>
        </>
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View>
            <View style={styles.startAndEndDateContainer}>
              <Text style={styles.textDateModal}>
                Data inicial: {startDate.toLocaleDateString("pt-BR")}
              </Text>
              <TouchableOpacity
                onPress={showStartDatepicker}
                style={styles.selectDateButton}
              >
                <Text style={styles.selectDateButtonText}>
                  Selecionar dia inicial
                </Text>
              </TouchableOpacity>

              {showStartDate && (
                <DateTimePicker
                  testID="startDateTimePicker"
                  value={startDate}
                  mode={"date"}
                  onChange={onChangeStartDate}
                />
              )}
            </View>

            <View style={styles.startAndEndDateContainer}>
              <Text style={styles.textDateModal}>
                Data final: {endDate.toLocaleDateString("pt-BR")}
              </Text>
              <TouchableOpacity
                onPress={showEndDatepicker}
                style={styles.selectDateButton}
              >
                <Text style={styles.selectDateButtonText}>
                  Selecionar dia final
                </Text>
              </TouchableOpacity>
              {showEndDate && (
                <DateTimePicker
                  testID="endDateTimePicker"
                  value={endDate}
                  mode={"date"}
                  onChange={onChangeEndDate}
                />
              )}
            </View>
          </View>

          <View style={styles.buttonsModalContainer}>
            <TouchableOpacity
              onPress={filterTimeLogs}
              style={styles.buttonFilterModal}
            >
              <Text style={styles.textButtonFilterModal}>Filtrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelFilter}
              style={styles.buttonCancelModal}
            >
              <Text style={styles.textButtonCancelModal}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "45%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
  },
  itemSeparatorComponent: {
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },
  text: {
    color: "#002538",
    textAlign: "center",
  },
  timeLog: {
    alignItems: "center",
  },

  textDateModal: {
    color: "#002538",
    fontWeight: "700",
    fontSize: 16,
  },
  selectDateButton: {
    backgroundColor: "#002538",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  selectDateButtonText: {
    color: "#FA983B",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  startAndEndDateContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    paddingVertical: 20,
  },
  buttonsModalContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },

  buttonFilterModal: {
    backgroundColor: "#002538",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: 100,
  },
  buttonCancelModal: {
    backgroundColor: "#FA983B",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: 100,
  },

  textButtonFilterModal: {
    color: "#FA983B",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },

  textButtonCancelModal: {
    color: "#002538",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
});
