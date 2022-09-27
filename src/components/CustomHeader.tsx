import { Pressable, Text } from "@react-native-material/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Logo from "./Logo";


interface CustomHeaderProps {
  title?: string
}

export default function CustomHeader({ title }: CustomHeaderProps) {
  const userData = useSelector((state: RootState) => state.user);
  const tokenAuth = useSelector((state: any) => state.userToken);
  const [titleToDisplay, setTitleToDisplay] = useState<string>("");

  useEffect(() => {
    if (title === userData?.firstName) {
      setTitleToDisplay(userData?.firstName)
    } else if (title === "HomeTab") {
      setTitleToDisplay("");
    } else if (title === "SearchTab") {
      setTitleToDisplay("Rechercher");
    } else if (title === "NotificationTab") {
      setTitleToDisplay("Notifications");
    }
  }, [userData, title]);

  return (
    <Pressable
      onPress={() => {
        console.log("press");
      }}
      style={!tokenAuth ? {flex: 0.9, alignItems: 'center', justifyContent: 'center'} : { marginLeft: 16, flexDirection: "row", alignItems: "center" }}
    >
      <Logo />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 70, width: '100%' }}>{titleToDisplay}</Text>
    </Pressable>
  );
}