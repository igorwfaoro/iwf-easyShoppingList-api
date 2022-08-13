import Joi = require("joi");
import { DEFAULT_LANGUAGE, TRANSLATION_LANGUAGES_LIST } from "../../static/translation-languages";

export const langDefaultValidator = {
    lang: Joi.string().valid(...TRANSLATION_LANGUAGES_LIST.map(x => x.key)).default(DEFAULT_LANGUAGE.key)
};