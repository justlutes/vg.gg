import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      legend: {
        display: props.legend || false,
      },
      data: {
        labels: [],
        datasets: [
          {
            label: 'ELO',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(36, 91, 126, 0.4)',
            borderColor: 'rgba(36, 91, 126, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'RGBA(249,201,131,1.00)',
            pointHoverBorderColor: 'RGBA(106,106,106,1.00)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
        ],
      },
    };
  }

  componentWillMount() {
    const { data } = this.state;
    this.props.elo.map(point => {
      const { season, amount } = point;
      data.labels.push(season);
      data.datasets[0].data.push(amount);
    });

    this.setState({ data });
  }
  render() {
    return (
      <div>
        <Title>ELO by Season</Title>
        <Line data={this.state.data} legend={this.state.legend} />
      </div>
    );
  }
}

const Title = styled.h2`
  text-align: center;
  color: #e9e9e9;
`;
