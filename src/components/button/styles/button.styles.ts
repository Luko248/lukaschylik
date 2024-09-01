import { create } from '@stylexjs/stylex';
import {gap, color } from "../../../styleX/vars.stylex";

export const STYLE = create({
    default: {
        lineHeight: "1",
        cursor: "pointer",
    }
});

export const SIZES = create({
    sm: {
        paddingInline: gap.space8,
        paddingBlock: gap.space4,
        fontSize: "12px",
    },
    md: {
        paddingInline: gap.space24,
        paddingBlock: gap.space16,
        fontSize: "1rem",
        fontWeight: "bold",
        border: "none",
        textTransform: "uppercase",
    }
});

export const VARIANTS = create({
    primary: {
        color: color.white,
        backgroundColor: {
            default: color.transparent,
            ":hover": color.transparent,
        },
        border: color.white + " solid " + gap.space2,
    },
    secondary: {
        color: color.black,
        backgroundColor: {
            default: "green",
            ":hover": "darkgreen",
        },
    }
});
