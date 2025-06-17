import { makeStyles } from "@mui/styles";

export default makeStyles(({ palette }) => ({
    // default variant
    contentRoot: {
        backgroundColor: "aqua !important"
    },
    variantSuccess: {
        backgroundColor: "rgb(237, 247, 237) !important",
        color: "rgb(30, 70, 32) !important",
        width: "25vw !important"
    },
    variantError: {
        backgroundColor: "rgb(253, 237, 237) !important",
        color: "rgb(95, 33, 32) !important",
        width: "25vw !important"
    },
    variantInfo: {
        backgroundColor: "rgb(229, 246, 253) !important",
        color: "rgb(1, 67, 97) !important",
        width: "25vw !important"
    },
    variantWarning: {
        backgroundColor: "rgb(255, 244, 229) !important",
        color: "rgb(102, 60, 0) !important",
        width: "25vw !important"
    }
}));
