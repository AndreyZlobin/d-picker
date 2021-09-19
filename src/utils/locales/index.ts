import {RU_LOCALE} from "~/utils/locales/ru";
import {EN_LOCALE} from "~/utils/locales/en";
import {FR_LOCALE} from "~/utils/locales/fr";

export type Locale = 'ru' | 'en' | 'fr';

export interface LocateObj {
    MONTHS: string[]
    SHORT_MONTHS: string[]
    SHORT_WEEK_DAYS: string[]
}

const mapOfLocale = {
    ru: RU_LOCALE,
    en: EN_LOCALE,
    fr: FR_LOCALE,
}
export const getLocale = (locale: Locale): LocateObj => {
    return mapOfLocale[locale]
}
