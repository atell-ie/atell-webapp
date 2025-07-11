import { variables } from "../../styles";

const { appToolbarMinHeight, drawerWidthClosed, drawerWidthOpen } = variables;

export default (theme) => ({
    activeItem: {
        "& div ": {
            color: `${theme.palette.primary.main} !important`,
            "& span ": {
                color: `${theme.palette.primary.main} !important`
            }
        }
    },
    appBarToolbarSpacer: {
        minHeight: parseInt(appToolbarMinHeight + 1)
    },
    drawer: {
        flexShrink: 0,
        width: drawerWidthOpen,
        transition: theme.transitions.create(["width"])
    },
    drawerClosed: {
        width: `${drawerWidthClosed}px !important`
    },
    drawerPaper: {
        width: drawerWidthOpen,
        overflowX: "hidden",
        overflowY: "auto",
        transition: theme.transitions.create(["width"])
    },
    listItem: {
        ...theme.mixins.toolbar,
        maxHeight: 64,
        margin: theme.spacing(1)
    },
    menuItemIcon: {
        minWidth: "35px"
    },
    menuItemText: {
        fontSize: "1rem"
    }
});
