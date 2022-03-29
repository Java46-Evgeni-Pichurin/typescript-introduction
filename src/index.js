/*****************************************HW #32**********************************************/
/*****************************************Task_1**********************************************/
function intersection(set1, set2) {
    const ar = [];
    set1.forEach(e => set2.has(e) ? ar.push(e) : e);
    return ar;
}
/*****************************************Task_2**********************************************/
function sbtract(set1, set2) {
    const ar = [];
    set1.forEach(e => set2.has(e) ? e : ar.push(e));
    return ar;
}
function getSortedOccurrences(array) {
    const buildArray = Object.entries(array.reduce((res, cur) => {
        res[cur] = res[cur] === undefined ? 1 : res[cur] + 1;
        return res;
    }, {}));
    const sortedArray = buildArray.sort((e1, e2) => {
        const res = e2[1] - e1[1];
        return res === 0 ? e1[0].localeCompare(e2[0]) : res;
    });
    const mapAr = new Map(sortedArray);
    const result = [];
    for (let entry of mapAr.entries()) {
        let el = { str: entry[0], count: entry[1] };
        result.push(el);
    }
    return result;
}
/*********************************************************************************************/
const set = new Set([1, 1, 23, 55, 70]);
const set1 = new Set([2, 23, 70, 70, 48]);
const ar = ['lmn', 'ab', 'a', 'cd', 'lmn', 'cd', 'lmn'];
console.log(`\nTask_1:\nCommon numbers between two sets:\n[${Array.from(set)}]\n[${Array.from(set1)}]\n=> ` + intersection(set, set1));
console.log(`\nTask_2:\nNumbers from set1 that don't exist in the set2:\n[${Array.from(set)}]\n[${Array.from(set1)}]\n=> ` + sbtract(set, set1));
console.log(`\nTask_3:\nSoreted array of occurrences:`);
console.log(getSortedOccurrences(ar));
