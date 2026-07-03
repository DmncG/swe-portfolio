export const cssClassNames = (prefix: string) => {
    return (str: string) => {
        return `${prefix}--${str}`;
    }
}

