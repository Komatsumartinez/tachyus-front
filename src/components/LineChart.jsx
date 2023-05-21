import {
    Chart,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle
} from "@progress/kendo-react-charts";
import React from "react";

const ProductionChart = ({ productionData }) => {

    const limitedData = productionData.slice(0, 20);
    const Year = "Year";
    const Month = "Month";
    const yFields = ["Qo", "Qw", "Qs", "Qg"];

    const categories = limitedData.map((item) => item[Year] + "-" + item[Month]);

    const seriesData = yFields.map((field) =>
        limitedData.map((item) => parseFloat(item[field]))
    );

    return (
        <div style={{ overflowX: "auto" }}>
            <Chart style={{ minWidth: "600px" }}>
                <ChartTitle text="Production Data" />
                <ChartLegend position="bottom" />
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem categories={categories} />
                </ChartCategoryAxis>
                <ChartSeries>
                    {yFields.map((field, index) => (
                        <ChartSeriesItem
                            key={field}
                            type="line"
                            data={seriesData[index]}
                            name={field}
                        />
                    ))}
                </ChartSeries>
            </Chart>
        </div>
    );
};

export default ProductionChart;
