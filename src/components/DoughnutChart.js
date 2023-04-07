import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import SimpleCard from "./SimpleCard";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ dataArrProp, textArrProp }) => {

    return (
        <React.Fragment>
            <div className="container-fluid">
                <h3> Pie Chart </h3>
                <div className="row">
                    <div className="col-md-5 mb-3">


                        <Doughnut
                            width={500}
                            height={400}
                            data={{
                                labels: textArrProp,
                                datasets: [
                                    {
                                        // label: '# of supply/burn',
                                        data: dataArrProp,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                        ],
                                        borderWidth: 1,
                                        hoverOffset: 20,
                                        // offset: [
                                        //     0, 0, 0, 0, 0, 0
                                        // ]
                                    },
                                ],
                            }}

                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        fontSize: 30,
                                        text: 'BNB Supply breakdown',
                                        display: true,
                                        font: {
                                            size: 20
                                        }
                                    },
                                    legend: {
                                        labels: {
                                            font: {
                                                size: 15
                                            }
                                        }
                                    }
                                }
                            }}

                        />


                    </div>
                </div>

            </div>
        </React.Fragment>

    )
}

export default DoughnutChart;