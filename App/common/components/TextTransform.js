import React from "react";

const styles = () => ({
    root: {
        textTransform: (props) => {
            if (props.capitalize) {
                return "capitalize";
            }
            if (props.lowerCase) {
                return "lowercase";
            }
            if (props.upperCase) {
                return "uppercase";
            }
            return "none";
        }
    }
});

type Props = {
    capitalize: boolean,
    children: React.ReactChildren,
    lowerCase: boolean,
    upperCase: boolean
};

/**
 * Text Transform Component
 * @param {Props} props
 */
function TextTransform({
    capitalize = false,
    children,
    lowerCase = false,
    upperCase = false
}: Props) {
    const classes = styles({ capitalize, lowerCase, upperCase });
    return <span styles={classes.root}>{children}</span>;
}

export default TextTransform;
