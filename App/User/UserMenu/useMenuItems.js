import { useMemo } from "react";
import { useParams } from "react-router-dom";
import config from "../../config";
import menuItems from "./menuItems";

const routePrefix = config.paths.auth;

export default (title) => {
    const { auditId } = useParams();
    const paths = {
        audits: `/${routePrefix}/${config.paths.audits}/list`,
        excludeRemaining: `/${routePrefix}/${config.paths.audits}/${auditId}/assets/exclude-remaining`,
        submitAudit: `/${routePrefix}/${config.paths.audits}/${auditId}/submit`,
        settings: `/${routePrefix}/${config.paths.settings}`,
        logout: `/${config.paths.login}`,
    };
    const items = menuItems(paths);

    const useMenuItems = useMemo(() => {
        if (title === "audits/assets/list") {
            return items;
        } else if (title === "audits/details") {
            return items.filter((val) => val.key !== "excludeRemaining");
        } else {
            return items.filter((val) => val.grantedPerms === "all");
        }
    }, [auditId, title]);
    return useMenuItems;
};
