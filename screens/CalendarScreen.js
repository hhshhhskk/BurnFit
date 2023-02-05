import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

function CalendarScreen() {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var newDate = new Date();
  const [year, setYear] = useState(newDate.getFullYear());
  const [month, setMonth] = useState(newDate.getMonth() + 1);
  const [date, setDate] = useState(newDate.getDate());
  const [day, setDay] = useState(newDate.getDay());

  // 이전 달 마지막 날짜, 이번 달 마지막 날짜
  const prevLast = new Date(year, month-1, 0);
  const nowLast = new Date(year, month, 0);
  
  const prevDate = prevLast.getDate();
  const prevDay = prevLast.getDay();

  const nowDate = nowLast.getDate();
  const nowDay = nowLast.getDay();

  const prevDates = [];
  const nowDates = [...Array(nowDate + 1).keys()].slice(1);
  const nextDates = [];

  // 달력 이전 달 채우기
  if (prevDay !== 6) {
    for (let i = 0; i < prevDay + 1; i++) {
      prevDates.unshift(prevDate - i);
    }
  }

  // 달력 다음 달 채우기
  for (let i = 1; i < 7 - nowDay; i++) {
    nextDates.push(i)
  }

  // Dates 합치기
  const dates = prevDates.concat(nowDates, nextDates);


  function prevButton(month) {
    if (month === 1) {
      return 12;
    }
    return month - 1;
  };
  function nextButton(month) {
    if (month === 12) {
      return 1;
    }
    return month + 1;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusbar}></View>
      <View style={styles.month}>
        <Button title="<" onPress={() => {setMonth(prevButton(month))}}/>
        <Text>{month}월</Text>
        <Button title=">" onPress={() => {setMonth(nextButton(month))}}/>
      </View>
      <View style={styles.calendar}>
        <View style={styles.weekname}>
          {week.map((i) => (
          <Text style={ifStyles(i).weektext} key={i}>{i}</Text>
          ))}
        </View>
        <View style={styles.date}>
          {dates.map((date, i) => (
              <View style={styles.datebox} key={i}>
                <Text style={ifStyles().datetext}>{date}</Text>
              </View>
          ))}
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  statusbar: {
    flex: 0.3,
    backgroundColor: "orange",
  },
  month: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendar: {
    flex: 9,
    backgroundColor: "grey",
  },
  weekname: {
    flexDirection: "row",
  },
  date: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  datebox: {
    width: "14.25%"
  }
});
const ifStyles = (i) => StyleSheet.create({
  weektext: {
    flex: 1,
    textAlign: "center",
    color: (i === "Sun") ? "red" : (i === "Sat") ? "skyblue" : "white",
  },
  datetext: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
  }
});
export default CalendarScreen;