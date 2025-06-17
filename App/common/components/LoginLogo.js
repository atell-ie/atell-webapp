import React from "react";
import images from "../images";

const styles = () => ({
    logo: {
        backgroundImage: `url(${images.logo})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "100%",
        height: ({ height }) => height
    }
});

type Props = {
    height: number,
    light: boolean,
    monochrome: Boolean
};

/**
 * Logo Component
 * @param {Props} props
 */
const Logo = ({ height = 64, light = false, monochrome = false }: Props) => {
    const classes = styles({ height, light, monochrome });
    return <div style={classes.logo} />;
};

export default Logo;
