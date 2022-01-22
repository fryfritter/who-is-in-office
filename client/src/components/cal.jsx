import React from "react";
// import addMonths from 'date-fns/addMonths'
import { api } from "./constants/api";

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

class Cal extends React.Component {
  state = {
    currentMonth: new Date(),
    currentWeek: new Date(),
    selectedDate: new Date(),
    isLoading: true,
    allStaff: [],
    staffSchedule: [],
    isScheduleLoading: true,
  };

  componentDidMount() {
    this.loadStaff();
    this.loadStaffSchedule();
  }

  async loadStaff() {
    // const url = api.staffApi + "/staffList";
    const url = "http://localhost:4000/api/staff/staffList";

    let resp = await axios.get(url, {});
    // allStaff = resp.data;
    console.log(resp.data);
    // this.allStaff = resp.data;
    this.setState({
      allStaff: resp.data,
      isLoading: false,
    });
  }

  async loadStaffSchedule(dateFrom, dateTo) {
    // const url = api.staffApi + "/staffList";
    const url = "http://localhost:4000/api/staff/staffSchedule";

    let resp = await axios.get(url, { dateFrom, dateTo });
    // allStaff = resp.data;
    // this.allStaff = resp.data;
    this.setState({
      staffSchedule: resp.data,
    });
  }

  daysOfWeek = [];
  renderHeader() {
    const dateFormat = "yyyy";
    const weekDateFormat = "dd MMMM";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
          <div>
            {format(
              addDays(startOfWeek(this.state.currentWeek), 1),
              weekDateFormat
            )}
            - {format(endOfWeek(this.state.currentWeek), weekDateFormat)}
          </div>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "EEEE";
    const dateMonthFormat = "dd MMM";
    const dateMonthYearFormat = "dd MMM yyyy";
    this.daysOfWeek = []; //reset days of week details

    const days = [];

    let startDate = startOfWeek(this.state.currentWeek);

    days.push(<div className="col col-center">Staff Name</div>);
    for (let i = 1; i < 8; i++) {
      this.daysOfWeek.push(format(addDays(startDate, i), dateMonthYearFormat));
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)} <br></br>
          {format(addDays(startDate, i), dateMonthFormat)}
        </div>
      );
    }

    return <div className="row blue">{days}</div>;
  }

  renderSchedules() {
    // const allStaff2 = ["Bruce", "Clark", "Diana"];
    console.log("Before calling load staff in schedule");
    // this.loadStaff();

    let staffSchedules = [];
    console.log("is the stage loading?", this.state.isLoading);
    if (!this.state.isLoading) {
      staffSchedules = this.state.allStaff.map((staff) => {
        let rowDetails = [];

        console.log("calling me -", staff);

        rowDetails.push(<div className="col cell">{staff.name}</div>);

        console.log("now in days of week", this.state.staffSchedule);

        this.daysOfWeek.map((day) => {
          let filtered = this.state.staffSchedule.filter(
            (schedule) =>
              schedule.staffId === staff.id &&
              format(new Date(schedule.officeOn), "dd MMM yyyy") === day
          );
          if (filtered.length > 0)
            rowDetails.push(
              <div
                className="col cell selected"
                onClick={() => this.deleteSchedule(staff.id, day)}
              >
                {" "}
                Office{" "}
              </div>
            );
          else
            rowDetails.push(
              <div
                className="col cell"
                onClick={() => this.addSchedule(staff.id, day)}
              >
                {" "}
                Home{" "}
              </div>
            );

          return day;
        });

        return (
          <div className="row" key={staff.id}>
            {rowDetails}
          </div>
        );
      });
    }

    console.log("calling me -", staffSchedules);
    return <div className="body">{staffSchedules}</div>;

    // return <div className="body">ss</div>;
  }

  addSchedule = async (staffId, officeOn) => {
    console.log("add now", staffId, officeOn);
    const url = "http://localhost:4000/api/staff/addSchedule";
    let resp = await axios.post(url, { staffId, officeOn });
    console.log("response ", resp.data);
    //call reload schedule
    this.loadStaffSchedule();
  };

  deleteSchedule = async (staffId, officeOn) => {
    console.log("remove now", staffId, officeOn);
    const url = "http://localhost:4000/api/staff/deleteSchedule";
    let resp = await axios.post(url, { staffId, officeOn });
    console.log("response ", resp.data);
    //call reload schedule
    this.loadStaffSchedule();
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  nextWeek = () => {
    this.setState({
      currentWeek: addWeeks(this.state.currentWeek, 1),
    });
  };

  prevWeek = () => {
    this.setState({
      currentWeek: subWeeks(this.state.currentWeek, 1),
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderSchedules()}
      </div>
    );
  }
}

export default Cal;
