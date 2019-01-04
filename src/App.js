import React from "react";
import { Provider } from 'react-redux';
import "./App.css";

import Calendar from "./components/Calendar";
import ReminderForm from "./components/ReminderForm";
import store from './store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store} > 
      <div className="App">
        <main>
          <Calendar />
          <ReminderForm /> 
        </main>
      </div>
      </Provider>
    );
  }
}

export default App;
