export function formatNum(number, decimal = true) {
    const parts = Number(number).toFixed(2).toString().split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return integerPart + "." + parts[1];
    return decimal ? integerPart + "." + parts[1] : integerPart;
}