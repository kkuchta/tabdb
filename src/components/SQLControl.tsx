import React, { Component } from 'react';

import { QueryResult } from '../lib/Database'

const PREFILLS = {
  create: "CREATE TABLE users (age int, name string);",
  insert: "INSERT INTO users VALUES (20, 'bill');\nINSERT INTO users VALUES (32, 'ann');",
  select: "SELECT * FROM users;"
} as any;

class SQLControl extends Component {
  state = {value: '', lastQueryOutput: {} as QueryResult}
  onSubmit = () => {
    const result = window.windowManager.submitSQL(this.state.value);
    console.log("result =", result)
    this.setState({ lastQueryOutput: result })
    console.log(this.state.value)
  }
  prefill = (key: string) => () => this.setState({ value: PREFILLS[key] });
  renderQueryOutput() {
    console.log("Rendering output", this.state.lastQueryOutput)
    const output = this.state.lastQueryOutput;
    if (output == null) {
      return <div>Run a query to get some output</div>;
    } else if (output.error != null) {
      return <div>Error: {output.error}</div>;
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
    return (
      <div className='SQLControl'>
        <textarea value={this.state.value} onChange={(e) => this.setState({value: e.target.value})}/>
        <br />
        <button onClick={this.onSubmit}>Run SQL</button>
        <button onClick={this.prefill('create')}>Create</button>
        <button onClick={this.prefill('insert')}>Insert</button>
        <button onClick={this.prefill('select')}>Select</button>
        <br />
        <div className='queryOutput'>
          { this.renderQueryOutput() }
        </div>
      </div>
    );
  }
}

export default SQLControl;
