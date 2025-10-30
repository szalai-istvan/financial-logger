import fs from "fs";

const TEMPLATE_CACHE: {[key: string]: string} = {};

export function getTemplate(path: string): string {
    if (TEMPLATE_CACHE[path]) {
        return TEMPLATE_CACHE[path];
    }

    const template = fs.readFileSync(path).toString();
    TEMPLATE_CACHE[path] = template;
    return template;    
}