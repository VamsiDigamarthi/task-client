import React from "react";
import BarChart from "../BarChart/BarChart";
import PieChart from "../PieChart/PieChart";
import ScatterPlot from "../ScatterPlot/ScatterPlot";
import BoxPlot from "../BoxPlot/BoxPlot";
import "./Dashboard.css";
// import GridLayout from "react-grid-layout";
import { useDashboard } from "./Dashboard.hook";

const Dashboard = () => {
  const {
    barChartData,
    pieChartData,
    scatterPlotData,
    boxPlotData,
    resourcesUse,
    storeUniqueValue,
    onChangeGender,
  } = useDashboard();

  if (
    !barChartData ||
    !pieChartData ||
    !scatterPlotData ||
    !boxPlotData ||
    !resourcesUse
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashbord">
      <select onChange={onChangeGender}>
        <option selected hidden disabled>
          SELECT GENDER
        </option>
        <option value="all">All</option>
        {storeUniqueValue?.map((each) => (
          <option key={each} value={each}>
            {each}
          </option>
        ))}
        {/* <h1>Investment Dashboard</h1> */}
      </select>
      <div className="chart-container">
        <BarChart data={Object?.values(barChartData)} />
        <PieChart data={Object?.values(pieChartData)} />
        <ScatterPlot data={scatterPlotData} />
        <BoxPlot data={boxPlotData} />
        <BarChart resources={true} data={Object?.values(resourcesUse)} />
      </div>
    </div>
  );
};

export default Dashboard;

// <div className="dashboard">
//   <h1>Investment Dashboard</h1>
//   <GridLayout
//     className="layout"
//     layout={layout}
//     cols={4}
//     rowHeight={200}
//     width={1100}
//   >
//     <div key="barchart" className="chart-tile">
//       <BarChart data={Object.values(barChartData)} />
//     </div>
//     <div key="piechart" className="chart-tile">
//       <PieChart data={Object.values(pieChartData)} />
//     </div>
//     <div key="scatterplot" className="chart-tile">
//       <ScatterPlot data={scatterPlotData} />
//     </div>
//     <div key="boxplot" className="chart-tile">
//       <BoxPlot data={boxPlotData} />
//     </div>
//     <div key="resourcechart" className="chart-tile">
//       <BarChart resources={true} data={Object.values(resourcesUse)} />
//     </div>
//   </GridLayout>
// </div>
