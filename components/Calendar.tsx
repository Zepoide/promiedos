import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import React from "react";

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
        borderColor: Colors[colorScheme].secondary,
      }}
      todayContainerStyle={{ borderColor: Colors[colorScheme].tint }}
      todayTextStyle={{ color: Colors[colorScheme].tint }}
      selectedItemColor={Colors[colorScheme].tint}
      selectedTextStyle={{ color: "black" }}
      monthContainerStyle={{
        backgroundColor: Colors[colorScheme].primary,
        borderColor: Colors[colorScheme].secondary,
      }}
      yearContainerStyle={{
        backgroundColor: Colors[colorScheme].primary,
        borderColor: Colors[colorScheme].secondary,
      }}
    />
  );
};

export default Calendar;
