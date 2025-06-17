import { variables } from "../../styles";

const { actionBarMinHeight } = variables;

export default (theme) => ({
    appBar: {
        background: theme.palette.primary.lightBackground,
        borderTop: `1px solid ${theme.palette.primary.lightBorder}`,
        minHeight: `${actionBarMinHeight}px`,
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        top: "auto",
        bottom: 0
    }
});
