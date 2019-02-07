const Sales = require("../models/sales");

exports.getAll = async (req, res, next) => {
  sales = new Sales();
  const salesData = await sales.findAll();

  res.status(200).json(salesData);
};

exports.save = async (req, res, next) => {
  sales = new Sales(
    req.body.id,
    req.body.salesDate,
    req.body.customer,
    req.body.item,
    req.body.qty,
    req.body.rate,
    req.body.taxPercent,
    ""
  );

  await sales
    .save()
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Successfully saved."
      });
    })
    .catch(error => {
      logger.error("Save user error", error);
      throw error;
    });
};

exports.delete = async (req, res, next) => {
  sales = new Sales();
  await sales
    .delete(req.params.id)
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Successfully deleted."
      });
    })
    .catch(error => {
      logger.error("Save user error", error);
      throw error;
    });
};
