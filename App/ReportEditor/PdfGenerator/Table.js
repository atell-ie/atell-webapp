import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: {
        padding: 10
    },
    row: {
        flexDirection: "row",
        width: "100%"
    },
    col: {
        fontSize: 12,
        border: "1px solid #999",
        padding: 10
    },
    itemContent: {
        flex: 1,
        fontSize: 12,
        fontFamily: "Lato"
    }
});

const Table = ({ data }) => {
    const noOfColumns = data[0] ? data[0].length : 0;

    return (
        <View style={styles.table}>
            {data.map((row, rowId) => {
                return (
                    <View style={styles.row} key={rowId}>
                        {row.map((col, colId) => {
                            return (
                                <Text
                                    key={colId}
                                    style={{
                                        ...styles.col,
                                        width: `${100 / noOfColumns}%`
                                    }}
                                >
                                    {data[rowId][colId]}
                                </Text>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
};

export default Table;
