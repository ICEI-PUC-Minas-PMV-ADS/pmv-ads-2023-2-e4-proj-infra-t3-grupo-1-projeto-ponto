import { StatusBar } from "expo-status-bar";
import AppRoute from "./src/routes/AppRoute";
import { React } from "react";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppRoute />
    </>
  );
}
