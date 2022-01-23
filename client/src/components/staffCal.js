import React, { useState } from "react";
import { api } from "./constants/api";
import { ImHome, ImOffice } from "react-icons/im";

import {
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
  addDays,
  startOfWeek,
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
} from "date-fns";
const axios = require("axios");

const StaffCal = () => {
  // return (
  //   <div>
  //     <div>Hello from Signup</div>
  //   </div>
  // );

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setExerciseList] = useState([]);
  // const [exerciseList, setExerciseList] = useState([]);

  // async loadStaff() {
  //   // const url = api.staffApi + "/staffList";
  //   const url = "http://localhost:4000/api/staff/staffList";

  //   let resp = await axios.get(url, {});
  //   // allStaff = resp.data;
  //   this.setState({ allStaff: resp.data });
  //   this.setState({ isLoading: false });
  // }

  let daysOfWeek = [];
  let renderHeader = () => {
    const dateFormat = "yyyy";

    const weekDateFormat = "dd MMMM";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevWeek()}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
          <div>
            {format(addDays(startOfWeek(currentWeek), 1), weekDateFormat)}-{" "}
            {format(endOfWeek(currentWeek), weekDateFormat)}
          </div>
        </div>
        <div className="col col-end" onClick={nextWeek()}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };
  let renderDays = () => {
    const dateFormat = "EEEE";
    const weekDateFormat = "dd MMM";
    daysOfWeek = []; //reset days of week details

    const days = [];

    let startDate = startOfWeek(currentWeek);

    days.push(<div className="col col-center">Staff Name</div>);
    for (let i = 1; i < 8; i++) {
      daysOfWeek.push(format(addDays(startDate, i), weekDateFormat));
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)} <br></br>
          {format(addDays(startDate, i), weekDateFormat)}
        </div>
      );
    }

    return <div className="row blue">{days}</div>;
  };

  let renderSchedules = () => {
    const allStaff = ["Bruce", "Clark", "Diana"];

    const staffInOffice = [
      {
        name: "Bruce",
        officeOn: "19 Jan",
      },
      {
        name: "Diana",
        officeOn: "19 Jan",
      },
      {
        name: "Diana",
        officeOn: "20 Jan",
      },
      {
        name: "Diana",
        officeOn: "21 Jan",
      },
      {
        name: "Bruce",
        officeOn: "21 Jan",
      },
      {
        name: "Clark",
        officeOn: "20 Jan",
      },
    ];
    let staffSchedules = [];
    staffSchedules = allStaff.map((staff) => {
      let rowDetails = [];

      console.log("calling me -", staff);

      rowDetails.push(
        <div className="col cell">{staff}</div>
        /* <div>{dailySchedule}</div> */
      );
      daysOfWeek.map((day) => {
        console.log("day of week-day", day);
        console.log("day of week-staff", staff);

        let filtered = staffInOffice.filter(
          (schedule) => schedule.name === staff && schedule.officeOn === day
        );
        console.log(filtered);
        if (filtered.length > 0)
          rowDetails.push(
            <div className="col cell selected wfo">
              {" "}
              <ImOffice /> Office{" "}
            </div>
          );
        else rowDetails.push(<div className="col cell wfh"> Home </div>);

        return day;
      });

      return (
        <div className="row" key={staff}>
          {rowDetails}
        </div>
      );
    });
    console.log("calling me -", staffSchedules);

    return <div className="body">{staffSchedules}</div>;
  };

  let nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  let prevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {/* {renderDays()} */}
      {/* {renderSchedules()} */}
      {/* {this.renderCells()} */}
    </div>
  );
};
export default StaffCal;
