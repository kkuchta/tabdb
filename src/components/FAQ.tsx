import React from 'react';
import './FAQ.css';

class FAQ extends React.Component {
  state = {
    showing: false
  }
  toggleVisibility = () => {
    this.setState({ showing: !this.state.showing });
  }
  renderFAQ() {
    return (
      <ul>
        <li>
          <span className='question'>How dare you?</span>
          I guess that <i>is</i> technically a question I get frequently.
        </li>
        <li>
          <span className='question'>Ok, what's it actually doing?</span>
          Every time you run an SQL query, it grabs all the data stored in the neighboring tabs' titles, concatenates it, unzips it, and loads it into an in-memory sqlite database.  It then runs the command, dumps the db state to a string, zips it up, and spreads it out across the available tabs.
        </li>
        <li>
          <span className='question'>To reiterate: How dare you?</span>
          Someone <a href='https://twitter.com/jbrodley/status/1152411896667967490'>jokingly tweeted about using tabs as a database</a> and I thought "how hard could it be?"
        </li>
        <li>
          <span className='question'>Ok, so why is this a good idea?</span>
          A <i>what</i>?
        </li>
        <li>
          <span className='question'>Like, when would you use this in real life?</span>
          I don't understand the question.
        </li>
        <li>
          <span className='question'>Ok, so how'd you open tabs in the background reliably?</span>
          I didn't.  Browsers *really* frown on pop-unders.  Instead, we open a new tab in the foreground, copy over the UI to it, then ditch the UI to the current tab (which is now in the background).
        </li>
        <li>
          <span className='question'>How are the tabs communicating with each other?</span>
          The "root" tab was always opened by the most recent "data" tab, so the root tab can grab a reference to that tab with <code>window.opener</code>.  Likewise, we can get the <i>next</i> data tab with <code>window.opener.opener</code>, and so on to get all data tabs.
        </li>
        <li>
          <span className='question'>I think I actually have a legitimate use case for this</span>
          Please reevaluate your life choices.
        </li>
        <li>
          <span className='question'>Who's responsible for this nonsense?</span>
          Blame <a href='https://twitter.com/kkuchta'>@kkuchta</a>.  The source code (not appropriate for small children) is on [github](https://github.com/kkuchta/tabdb).
        </li>
      </ul>
    );
  }
  render() {
    const { showing } = this.state;
    const arrow = showing ? '↑'  : '↓';
    return (
      <div className='FAQ'>
        <div className='faqHideShow' onClick={this.toggleVisibility}>FAQ {arrow}</div>
        { showing && this.renderFAQ() }
      </div>
    );
  }
}

export default FAQ;
