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

declare module 'crypto-js/sha256' {
    import { SHA256 } from 'crypto-js';
    export default SHA256;
}

declare module 'crypto-js' {
    export const enc: any;
    export const SHA256: any;
}