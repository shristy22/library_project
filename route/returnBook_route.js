const router = require("express").Router();
const book_rent_model = require("../models/book_rent_schema");
const customer_model = require("../models/customer_schema");
const book_model = require("../models/books_schema");
const util = require("../helper/utils");

router.post("/returnBook", async (req, res) => {
    const { customerID, isbn, libBookID } = req.body;
    const exist_book = await book_model.findOne({ isbn: isbn });
    if (exist_book) {
        const rented_arr = exist_book.libBookIds.Rented;
        const found = rented_arr.find((element) => element == libBookID);
        if (found) {
            const bill = await book_rent_model.findOne({
                customerId: customerID,
                libBookIds: libBookID,
                status: "1",
            });

            if (bill) {
                console.log("yuvuyvyu");

                const date = {
                    rentedDate: bill.date.rentedDate,
                    returnDate: bill.date.returnDate,
                    actualReturnDate: util.getactualReturnDate(),
                };
                const prev_avail_id = exist_book.libBookIds.Available;
                const prev_rented_id = exist_book.libBookIds.Rented;

                const index_rent = prev_rented_id.indexOf(libBookID);
                if (index_rent > -1) {
                    prev_rented_id.splice(index_rent, 1);
                }
                prev_avail_id.push(libBookID);
                const lib_id_obj = {
                    Available: prev_avail_id,
                    Rented: prev_rented_id,
                    All: exist_book.libBookIds.All,
                };
                const qty_obj = {
                    Available: parseInt(exist_book.quantity.Available) + 1,
                    Rented: parseInt(exist_book.quantity.Rented) - 1,
                    Total: exist_book.quantity.Total,
                };
                const obj = [];
                book_rent_model
                    .findOneAndUpdate(
                        { customerId: customerID, libBookIds: libBookID, status: "1" },
                        { status: "0", date: date },
                        { new: true }
                    )
                    .then((result) => {
                        obj.push(result);
                    });

                book_model
                    .findOneAndUpdate(
                        { isbn: req.body.isbn },
                        { quantity: qty_obj, libBookIds: lib_id_obj }
                    )
                    .then((response2) => {
                        obj.push(response2);
                        res.json(obj);
                    })
                    .catch((err) => res.json(err));
            } 
            else res.json("this book is not rented by this customer id");
        } 
        else res.json("This book is already returned or not yet rented");
    } 
    else res.json("bok does not exist");
});

module.exports = router;
