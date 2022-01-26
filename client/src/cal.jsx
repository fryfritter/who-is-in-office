import React from "react";
import { ImHome, ImOffice } from "react-icons/im";
import { api } from "./components/constants/api";
import {
  endOfWeek,
  addDays,
  startOfWeek,
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
} from "date-fns";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
    showDialog: false,
  };
  dailyCount = [];
  lastUpdatedStaffSchedule = {};
  componentDidMount() {
    this.loadStaff();
    this.loadStaffSchedule();
  }

  async loadStaff() {
    const url = `${api.staffApi}/staffList`;
    let resp = await axios.get(url, {});
    this.setState({
      allStaff: resp.data,
      isLoading: false,
    });
  }

  async loadStaffSchedule(dateFrom, dateTo) {
    const url = `${api.staffApi}/staffSchedule`;
    let resp = await axios.get(url, { dateFrom, dateTo });

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

    days.push(<div className="col col-start">Staff Name</div>);
    for (let i = 1; i < 8; i++) {
      this.daysOfWeek.push({
        date: format(addDays(startDate, i), dateMonthYearFormat),
        officeCount: 0,
      });
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
    //  console.log("Before calling load staff in schedule");

    let staffSchedules = [];
    // console.log("is the stage loading?", this.state.isLoading);
    let i = 1;
    if (!this.state.isLoading) {
      staffSchedules = this.state.allStaff.map((staff) => {
        let rowDetails = [];

        rowDetails.push(
          <div className="col nameCol col-start">{staff.name}</div>
        );

        // console.log("now in days of week", this.state.staffSchedule);

        this.daysOfWeek.map((day) => {
          let filtered = this.state.staffSchedule.filter(
            (schedule) =>
              schedule.staffId === staff.id &&
              format(new Date(schedule.officeOn), "dd MMM yyyy") === day.date
          );
          if (filtered.length > 0) {
            day.officeCount++;
            rowDetails.push(
              <div
                className="col calendar cell selected wfo"
                onClick={() =>
                  this.deleteSchedule(staff.id, day.date, staff.name)
                }
              >
                {" "}
                <ImOffice /> Office{" "}
              </div>
            );
          } else
            rowDetails.push(
              <div
                className="col cell wfh"
                onClick={() => this.addSchedule(staff.id, day.date, staff.name)}
              >
                <ImHome /> Home{" "}
              </div>
            );

          return day;
        });
        // console.log("so the count is", this.daysOfWeek);
        const newDailyCount = this.daysOfWeek.map((day) => day.officeCount);

        this.dailyCount = newDailyCount;

        return (
          <div className="row " key={staff.id}>
            {rowDetails}
          </div>
        );
      });
    }

    const dayCount = [];
    let maxStaffCap = Math.floor(this.state.allStaff.length / 2);
    dayCount.push(
      <div className="col">
        Staff : {this.state.allStaff.length} | Max :{maxStaffCap}
      </div>
    );

    for (let i = 0; i < 7; i++) {
      let isExceedCap = this.dailyCount[i] >= maxStaffCap;
      if (isExceedCap) {
        dayCount.push(
          <div className="col red" key={i}>
            ({this.dailyCount[i]})
          </div>
        );
      } else {
        dayCount.push(
          <div className="col" key={i}>
            ({this.dailyCount[i]})
          </div>
        );
      }
    }
    let dayCountRow = [
      <div className="row" key={1}>
        {dayCount}
      </div>,
    ];
    staffSchedules = [dayCountRow, ...staffSchedules];
    // console.log("calling me -", staffSchedules);
    return <div className="body">{staffSchedules}</div>;
  }

  addSchedule = async (staffId, officeOn, staffName) => {
    // console.log("add now", staffId, officeOn);

    if (!this.checkLastUpdatedStaff(staffName)) return; //check for accidental update
    const url = `${api.staffApi}/addSchedule`;

    let resp = await axios.post(url, { staffId, officeOn });
    this.lastUpdatedStaffSchedule = {
      name: staffName,
      staffid: staffId,
      officeOn: officeOn,
      action: "ADD",
    };
    this.loadStaffSchedule();
  };

  deleteSchedule = async (staffId, officeOn, staffName) => {
    if (!this.checkLastUpdatedStaff(staffName)) return; //check for accidental update

    // console.log("remove now", staffId, officeOn);
    const url = `${api.staffApi}/deleteSchedule`;
    let resp = await axios.post(url, { staffId, officeOn });
    // console.log("response ", resp.data);
    this.lastUpdatedStaffSchedule = {
      name: staffName,
      staffid: staffId,
      officeOn: officeOn,
      action: "REMOVE",
    };
    this.loadStaffSchedule();
  };

  checkLastUpdatedStaff = (staffName) => {
    if (
      this.lastUpdatedStaffSchedule.name !== undefined &&
      staffName !== this.lastUpdatedStaffSchedule.name
    ) {
      this.handleShow();
      return false;
    }
    return true;
  };

  // Todo: doReverseLastUpdate

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
  handleClose = () =>
    this.setState({
      showDialog: false,
    });

  handleYes = () => {
    this.lastUpdatedStaffSchedule = {};
    this.setState({
      showDialog: false,
    });
  };

  handleShow = () =>
    this.setState({
      showDialog: true,
    });

  render() {
    return (
      <div className="calendar">
        <div className="App-header">who is in office ?</div>
        <Modal show={this.state.showDialog} onHide={this.handleClose}>
          <Modal.Body>
            You have previously updated for {this.lastUpdatedStaffSchedule.name}
            ,<br></br> allow update for different staff?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={this.handleYes}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        {this.renderHeader()}
        {this.renderDays()}
        {/* {this.renderDailyCount()} */}
        <div style={{ maxHeight: "600px", overflow: "auto" }}>
          {this.renderSchedules()}
        </div>
      </div>
    );
  }
}

export default Cal;
