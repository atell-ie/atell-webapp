export default (theme) => ({
    modal: {
        elevation: 5,
        margin: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    modalContent: {
        flex: 1,
        backgroundColor: theme.palette.primary.lightBackground,
    },
});
