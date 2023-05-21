import { Grid, GridColumn } from '@progress/kendo-react-grid';
import React, { useState } from "react";

const CompletionsGrid = ({ completionsData, onWellNameChange, productionData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editRowValues, setEditRowValues] = useState({});

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEditRow = (event, dataItem) => {
        const editedRow = { ...editRowValues };
        editedRow[dataItem.id] = dataItem.wellName;
        setEditRowValues(editedRow);
    };

    const handleSaveEditRow = (dataItem) => {
        const editedRowValue = editRowValues[dataItem.id];
        if (editedRowValue) {
            onWellNameChange({ ...dataItem, wellName: editedRowValue });
        }
        setEditRowValues((prevEditRowValues) => {
            const updatedRowValues = { ...prevEditRowValues };
            delete updatedRowValues[dataItem.id];
            return updatedRowValues;
        });
    };

    const handleCancelEditRow = (dataItem) => {
        setEditRowValues((prevEditRowValues) => {
            const updatedRowValues = { ...prevEditRowValues };
            delete updatedRowValues[dataItem.id];
            return updatedRowValues;
        });
    };

    const isRowInEditMode = (dataItem) => {
        return dataItem.id in editRowValues;
    };

    const filteredData = completionsData.filter((item) =>
        item.wellName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const calculateGross = (id) => {
        const productionItem = productionData.find((item) => item.wellAPI === id);
        if (productionItem) {
            const oil = parseFloat(productionItem.Qo);
            const water = parseFloat(productionItem.Qw);
            if (!isNaN(oil) && !isNaN(water)) {
                return oil + water;
            }
        }
        return 0;
    };

    return (
        <div>
            <h2>Completions Data</h2>
            <input type="text" placeholder="Search by wellName" onChange={handleSearch} />
            <Grid
                style={{ maxHeight: '400px' }}
                data={filteredData}
                resizable={true}
                scrollable={'scrollable'}
            >
                <GridColumn
                    field="wellName"
                    title="Well Name"
                    cell={(props) => {
                        const { dataItem } = props;
                        const isEditing = isRowInEditMode(dataItem);
                        if (isEditing) {
                            const editedRowValue = editRowValues[dataItem.id] || "";
                            return (
                                <td>
                                    <input
                                        type="text"
                                        value={editedRowValue}
                                        onChange={(event) => {
                                            const updatedRowValues = { ...editRowValues };
                                            updatedRowValues[dataItem.id] = event.target.value;
                                            setEditRowValues(updatedRowValues);
                                        }}
                                    />
                                    <button onClick={() => handleSaveEditRow(dataItem)}>Save</button>
                                    <button onClick={() => handleCancelEditRow(dataItem)}>Cancel</button>
                                </td>
                            );
                        } else {
                            return (
                                <td>
                                    <span onClick={(event) => handleEditRow(event, dataItem)}>{dataItem.wellName}</span>
                                </td>
                            );
                        }
                    }}
                />
                <GridColumn field="wellAPI" title="Well API" />
                <GridColumn field="boreID" title="Bore ID" />
                <GridColumn field="Type" title="Type" />
                <GridColumn field="TD" title="TD" />
                <GridColumn field="compSubId" title="Comp Sub ID" />
                <GridColumn field="reservoir" title="Reservoir" />
                <GridColumn field="lat" title="Lat" />
                <GridColumn field="long" title="Long" />
                <GridColumn field="gross" title="Gross" cell={(props) => {
                    const id = props.dataItem.wellAPI;
                    const gross = calculateGross(id);

                    return <td>{gross}</td>;
                }} />
            </Grid>
        </div>
    );
};

export default CompletionsGrid;
