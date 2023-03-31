import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

    const [bscSupply, setBscSupply] = useState(0);
    const [bcSupply, setBcSupply] = useState(0);
    const [scheduledBurn, setScheduledBurn] = useState(0);
    const [realTimeBurn, setRealTimeBurn] = useState(0);
    const [hackerAmtLockedAsBurn, setHackerAmtLockedAsBurn] = useState(0);


    useEffect(() => {
        const getData = async () => {
            try {
                //  Get BSC and BC Supply
                const bscBcSupplyReqData = await fetch("https://www.bnbburn.info/api/getBnbSupply",);
                const bscBcSupplyResData = await bscBcSupplyReqData.json();
                console.log("BSC and BC Supply");
                console.log(bscBcSupplyResData);

                //  Get Real-time burn
                const realTimeBurnReqData = await fetch("https://www.bnbburn.info/api/getRealTimeBurnInfo");
                const realTimeBurnResData = await realTimeBurnReqData.json();
                console.log("real-time burn data");
                console.log(realTimeBurnResData.totalBurnt);

                //  Get all Quarterly Burns
                const quarterlyBurnReqData = await fetch("https://www.bnbburn.info/api/getQuarterBurns");
                const quarterlyBurnResData = await quarterlyBurnReqData.json();

                //  Cal. Scheduled Burn by adding all quarterly burns
                let scheduledBurnData = 0;
                for (let i = 0; i < (quarterlyBurnResData?.quarters ?? []).length; i++) {
                    const quarter = quarterlyBurnResData?.quarters[i];
                    scheduledBurnData += parseFloat(quarter.amount);
                }
                console.log("Scheduled burn: ", scheduledBurnData);

                //  Setting up all values
                setBscSupply(bscBcSupplyResData?.bscSupply);
                setBcSupply(bscBcSupplyResData?.bcSupply);
                setRealTimeBurn(realTimeBurnResData?.totalBurnt);
                setScheduledBurn(scheduledBurnData);
                setHackerAmtLockedAsBurn(1020000);
            } catch (err) {
                console.log("Error occured: ", err);
            }
        };
        getData();
    }, [])

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
                                labels: ['BSC Supply', 'BC Supply', 'Scheduled Burn', 'Real-Time Burn', 'Hacker Amount locked as burn'],
                                datasets: [
                                    {
                                        // label: '# of supply/burn',
                                        data: [bscSupply.toFixed(2), bcSupply.toFixed(2), scheduledBurn.toFixed(2), realTimeBurn.toFixed(2), hackerAmtLockedAsBurn.toFixed(2)],
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

export default PieChart;