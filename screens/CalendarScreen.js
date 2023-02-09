import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'


function CalendarScreen() {
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const [check, setCheck] = useState(false);
  const [checkNum, setCheckNum] = useState();
  var newDate = new Date();
  const [year, setYear] = useState(newDate.getFullYear());
  const [month, setMonth] = useState(newDate.getMonth() + 1);

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

  // 이전 달 ,현재 달, 다음 달 합치기
  const dates = prevDates.concat(nowDates, nextDates);


  function prevButton(month, year) {
    setCheckNum();
    if (month === 1) {
       return setMonth(12), setYear(year-1);
    }
    return setMonth(month - 1);
  };
  function nextButton(month) {
    setCheckNum();
    if (month === 12) {
      return setMonth(1), setYear(year+1);
    }
    return setMonth(month + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusbar}></View>
      <View style={styles.month}>
        <Ionicons name="chevron-back-outline" size={25}  color="skyblue" onPress={() => { prevButton(month, year) }}></Ionicons>
        <Text style={styles.monthName}>{monthName[month-1]} {year}</Text>
        <Ionicons name="chevron-forward-outline" size={25}  color="skyblue" onPress={() => { nextButton(month, year) }}></Ionicons>
      </View>
      <View style={styles.calendar}>
        <View style={styles.weekname}>
          {week.map((i) => (
          <Text style={weekIfStyles(i).weektext} key={i}>{i}</Text>
          ))}
        </View>
        <View style={styles.date}>
          {dates.map((date, i) => (
            <TouchableOpacity style={styles.datebox} key={i}
              onPress={() => {
                if (check === false) {
                  setCheck(!check);
                } else if (checkNum === i) {
                  setCheckNum();
                } else {
                  setCheckNum(i);
                }
              }}>
              <Text style={dateIfStyles(dates, prevDay, nowDay, i, check, checkNum).datetext}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusbar: {
    flex: 0.3,
    backgroundColor: "white",
  },
  month: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
  },
  monthName: {
    fontSize: 20,
  },
  calendar: {
    flex: 9,
    backgroundColor: "white",
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
const weekIfStyles = (i) => StyleSheet.create({
  weektext: {
    flex: 1,
    textAlign: "center",
    color: (i === "Sun") ? "red" : (i === "Sat") ? "skyblue" : "grey",
  },
});
const dateIfStyles = (dates, prevDay, nowDay, i, check, checkNum) => StyleSheet.create({
  datetext: {
    textAlign: "center",
    color: (prevDay != 6 && prevDay >= i) || (dates.length - (7 - nowDay) < i) ? "grey" : "black",
    fontSize: 25,
    margin: 10,
    borderRadius: 50,
    borderColor: "blue",
    borderWidth: checkNum === i && check === true ? 1 : 0,
  },
});

export default CalendarScreen;