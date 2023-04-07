import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import SimpleCard from "./SimpleCard";
import DoughnutChart from "./DoughnutChart";
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {

    const [bscSupply, setBscSupply] = useState(0);
    const [bcSupply, setBcSupply] = useState(0);
    const [scheduledBurn, setScheduledBurn] = useState(0);
    const [realTimeBurn, setRealTimeBurn] = useState(0);
    const [hackerAmtLockedAsBurn, setHackerAmtLockedAsBurn] = useState(0);
    const [communityBurn, setCommunityBurn] = useState(0);


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
                    if (quarter?.burnDate == null) continue;
                    else {
                        scheduledBurnData += parseFloat(quarter.amount);
                    }
                }
                console.log("Scheduled burn: ", scheduledBurnData);

                //  Setting up all values
                setBscSupply(bscBcSupplyResData?.bscSupply);

                console.log("======= Setting bsc supply =======");
                console.log("bscBcSupplyResData: ", bscBcSupplyResData);
                console.log("bscBcSupplyResData?.bscSupply: ", bscBcSupplyResData?.bscSupply);
                console.log("bsc supply: ", bscSupply);
                setBcSupply(bscBcSupplyResData?.bcSupply);
                setRealTimeBurn(realTimeBurnResData?.totalBurnt);
                setScheduledBurn(scheduledBurnData);
                setHackerAmtLockedAsBurn(1020000);

                console.log("1st 4 params: ", parseFloat("200000000") + parseFloat("2000000") - parseFloat(bscBcSupplyResData?.bscSupply).toFixed(2) - parseFloat(bscBcSupplyResData?.bcSupply).toFixed(2));
                console.log("1st 5 params: ", parseFloat("200000000") + parseFloat("2000000") - parseFloat(bscBcSupplyResData?.bscSupply).toFixed(2) - parseFloat(bscBcSupplyResData?.bcSupply).toFixed(2) - parseFloat("1020000"));
                console.log("1st 6 params: ", parseFloat("200000000") + parseFloat("2000000") - parseFloat(bscBcSupplyResData?.bscSupply).toFixed(2) - parseFloat(bscBcSupplyResData?.bcSupply).toFixed(2) - parseFloat("1020000") - parseFloat(realTimeBurnResData?.totalBurnt).toFixed(2));
                console.log("parseFloat(bscSupply).toFixed(2): ", parseFloat(bscBcSupplyResData.bscSupply).toFixed(2));
                console.log("parseFloat(bc).toFixed(2): ", parseFloat(bscBcSupplyResData.bcSupply).toFixed(2));
                console.log("parseFloat(hacker).toFixed(2): ", parseFloat("1020000"));
                console.log("parseFloat(real-time).toFixed(2): ", parseFloat(realTimeBurnResData?.totalBurnt).toFixed(2));
                console.log("parseFloat(scheduledBurnData).toFixed(2): ", parseFloat(scheduledBurnData).toFixed(2));

                const adds = parseFloat("200000000") + parseFloat("2000000") - parseFloat(bscBcSupplyResData?.bscSupply).toFixed(2) - parseFloat(bscBcSupplyResData?.bcSupply).toFixed(2) - parseFloat("1020000") - parseFloat(realTimeBurnResData?.totalBurnt).toFixed(2) - parseFloat(scheduledBurnData).toFixed(2);
                // console.log("check: ", parseFloat(hackerAmtLockedAsBurn.toString()))
                // const subs = 

                console.log("adds: ", adds);
                // console.log("subs: ", subs);

                setCommunityBurn(adds);
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

                        <DoughnutChart dataArrProp={[bscSupply.toFixed(2), bcSupply.toFixed(2), scheduledBurn.toFixed(2), realTimeBurn.toFixed(2), hackerAmtLockedAsBurn.toFixed(2)]} textArrProp={['BSC Supply', 'BC Supply', 'Scheduled Burn', 'Real-Time Burn', 'Hacker Amount locked as burn']}></DoughnutChart>


                    </div>
                </div>

                {/* Cards for BSC, BC, Real-time burn, SB, HM locked as Burn */}
                <div>
                    <SimpleCard valueProp={bscSupply} textProp={"BSC Supply"}></SimpleCard>
                    <SimpleCard valueProp={bcSupply} textProp={"BC Supply"}></SimpleCard>
                    <SimpleCard valueProp={scheduledBurn} textProp={"Schedule Burn"}></SimpleCard>
                    <SimpleCard valueProp={realTimeBurn} textProp={"Real-Time Burn"}></SimpleCard>
                    <SimpleCard valueProp={communityBurn} textProp={"Community Burn"}></SimpleCard>
                    <SimpleCard valueProp={hackerAmtLockedAsBurn} textProp={"Hacker Amt lkd as burn"}></SimpleCard>
                </div>

            </div>
        </React.Fragment>

    )
}

export default Home;