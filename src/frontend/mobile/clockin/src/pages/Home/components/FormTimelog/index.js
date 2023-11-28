import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  getLogTypes,
  postTimeLog,
  getTimeLogsByEmployeeId,
} from "../../../../services/timelogService";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function FormTimelog({ employeeId, setTimeLogs, timeLogs }) {
  const [date, setDate] = useState(new Date());
  const [logTypeValue, setLogTypeValue] = useState(null);
  const [logTypes, setLogTypes] = useState({});
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseLogTypes = await getLogTypes();
        setLogTypes([
          {
            key: responseLogTypes.data.logTypeEntry,
            value: responseLogTypes.data.logTypeEntry,
            label: responseLogTypes.data.logTypeNameEntry,
          },
          {
            key: responseLogTypes.data.logTypeExit,
            value: responseLogTypes.data.logTypeExit,
            label: responseLogTypes.data.logTypeNameExit,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const registerTimeLog = async () => {
    try {
      if (logTypeValue != null) {
        const editDate = date.toLocaleDateString("pt-BR").replace(/\//g, "-");
        const editTime = date.toLocaleTimeString("pt-BR");
        const timeLog = {
          timestamp: `${editDate.split("-").reverse().join("-")}T${editTime}Z`,
          employeeId,
          logTypeValue,
        };
        await postTimeLog(timeLog);
        setDate(new Date());
        const response = await getTimeLogsByEmployeeId(employeeId);
        setTimeLogs(response.data);
      } else {
        throw Error("Tipo de registro invalido");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.dateAndTimeContainer}>
        <Text style={styles.dateAndTimeText}>
          Data e hora do registro: {date.toLocaleString("pt-BR")}
        </Text>
        <View style={styles.dateAndTimeButtons}>
          <TouchableOpacity
            onPress={showDatepicker}
            style={styles.selectDateAndTimeButton}
          >
            <Text style={styles.selectDateAndTimeButtonText}>
              Selecionar dia
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showTimepicker}
            style={styles.selectDateAndTimeButton}
          >
            <Text style={styles.selectDateAndTimeButtonText}>
              Selecionar Horario
            </Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <View style={styles.selectLogTypeContainer}>
          <Text style={styles.textLabelLogType}>
            Selecione o tipo de registro:
          </Text>
          <View style={styles.dropdownsRow}>
            <SelectDropdown
              data={logTypes}
              onSelect={(selectedItem, index) =>                
                setLogTypeValue(selectedItem.value)
              }
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.label;
              }}
              rowTextForSelection={(item, index) => {
                return item.label;
              }}
              defaultButtonText={"Selecione"}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => registerTimeLog()}
        style={styles.buttonSubmit}
      >
        <Text style={styles.textButtonSubmit}>Registrar ponto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    alignItems: "center",
    height: 220,
    width: "90%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 15,
  },

  dateAndTimeContainer: {
    flexDirection: "colum",
    alignItems: "center",
    gap: 15,
  },

  dateAndTimeButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateAndTimeText: {
    color: "#002538",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
  selectDateAndTimeButton: {
    backgroundColor: "#002538",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: "40%",
  },
  selectDateAndTimeButtonText: {
    color: "#FA983B",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },

  selectLogTypeContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textLabelLogType: {
    color: "#002538",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
  dropdownsRow: {
    flexDirection: "row",
  },
  dropdown1BtnStyle: {
    height: 25,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },

  buttonSubmit: {
    backgroundColor: "#FA983B",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 7,
    width: "90%",
  },
  textButtonSubmit: {
    color: "#002538",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
});
