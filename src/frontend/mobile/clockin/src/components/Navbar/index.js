import React, { useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function Navbar({
  title,
  filter = false,
  home = false,
  navigateToPage = "",
  pageName = "",
}) {
  const navigaion = useNavigation();
  const { logout } = useAuthentication();

  

  return (
    <View>
      <SafeAreaView style={styles.safeAreaView} />
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          {home ? (
            <TouchableOpacity onPress={() => navigateToPage(pageName)}>
              <FontAwesome name="user-circle" style={styles.userIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigaion.goBack()}>
              <Ionicons name="chevron-back" style={styles.icon} />
            </TouchableOpacity>
          )}
          <Text style={styles.textHeader}>{title}</Text>
        </View>
        {filter && (
          <View>
            <TouchableOpacity style={styles.headerIcons} onPress={() => {}}>
              <Ionicons name="md-filter-sharp" style={styles.icon} />
              <Text style={styles.textHeader}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        )}
        {home && (
          <View>
            <TouchableOpacity
              style={styles.headerIcons}
              onPress={() => logout()}
            >
              <MaterialIcons name="logout" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#002538",
    flex: 0,
  },
  header: {
    backgroundColor: "#002538",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    height: 80,
    justifyContent: "space-between",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textHeader: {
    color: "#fea222",
    fontWeight: "700",
    fontSize: 18,
  },
  icon: {
    fontSize: 22,
    color: "#fea222",
  },
  userIcon: {
    color: "#fea222",
    fontSize: 45,
  },
});
