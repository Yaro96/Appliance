
function validateString(myVar) {
    if (typeof myVar === 'string' || myVar instanceof String)
        return true;
    else
        return false;
}

function validateInt(int){
    if(onlyNumbers(int) && parseInt(int)>=0)
        return true;
    else
        return false;
}

function onlyNumbers(check){
    if(/^\d+$/.test(check))
        return true;
    else
        return false;
}

module.exports = {
    validateString,
    validateInt
};