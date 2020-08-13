const getactualReturnDate = () => {
    const dt = new Date();
    var rent_date = dt.getDate().toString().padStart(2, '0') + '-' + dt.getMonth().toString().padStart(2, '0') + '-' + dt.getFullYear().toString();
    return rent_date;
}
module.exports = {
    getactualReturnDate
}