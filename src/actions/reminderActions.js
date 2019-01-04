import { NEW_REMINDER } from './types'; 

export const createReminder = (reminderInfo) => dispatch => {
    dispatch({
        type: NEW_REMINDER, 
        payload: reminderInfo
    })    
};
  