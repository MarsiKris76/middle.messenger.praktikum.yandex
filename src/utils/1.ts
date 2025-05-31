// function trim(str: string, rule?: string): string {
//     str = str.trim();
//     if (rule) {
//         for (const char of rule) {
//             str = str.split(char).join('');
//         }
//     }
//     return str;
// }
//
// type Indexed<T = any> = {
//     [key in string]: T;
// };
//
// function merge(lhs: Indexed, rhs: Indexed): Indexed {
//     for (let p in rhs) {
//         if (!rhs.hasOwnProperty(p)) {
//             continue;
//         }
//
//         try {
//             if (rhs[p].constructor === Object) {
//                 rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
//             } else {
//                 lhs[p] = rhs[p];
//             }
//         } catch(e) {
//             lhs[p] = rhs[p];
//         }
//     }
//
//     return lhs;
// }
//
// function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
//     if (typeof object !== 'object' || object === null) {
//         return object;
//     }
//
//     if (typeof path !== 'string') {
//         throw new Error('path must be string');
//     }
//
//     const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
//         [key]: acc,
//     }), value as any);
//     return merge(object as Indexed, result);
// }
//
// function isObject(value: unknown): value is object {
//     return value !== null && typeof value === 'object';
// }
//
// function isEqual(a: object, b: object): boolean {
//     if (a.constructor !== b.constructor) {
//         return false;
//     }
//     if (isObject(a) && isObject(b)) {
//         const aKeys = Object.keys(a);
//         const bKeys = Object.keys(b);
//         if (aKeys.length !== bKeys.length) {
//             return false;
//         }
//         for (const key of aKeys) {
//             if (!(key in b)) {
//                 return false;
//             }
//             const aVal = a[key as keyof object];
//             const bVal = b[key as keyof object];
//             if (isObject(aVal) || isArray(aVal)) {
//                 if (!isEqual(aVal, bVal)) {
//                     return false;
//                 }
//             } else if (aVal !== bVal) {
//                 return false;
//             }
//         }
//         return true;
//     }
//     return a === b;
// }
//
// function cloneDeep<T extends object = object>(obj: T) {
//     return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
//         // Handle:
//         // * null
//         // * undefined
//         // * boolean
//         // * number
//         // * string
//         // * symbol
//         // * function
//         if (item === null || typeof item !== "object") {
//             return item;
//         }
//
//         // Handle:
//         // * Date
//         if (item instanceof Date) {
//             return new Date(item.valueOf());
//         }
//
//         // Handle:
//         // * Array
//         if (item instanceof Array) {
//             let copy = [];
//
//             item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));
//
//             return copy;
//         }
//
//         // Handle:
//         // * Set
//         if (item instanceof Set) {
//             let copy = new Set();
//
//             item.forEach(v => copy.add(_cloneDeep(v)));
//
//             return copy;
//         }
//
//         // Handle:
//         // * Map
//         if (item instanceof Map) {
//             let copy = new Map();
//
//             item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
//
//             return copy;
//         }
//
//         // Handle:
//         // * Object
//         if (item instanceof Object) {
//             let copy: object = {};
//
//             // Handle:
//             // * Object.symbol
//             Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep(item[s])));
//
//             // Handle:
//             // * Object.name (other)
//             Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));
//
//             return copy;
//         }
//
//         throw new Error(`Unable to copy object: ${item}`);
//     })(obj);
// }
//
// type StringIndexed = Record<string, any>;
//
// const obj: StringIndexed = {
//     key: 1,
//     key2: "test",
//     key3: false,
//     key4: true,
//     key5: [1, 2, 3],
//     key6: { a: 1 },
//     key7: { b: { d: 2 } }
// };
//
// function queryStringify(data: StringIndexed): string | never {
//     if (typeof data !== "object") {
//         throw new Error("Data must be object");
//     }
//
//     const keys = Object.keys(data);
//     return keys.reduce((result, key, index) => {
//         const value = data[key];
//         const endLine = index < keys.length - 1 ? "&" : "";
//
//         if (Array.isArray(value)) {
//             const arrayValue = value.reduce<StringIndexed>(
//                 (result, arrData, index) => ({
//                     ...result,
//                     [`${key}[${index}]`]: arrData
//                 }),
//                 {}
//             );
//
//             return `${result}${queryStringify(arrayValue)}${endLine}`;
//         }
//
//         if (typeof value === "object") {
//             const objValue = Object.keys(value || {}).reduce<StringIndexed>(
//                 (result, objKey) => ({
//                     ...result,
//                     [`${key}[${objKey}]`]: value[objKey]
//                 }),
//                 {}
//             );
//
//             return `${result}${queryStringify(objValue)}${endLine}`;
//         }
//
//         return `${result}${key}=${value}${endLine}`;
//     }, "");
// }
//
// export default queryStringify
//
// type PlainObject<T = unknown> = {
//     [k in string]: T;
// };
//
// function isPlainObject(value: unknown): value is PlainObject {
//     return typeof value === 'object'
//         && value !== null
//         && value.constructor === Object
//         && Object.prototype.toString.call(value) === '[object Object]';
// }
//
// function isArray(value: unknown): value is [] {
//     return Array.isArray(value);
// }
//
// function isArrayOrObject(value: unknown): value is [] | PlainObject {
//     return isPlainObject(value) || isArray(value);
// }
//
// function getKey(key: string, parentKey?: string) {
//     return parentKey ? `${parentKey}[${key}]` : key;
// }
//
// function getParams(data: PlainObject | [], parentKey?: string) {
//     const result: [string, string][] = [];
//
//     for(const [key, value] of Object.entries(data)) {
//         if (isArrayOrObject(value)) {
//             result.push(...getParams(value, getKey(key, parentKey)));
//         } else {
//             result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
//         }
//     }
//
//     return result;
// }
//
// function queryString(data: PlainObject) {
//     if (!isPlainObject(data)) {
//         throw new Error('input must be an object');
//     }
//
//     return getParams(data).map(arr => arr.join('=')).join('&');
// }
