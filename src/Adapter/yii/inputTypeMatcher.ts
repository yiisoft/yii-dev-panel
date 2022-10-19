import {GiiGeneratorAttributeRule} from "../../Module/Gii/API/Gii";

export function matchInputType(rules: GiiGeneratorAttributeRule[]) {
    let possibleType = 'text';
    for (let rule of rules) {
        if (rule[0] === 'each') {
            possibleType = 'select';
            break;
        }
        if (rule[0] === 'number') {
            possibleType = 'number';
            break;
        }
    }
    return possibleType;
}