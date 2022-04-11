import React from 'react';
import { connect } from 'react-redux';
import { ToyChartPie } from './ToyChartPie';
import { ToyChartDoughnut } from './ToyChartDoughnut';
import { useSelector } from 'react-redux';

const _ToyChart = () => {
    const toys = useSelector(state => state.toyModule.toys)
    console.log('%c  toys:', 'color: white;background: red;', toys);
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
        let toyPrices = toys.map(toy => toy.price).sort((a, b) => a - b);
        toyPrices = [...new Set(toyPrices)];
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
                    <ToyChartDoughnut data={calcChartDoughnut()} toys={toys} />
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
