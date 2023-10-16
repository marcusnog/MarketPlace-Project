import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secundary: string;
            background: string;
            text: string;
            link: string;
            hover: string;
            input: string;
            paragrafo: string;
        }
    }
}