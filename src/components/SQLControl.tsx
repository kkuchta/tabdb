import React, { Component } from 'react';
import { QueryResult } from '../lib/Database'
import './SQLControl.css';

const PREFILLS = {
  create: "CREATE TABLE users (age int, name string);",
  insert: "INSERT INTO users VALUES (20, 'bill');\nINSERT INTO users VALUES (32, 'ann');",
  select: "SELECT * FROM users;"
} as any;

class SQLControl extends Component {
  state = {
    value: window.lastWindowData ? window.lastWindowData.textAreaText : '',
    lastQueryOutput: null
  }

  onSubmit = () => {
    const { value } = this.state;
    this.setState({ lastQueryOutput: { message: 'running...' } });

    // Add a half-second delay so it's clear something's happening.  I'm too
    // lazy to make the UI reflect this in a better way.
    setTimeout( () => {
      const result = window.windowManager.submitSQL(value);
      this.setState({ lastQueryOutput: result })
      console.log(this.state.value)
    }, 300 );
  }
  prefill = (key: string) => () => this.setState({ value: PREFILLS[key] });
  onSQLChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

    // We need this value for when we open a new tab.  I don't feel like adding
    // a proper state management system like Redux just to move one variable on
    // a joke project, so let's just yolo a global variable.
    //window.sql = event.target.value;

    this.setState({value: event.target.value});
  };
  renderQueryOutput() {
    console.log("Rendering output", this.state.lastQueryOutput)
    const output = this.state.lastQueryOutput as QueryResult | null;
    if (output == null) {
      return <div>&lt;--- Run a query to get some output</div>;
    } else if (output.error != null) {
      return <div>Error: {output.error}</div>;
    } else if (output.message != null) {
      return <div>{output.message}</div>;
    } else if (output.rows != null && output.rows.values.length > 0) {
      return (
        <table>
          <thead><tr>{ output.rows.columns.map((col) => <th key={col}>{col}</th>) }</tr></thead>
          <tbody>
            { output.rows.values.map(
              (row, i) => <tr key={i}>
                { row.map(
                  (value, i) => <td key={i}>{value}</td>
                ) }
              </tr>
            ) }
          </tbody>
        </table>
      );
    } else {
      return <div>Query ran successfully</div>;
    }
  }
  render() {
    const { value } = this.state;
    return (
      <div className='SQLControl'>
        <div className='input'>
          <textarea
            value={value}
            onChange={this.onSQLChange}
            placeholder='Type SQL here, or use the buttons below to quick-fill common queries.'
          />
          <button className='runSQL' disabled={value == null || value === ''} onClick={this.onSubmit}>Run SQL</button>
          <div className='prefillButtons'>
            <span className='prefillLabel'>Quick sql samples:</span>
            <button onClick={this.prefill('create')}>Create</button>
            <button onClick={this.prefill('insert')}>Insert</button>
            <button onClick={this.prefill('select')}>Select</button>
          </div>
        </div>
        <div className='queryOutput'>
          { this.renderQueryOutput() }
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default SQLControl;
