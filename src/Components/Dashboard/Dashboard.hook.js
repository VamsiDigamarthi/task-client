import { useEffect, useState } from "react";
import { API } from "../../Core/url";

export const useDashboard = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [storeUniqueValue, setStoreUniqueValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/data");
        setOriginalData(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Fetch data failed!", error);
        alert("Fetch data failed!");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    data &&
      setStoreUniqueValue([
        ...new Set(originalData?.map((item) => item.gender)),
      ]);
  }, [data]);

  const onChangeGender = (e) => {
    if (e.target.value === "all") {
      setData(originalData);
      return;
    }
    setData(originalData?.filter((item) => item.gender === e.target.value));
  };

  const barChartData = data.reduce((acc, curr) => {
    const mode = curr.modeOfInvestment;
    if (!acc[mode]) {
      acc[mode] = { modeOfInvestment: mode, count: 0 };
    }
    acc[mode].count++;
    return acc;
  }, {});

  const pieChartData = data.reduce((acc, curr) => {
    const cause = curr.motivationCause;
    if (!acc[cause]) {
      acc[cause] = { motivationCause: cause, count: 0 };
    }
    acc[cause].count++;
    return acc;
  }, {});

  const scatterPlotData = data.map((item) => ({
    age: +item.age,
    investmentPerMonth: +item.investmentPerMonth,
  }));

  const boxPlotData = data.map((item) => ({
    modeOfInvestment: item.modeOfInvestment,
    annualIncome: +item.annualIncome,
  }));

  const resourcesUse = data.reduce((acc, curr) => {
    const mode = curr.resourcesUsed;
    if (!acc[mode]) {
      acc[mode] = { resourcesUsed: mode, count: 0 };
    }
    acc[mode].count++;
    return acc;
  }, {});

  // Define the layout for the draggable grid
  // const layout = [
  //   { i: "barchart", x: 0, y: 0, w: 2, h: 2 },
  //   { i: "piechart", x: 2, y: 0, w: 2, h: 2 },
  //   { i: "scatterplot", x: 0, y: 2, w: 2, h: 2 },
  //   { i: "boxplot", x: 2, y: 2, w: 2, h: 2 },
  //   { i: "resourcechart", x: 0, y: 4, w: 2, h: 2 },
  // ];

  return {
    barChartData,
    pieChartData,
    scatterPlotData,
    boxPlotData,
    resourcesUse,
    storeUniqueValue,
    onChangeGender,
    // layout,
  };
};
