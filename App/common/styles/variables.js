//import { isTablet } from "react-native-device-info";

const scale = 1; // isTablet() ? 1.5 : 1;

export default {
    avatarSizeLarge: 128 * scale,
    avatarSizeMedium: 72 * scale,
    avatarSizeSmall: 48 * scale,

    borderRadius: 4 * scale,

    borderWidthThin: 1 * scale,
    borderWidthMedium: 2 * scale,
    borderWidthThick: 8 * scale,

    fontSizeExtraLarge: 24 * scale,
    fontSizeExtraExtraLarge: 36 * scale,
    fontSizeLarge: 18 * scale,
    fontSizeMedium: 16 * scale,
    fontSizeNormal: 14 * scale,
    fontSizeSmall: 12 * scale,
    fontSizeTiny: 10 * scale,

    fontWeightBold: "500",
    fontWeightBolder: "700",
    fontWeightLight: "300",
    fontWeightNormal: "400",

    imageThumbSize: 72 * scale,

    inputHeight: 52 * scale,

    listItemHeight: 84 * scale,

    marginHorizontal: 18 * scale,
    marginVertical: 18 * scale,

    navBarHeight: 56 * scale,

    paddingHorizontal: 18 * scale,
    paddingVertical: 18 * scale,
    // borowed from PreCheck, delete this comment after dev finished
    appToolbarMinHeight: 64,
    actionBarMinHeight: 64,
    drawerWidthClosed: 56,
    drawerWidthOpen: 212,
    bottomContainerHeight: 72,
    sideBarWidth: 280,
};
