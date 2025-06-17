export default {
    containsNumbers: (pathname) => {
        var regexp = /\d/g;
        return regexp.test(pathname);
    },
    screenTitle: (pathname) => {
        if (pathname) {
            const path = pathname
                .replace(/[0-9]/g, "")
                .split("/")
                .filter((item) => item);
            const title = path.splice(1, path.length).join("/");
            return title;
        }
    }
};
