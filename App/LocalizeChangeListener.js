import React from "react";
import * as RNLocalize from "react-native-localize";
import { configure as configureI18n } from "./common/i18n/old_index";

/**
 * Localize Change Listener Component
 */
export default () => {
    const [, forceUpdate] = React.useState();

    React.useEffect(() => {
        const onChange = () => {
            configureI18n();
            forceUpdate({});
        };
        RNLocalize.addEventListener("change", onChange);
        return () => {
            RNLocalize.removeEventListener("change", onChange);
        };
    }, []);

    return null;
};
