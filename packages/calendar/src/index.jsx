import React, { PureComponent } from 'react';
import Stateless from './Stateless';

export default class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    const now = new Date();
    const today = now.getDate();
    const thisMonth = now.getMonth() + 1;
    const thisYear = now.getFullYear();
    this.state = {
      day: today,
      focused: 0,
      selected: [],
      month: thisMonth,
      year: thisYear,
    };
  }

  handleBlur = () => this.setState({
    focused: 0,
  })

  handleChange = ({ day, month, year }) => this.setState({
    focused: day,
    month,
    year,
  })

  handleSelect = ({ iso }) => {
    const { selected } = this.state;
    if (selected.indexOf(iso) === -1) {
      this.setState({ selected: [iso] });
    } else {
      this.setState({ selected: [] });
    }
  }

  render() {
    return (
      <Stateless
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        {...this.state}
      />
    );
  }
}

export const AkCalendar = Stateless;
