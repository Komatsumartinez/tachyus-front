import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductionGrid = ({ productionData }) => {
  const [loadedData, setLoadedData] = useState(productionData.slice(0, 200));
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 50;

  const loadMoreData = () => {
    const loadedCount = loadedData.length;
    const remainingData = productionData.slice(
      loadedCount,
      loadedCount + pageSize
    );
    const newData = [...loadedData, ...remainingData];

    if (remainingData.length < pageSize) {
      setHasMore(false);
    }

    setLoadedData(newData);
  };

  const renderRows = () => {
    return loadedData.map((item) => ({
      ...item,
      gross: parseFloat(item.Qo) + parseFloat(item.Qw)
    }));
  };

  return (
    <div>
      <h2>Production Data</h2>
      <div style={{ height: "400px", width: "100%", overflow: "auto" }}>
        <Grid
          data={renderRows()}
          style={{ maxHeight: "100%" }}
          scrollable="virtual"
        >
          <GridColumn field="Year" title="Year" />
          <GridColumn field="Month" title="Month" />
          <GridColumn field="wellAPI" title="Well API" />
          <GridColumn field="boreID" title="Bore ID" />
          <GridColumn field="compSubId" title="Comp Sub ID" />
          <GridColumn field="CompL" title="Compl" />
          <GridColumn field="BHP" title="BHP" />
          <GridColumn field="FlowDays" title="Flow Days" />
          <GridColumn field="Qg" title="QG" />
          <GridColumn field="Qo" title="QO" />
          <GridColumn field="Qs" title="QS" />
          <GridColumn field="Qw" title="QW" />
          <GridColumn field="gross" title="Gross" />
        </Grid>
      </div>
      {hasMore && (
        <InfiniteScroll
          dataLength={loadedData.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        />
      )}
    </div>
  );
};

export default ProductionGrid;
