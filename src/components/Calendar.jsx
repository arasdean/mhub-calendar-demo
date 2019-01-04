import React from "react";
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux'; 
import dateFns from "date-fns";
import Reminder from './Reminder'; 

const months = [ 'jan',
    'feb',
    'march',
    'april',
    'may',
    'june',
    'july',
    'aug',
    'sept',
    'oct',
    'nov',
    'dec' ]

const parser = (dateString) => {
  const int = dateString.split(':')[0];
  return parseInt(int);
} 
const compare = (a,b) => {
  const newA = parser(a.reminder[1]); 
  const newB = parser(b.reminder[1]); 
  if (newA < newB)
    return -1;
  if (newA > newB)
    return 1;
  return 0;
}

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const { calendar } = this.props; 
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    const currentMonthString = months[currentMonth.getMonth()];
    let formattedDate = "";

    const generateReminders = (curr, start) => {
      
      
      if (dateFns.isSameMonth(curr, start)) {
        const dateNum = curr.getDate(); 
        const reminderDateArr = calendar[currentMonthString][dateNum]
        if (reminderDateArr.length > 0) {
          const reminders = []; 
          reminderDateArr.sort(compare)
          reminderDateArr.forEach((item) => {
            const [title, time, color] = item.reminder;
            const extra = {title, time, color}; 
            reminders.push(<Reminder {...extra} />)
          })
          return reminders; 
        }
      }
      return null; 
    }

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            { generateReminders(day, monthStart) } 
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    console.log(this.props.calendar); 
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

Calendar.propTypes = {
  calendar: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  calendar: state.reminders.calendar
});


export default connect(mapStateToProps)(Calendar);
