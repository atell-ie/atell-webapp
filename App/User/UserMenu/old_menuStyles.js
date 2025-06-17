import { variables } from "../../common/styles";
const { appToolbarMinHeight } = variables;

export default (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        height: "100%",
    },
    iconButton: {
        color: theme.palette.text.contrastText,
        float: "right",
    },
    logoContent: {
        width: "10rem",
        display: "flex",
    },
    main: {
        flexGrow: 1,
        overflow: "auto",
    },
    root: {
        display: "flex",
        height: `calc(100% - ${appToolbarMinHeight + theme.spacing(2)}px)`,
    },
    toolbar: {
        color: theme.palette.text.contrastText,
        minHeight: appToolbarMinHeight,
    },
    titleText: {
        "& h5": {
            color: theme.palette.text.contrastText,
            fontWeight: "500",
        },
        alignSelf: "center",
        textAlign: "center",
    },
    menuLeftContainer: {
        "& > button": {
            color: theme.palette.text.contrastText,
            paddingLeft: 0,
            textAlign: "left",
        },
        "& > button > svg": {
            verticalAlign: "middle",
        },
        alignSelf: "center",
    },
});
