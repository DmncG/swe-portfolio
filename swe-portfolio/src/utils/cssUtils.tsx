export const cssClassNames = (prefix) => {
    return (str) => {
        `${prefix}--${str}`;
    }
}

