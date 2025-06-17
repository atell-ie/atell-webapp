import React from "react";
import bgrImage from "./Blank_vowel_trapezoid.png";
import styles from "./styles.js";

export default ({ hdlSymbolClick }) => {
    return (
        <div
            style={{
                position: "relative",
                maxWidth: "100%",
                margin: "1.5em auto 0.1em auto",
                background: "#fff",
                margin: "0 5rem",
                padding: "2rem",
                display: "flex",
                justifyContent: "center"
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "35em",
                    margin: "0 0 0 1.5em"
                }}
            >
                <img
                    src={bgrImage}
                    style={{
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0.2
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        fontSize: "90%",
                        top: "-1.5em",
                        left: "7%"
                    }}
                >
                    Front
                </div>
                <div
                    style={{
                        position: "absolute",
                        fontSize: "90%",
                        top: "-1.5em",
                        left: "45%"
                    }}
                >
                    Central
                </div>
                <div
                    style={{
                        position: "absolute",
                        fontSize: "90%",
                        top: "-1.5em",
                        left: "87%"
                    }}
                >
                    Back
                </div>
                <div
                    style={{
                        position: "absolute",
                        fontSize: "90%",
                        top: "5%",
                        left: "-1.5em"
                    }}
                >
                    Close
                </div>
                <div
                    style={{
                        position: "absolute",
                        fontSize: "90%",
                        top: "34%",
                        left: "-1.5em"
                    }}
                >
                    Close-mid
                </div>
                <div
                    style={{
                        position: "absolute",
                        fontSize: "90%",
                        top: "62%",
                        left: "-1.5em"
                    }}
                >
                    Open-mid
                </div>
                <div
                    style={{
                        position: "absolute",
                        fontSize: "90%",
                        top: "90%",
                        left: "-1.5em"
                    }}
                >
                    Open
                </div>
                <div
                    style={{
                        top: "4%",
                        left: "4%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("i")}
                        // onclick="ipa('Close_front_unrounded_vowel');"
                    >
                        i
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("y")}
                        // onclick="ipa('Close_front_rounded_vowel');"
                    >
                        y
                    </span>
                </div>
                <div
                    style={{
                        top: "4%",
                        left: "44%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɨ")}
                        // onclick="ipa('Close_central_unrounded_vowel');"
                    >
                        ɨ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ʉ")}
                        // onclick="ipa('Close_central_rounded_vowel');"
                    >
                        ʉ
                    </span>
                </div>
                <div
                    style={{
                        top: "4%",
                        left: "84%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɯ")}
                        // onclick="ipa('Close_back_unrounded_vowel');"
                    >
                        ɯ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("u")}
                        // onclick="ipa('Close_back_rounded_vowel');"
                    >
                        u
                    </span>
                </div>
                <div
                    style={{
                        top: "18%",
                        left: "23%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɪ")}
                        // onclick="ipa('Near-close_near-front_unrounded_vowel');"
                    >
                        ɪ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ʏ")}
                        // onclick="ipa('Near-close_near-front_rounded_vowel');"
                    >
                        ʏ
                    </span>
                </div>
                <div
                    style={{
                        top: "18%",
                        left: "71%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ʊ")}
                        // onclick="ipa('Near-close_near-back_rounded_vowel');"
                    >
                        ʊ
                    </span>
                </div>
                <div
                    style={{
                        top: "33%",
                        left: "18%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("e")}
                        // onclick="ipa('Close-mid_front_unrounded_vowel');"
                    >
                        e
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ø")}
                        // onclick="ipa('Close-mid_front_rounded_vowel');"
                    >
                        ø
                    </span>
                </div>
                <div
                    style={{
                        top: "33%",
                        left: "51%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɘ")}
                        // onclick="ipa('Close-mid_central_unrounded_vowel');"
                    >
                        ɘ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɵ")}
                        // onclick="ipa('Close-mid_central_rounded_vowel');"
                    >
                        ɵ
                    </span>
                </div>
                <div
                    style={{
                        top: "33%",
                        left: "84%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɤ")}
                        // onclick="ipa('Close-mid_back_unrounded_vowel');"
                    >
                        ɤ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("o")}
                        // onclick="ipa('Close-mid_back_rounded_vowel');"
                    >
                        o
                    </span>
                </div>
                <div
                    style={{
                        top: "47%",
                        left: "54%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ə")}
                        // onclick="ipa('Mid-central_vowel');"
                    >
                        ə
                    </span>
                </div>
                <div
                    style={{
                        top: "61%",
                        left: "31%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɛ")}
                        // onclick="ipa('Open-mid_front_unrounded_vowel');"
                    >
                        ɛ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("œ")}
                        // onclick="ipa('Open-mid_front_rounded_vowel');"
                    >
                        œ
                    </span>
                </div>
                <div
                    style={{
                        top: "61%",
                        left: "58%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɜ")}
                        // onclick="ipa('Open-mid_central_unrounded_vowel');"
                    >
                        ɜ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɞ")}
                        // onclick="ipa('Open-mid_central_rounded_vowel');"
                    >
                        ɞ
                    </span>
                </div>
                <div
                    style={{
                        top: "61%",
                        left: "84%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ʌ")}
                        // onclick="ipa('Open-mid_back_unrounded_vowel');"
                    >
                        ʌ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɔ")}
                        // onclick="ipa('Open-mid_back_rounded_vowel');"
                    >
                        ɔ
                    </span>
                </div>
                <div
                    style={{
                        top: "79%",
                        left: "34%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("æ")}
                        // onclick="ipa('Near-open_front_unrounded_vowel');"
                    >
                        æ
                    </span>
                </div>
                <div
                    style={{
                        top: "73%",
                        left: "60%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɐ")}
                        // onclick="ipa('Near-open_central_unrounded_vowel');"
                    >
                        ɐ
                    </span>
                </div>
                <div
                    style={{
                        top: "90%",
                        left: "44%",
                        width: "14%",
                        textAlign: "center",
                        position: "absolute"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("a")}
                        // onclick="ipa('Open_front_unrounded_vowel');"
                    >
                        a
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɶ")}
                        // onclick="ipa('Open_front_rounded_vowel');"
                    >
                        ɶ
                    </span>
                </div>
                <div
                    style={{
                        width: "14%",
                        textAlign: "center",
                        position: "absolute",
                        top: "90%",
                        left: "84%"
                    }}
                >
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɑ")}
                        // onclick="ipa('Open_back_unrounded_vowel');"
                    >
                        ɑ
                    </span>{" "}
                    <span
                        sx={styles.vowel}
                        onClick={hdlSymbolClick("ɒ")}
                        // onclick="ipa('Open_back_rounded_vowel');"
                    >
                        ɒ
                    </span>
                </div>
            </div>
        </div>
    );
};
