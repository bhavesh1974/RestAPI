const Customer = require("../models/customers");

exports.getAll = async (req, res, next) => {
  customer = new Customer();
  const customerData = await customer.findAll();
  res.status(200).json(customerData);
};

exports.save = async (req, res, next) => {
  customer = new Customer(
    req.body.id,
    req.body.customerCode,
    req.body.customerName,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.phone
  );

  await customer
    .save()
    .then(() => {
      res.status(200).json({ code: "200", message: "Successfully saved." });
    })
    .catch(error => {
      logger.error("Error occurred while saving", error);
      throw error;
    });
};

exports.delete = async (req, res, next) => {
  console.log("deleting");
  console.log(req.params.id);
  customer = new Customer();
  await customer
    .delete(req.params.id)
    .then(() => {
      res.status(200).json({ code: "200", message: "Successfully Deleted." });
    })
    .catch(error => {
      logger.error("Error occurred to delete record", error);
      throw error;
    });
};
