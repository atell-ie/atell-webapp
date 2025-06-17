import React from "react";
import images from "../images";

const styles = () => ({
    logo: {
        backgroundImage: `url(${images.preCheckLogo})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "100%",
        height: ({ height }) => height
    }
});

type Props = {
    height: number,
    light: boolean
};

/**
 * Logo Component
 * @param {Props} props
 */
const Logo = ({ height = 64, light = false }: Props) => {
    const classes = styles({ height, light });
    return <div styles={classes.logo} />;
};

export default Logo;
