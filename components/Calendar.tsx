import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import Container from "@/components/Container";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";

interface CalendarProps {
  date: Date;
  setDate: (date: Date) => void;
}

const Calendar = ({ date, setDate }: CalendarProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <DateTimePicker
      mode="single"
      date={date}
      onChange={(params) => setDate(dayjs(params.date).toDate())}
      calendarTextStyle={{ color: Colors[colorScheme].text }}
      weekDaysTextStyle={{ color: Colors[colorScheme].text }}
      headerTextStyle={{ color: Colors[colorScheme].tint }}
      headerButtonColor={Colors[colorScheme].tint}
      weekDaysContainerStyle={{
        borderColor: Colors[colorScheme].primary,
      }}
      todayContainerStyle={{ borderColor: Colors[colorScheme].tint }}
      todayTextStyle={{ color: Colors[colorScheme].tint }}
      selectedItemColor={Colors[colorScheme].tint}
      selectedTextStyle={{ color: "white" }}
    />
  );
};

export default Calendar;
