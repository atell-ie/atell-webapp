import { useSelector } from "react-redux";

/**
 * Get App NetInfo 'isConnected' Status
 */
export default function () {
    const { app } = useSelector((state) => state);
    return app.netConnected;
}
