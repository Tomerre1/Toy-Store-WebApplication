import React from 'react';
import { connect } from 'react-redux';
import { ToyChartPie } from './ToyChartPie';
import { ToyChartDoughnut } from './ToyChartDoughnut';


const _ToyChart = ({ toys }) => {
    const calcChartPie = () => {
        const toyTypes = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'];
        const toyCounts = [];
        for (let i = 0; i < toyTypes.length; i++) {
            toyCounts.push(0);
        }

        for (let i = 0; i < toys.length; i++) {
            for (let j = 0; j < toys[i].labels.length; j++) {
                toyCounts[toyTypes.indexOf(toys[i].labels[j])]++;
            }
        }
        return toyCounts;
    }

    const calcChartDoughnut = () => {
        const toyPrices = [150, 199, 255, 400, 800, 1000];
        const toyCounts = [];
        for (let i = 0; i < toyPrices.length; i++) {
            toyCounts.push(0);
        }
        for (let i = 0; i < toys.length; i++) {
            toyCounts[toyPrices.indexOf(toys[i].price)]++;
        }
        return toyCounts;
    }

    return (
        <div className="charts">
            <div className="chart">
                <h1>Label statistics:</h1>
                <div>
                    <ToyChartPie data={calcChartPie()} />
                </div>
            </div>
            <div className="chart">
                <h1>Price statistics:</h1>
                <div>
                    <ToyChartDoughnut data={calcChartDoughnut()} />
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
    }
}


export const ToyChart = connect(mapStateToProps, null)(_ToyChart)
