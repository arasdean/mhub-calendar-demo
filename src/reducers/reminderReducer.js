import { NEW_REMINDER } from '../actions/types';

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

const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 

const mapMonthToNumOfDays = {};

months.forEach((key, i) => { mapMonthToNumOfDays[key] = daysPerMonth[i]})

function generateObj (n) {
    const obj = {};
    for (let i=1; i <= n; i++) {
      obj[i] = []; 
    }
    return obj; 
  }
  
  function createCalendarObject(map) {
      const calendar = {}; 
      
      for (const month in map) {
         calendar[month] = generateObj(map[month])
      }
  
      return calendar;
  }

const calendarObj = createCalendarObject(mapMonthToNumOfDays); 

const initialState = {
    calendar: calendarObj,
};

  export default function(state = initialState, action) {
    
    switch (action.type) {
      case NEW_REMINDER:
        {
        const {title, time, color, date} = action.payload; 
        let newCalendar = Object.assign({}, state.calendar); 
        const month = months[date.getMonth()]; 
        const day = date.getDay() - 1; 
        const remindersArrayLength = newCalendar[month][day].length; 
        const id = remindersArrayLength > 0 ? newCalendar[month][day][remindersArrayLength - 1]['id'] + 1 : 1; 
        newCalendar[month][day].push({id: id, reminder: [title, time, color]})
        return {...state, calendar: newCalendar}
      }
      default:
        return state;
    }
  }