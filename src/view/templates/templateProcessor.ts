import type { TemplateParameters } from "../../types/template.js";
import { getTemplate } from "./templateCache.js";

const CONSTANTS_TEMPLATE_KEY = '${templateConstants}';
const CONSTANTS_TEMPLATE_TAG = '<script>\n${templateConstants}\n</script>';

export function processTemplate(path: string, parameters: TemplateParameters): string {
    let template = getTemplate(path);

    const params = parameters.parameters;
    for (let key in params) {
        const templateKey = '${' + key + '}';
        const value = (params[key] || '').toString();
        template = template.replaceAll(templateKey, value);
    }
    
    const templateConstants = parameters.templateConstants;
    let constantsString = '';
    for (let key in templateConstants) {
        const value = templateConstants[key];
        constantsString += toConstantVariable(key, value);
    }
    const constants = CONSTANTS_TEMPLATE_TAG.replace(CONSTANTS_TEMPLATE_KEY, constantsString);
    template = template.replaceAll(CONSTANTS_TEMPLATE_KEY, constants);

    return template;
}

function toConstantVariable(variableName: string, variableValue: string | number | boolean | undefined): string {
    return `const ${variableName} = ${variableValue};\n`;
}