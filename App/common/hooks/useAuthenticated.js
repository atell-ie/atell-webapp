import { useSelector } from "react-redux";
import moment from "moment";
import useLocalStorage from "./useLocalStorage";

/**
 * Use Authenticated Hook
 */
export default function () {
    const { auth } = useSelector((state) => state);

    // setItem part in auth/saga

    const [authData] = useLocalStorage("persist:root", "");

    let user = {};
    if (authData.accessToken) user = authData;
    else user = auth;

    const next = {
        hasAccessToken: Boolean(user.accessToken),
        hasAccountId: Boolean(user.account && user.account.id),
        isExpired:
            Boolean(user.expiryDate) &&
            moment().isAfter(moment(user.expiryDate)),
        user,
    };

    return next;
}
