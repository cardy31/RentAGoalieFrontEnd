export function isEmpty(myObject) {
    for(let key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}
