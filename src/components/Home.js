import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import SimpleCard from "./SimpleCard";
import DoughnutChart from "./DoughnutChart";
import { toFixed } from "../utils/utils";
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {

    const [bscSupply, setBscSupply] = useState(0);
    const [bcSupply, setBcSupply] = useState(0);
    const [scheduledBurn, setScheduledBurn] = useState(0);
    const [realTimeBurn, setRealTimeBurn] = useState(0);
    const [hackerAmtLockedAsBurn, setHackerAmtLockedAsBurn] = useState(0);
    const [communityBurn, setCommunityBurn] = useState(0);

    useEffect(() => {
        const bnbBurnProxyServerHost = process.env.REACT_APP_BNB_BURN_PROXY_SERVER_HOST;
        const bnbBurnProxyServerPort = process.env.REACT_APP_BNB_BURN_PROXY_SERVER_PORT;

        const getData = async () => {
            try {
                //  Get BSC and BC Supply
                /**
                 * const bscBcSupplyReqData = await fetch("https://www.bnbburn.info/api/getBnbSupply",);
                 */
                const bscBcSupplyReqData = await fetch(`http://${bnbBurnProxyServerHost}:${bnbBurnProxyServerPort}/bsc_bc_supply`,);
                const bscBcSupplyResData = await bscBcSupplyReqData.json();

                //  Get Real-time burn
                /**
                 * const realTimeBurnReqData = await fetch("https://www.bnbburn.info/api/getRealTimeBurnInfo");
                 */
                const realTimeBurnReqData = await fetch(`http://${bnbBurnProxyServerHost}:${bnbBurnProxyServerPort}/real_time_burn_info`);
                const realTimeBurnResData = await realTimeBurnReqData.json();

                //  Get all Quarterly Burns
                /**
                 * const quarterlyBurnReqData = await fetch("https://www.bnbburn.info/api/getQuarterBurns");
                 */
                const quarterlyBurnReqData = await fetch(`http://${bnbBurnProxyServerHost}:${bnbBurnProxyServerPort}/quarter_burns`);
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

                //  Setting up all values
                setBscSupply(bscBcSupplyResData?.bscSupply);
                setBcSupply(bscBcSupplyResData?.bcSupply);
                setRealTimeBurn(realTimeBurnResData?.totalBurnt);
                setScheduledBurn(scheduledBurnData);
                setHackerAmtLockedAsBurn(1020000);

                // const communityBurn = parseFloat("200000000") + parseFloat("2000000") - parseFloat(bscBcSupplyResData?.bscSupply).toFixed(2) - parseFloat(bscBcSupplyResData?.bcSupply).toFixed(2) - parseFloat("1020000") - parseFloat(realTimeBurnResData?.totalBurnt).toFixed(2) - parseFloat(scheduledBurnData).toFixed(2);
                const communityBurn = parseFloat("200000000") + parseFloat("2000000") - toFixed(bscBcSupplyResData?.bscSupply, 2) - toFixed(bscBcSupplyResData?.bcSupply, 2) - parseFloat("1020000") - toFixed(realTimeBurnResData?.totalBurnt, 2) - toFixed(scheduledBurnData, 2)
                setCommunityBurn(communityBurn);

            } catch (err) {
                console.log("Error occured: ", err);
            }
        };
        getData();
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5 mb-3">

                        <DoughnutChart dataArrProp={[bscSupply.toFixed(2), bcSupply.toFixed(2), scheduledBurn.toFixed(2), realTimeBurn.toFixed(2), hackerAmtLockedAsBurn.toFixed(2)]} textArrProp={['BSC Supply', 'BC Supply', 'Scheduled Burn', 'Real-Time Burn', 'Hacker Amount locked as burn']}></DoughnutChart>

                    </div>
                </div>

                {/* Cards for BSC, BC, Real-time burn, SB, HM locked as Burn */}
                <div>
                    <SimpleCard valueProp={toFixed(bscSupply, 2)} textProp={"BSC Supply"}></SimpleCard>
                    <SimpleCard valueProp={toFixed(bcSupply, 2)} textProp={"BC Supply"}></SimpleCard>
                    <SimpleCard valueProp={toFixed(scheduledBurn, 2)} textProp={"Schedule Burn"}></SimpleCard>
                    <SimpleCard valueProp={toFixed(realTimeBurn, 2)} textProp={"Real-Time Burn"}></SimpleCard>
                    <SimpleCard valueProp={toFixed(communityBurn, 2)} textProp={"Community Burn"}></SimpleCard>
                    <SimpleCard valueProp={toFixed(hackerAmtLockedAsBurn, 0)} textProp={"Hacker amt locked"}></SimpleCard>
                </div>

            </div>
        </React.Fragment>

    )
}

export default Home;