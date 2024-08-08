// src/declarations.d.ts
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.mp4' {
    const src: string;
    export default src;
}

declare module '*.mov' {
    const src: string;
    export default src;
}