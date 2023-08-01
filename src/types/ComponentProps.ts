import {TFunction} from "i18next";

export interface ComponentProps {
    theme: "light" | "dark";
    t: TFunction<"translation">;
}