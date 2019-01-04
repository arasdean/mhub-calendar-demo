import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { createReminder } from '../actions/reminderActions';

class ReminderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#ff7875', 
            time: "10:00",
            date: new Date(), 
            title: "Reminder!", 
          };
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    handleTimeChange = time => {this.setState({time: time})}

    handleDateChange = date => {this.setState({date})}

    handleSubmit = () => {
        this.props.createReminder(this.state);        
    }

    render() {
        return (
            <form>
                <label>Reminder: </label>
                <input type="text" name="title" maxLength="30" onChange={this.handleChange}/>
                <label>Date: </label>
                <DatePicker
                    onChange={this.handleDateChange}
                    value={this.state.date}
                />
                <label>Time: </label>
                <TimePicker name='time' onChange={this.handleTimeChange} value={this.state.time} />
                <label>Color: </label>
                <select name='color' defaultValue='#ff7875' onChange={this.handleChange}> 
                    <option value='#69c0ff' > blue </option>    
                    <option value='#ff7875' > red </option>
                    <option value='#d3f261' > green </option>
                </select> 
                <br /> 
                <button type="button" onClick={this.handleSubmit}> Add Reminder </button>
            </form>
        );
    }
}

ReminderForm.propTypes  = {
    createReminder: PropTypes.func.isRequired
};

export default connect(null, {createReminder})(ReminderForm);