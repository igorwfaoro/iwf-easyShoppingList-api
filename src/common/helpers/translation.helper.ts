import { DEFAULT_LANGUAGE, TRANSLATION_LANGUAGES_LIST } from "../../static/translation-languages";

export abstract class TranslationHelper {

    public static normalize(lang: string): string {
        return TRANSLATION_LANGUAGES_LIST.map(x => x.key).includes(lang) ? lang : DEFAULT_LANGUAGE.key;
    }
}