const db = require("../models/db_connection");

exports.addProduct = (req, res, next) => {
  let agentID = req.body.agentID;
  let productName = req.body.productName;
  let productDetails = req.body.productDetails;
  let productPrice = req.body.productPrice;
  let productStocks = req.body.productStocks;
  let productStatus = req.body.productStatus;

  if (
    agentID == "" ||
    agentID == undefined ||
    productName == "" ||
    productName == undefined
  ) {
    res.status(500).send({
      successful: false,
      message: "Product Name are required",
    });
  } else {
    let insertProductQuery = `INSERT INTO product SET ?`;
    let insertProductData = {
      agentID: agentID,
      productName: productName,
      productDetails: productDetails,
      productPrice: productPrice,
      productStocks: productStocks,
      productStatus: productStatus,
    };

    db.query(insertProductQuery, insertProductData, (err, rows, result) => {
      if (err) {
        res.status(500).send({
          successful: false,
          message: err,
        });
      } else {
        res.status(200).send({
          successful: true,
          message: "New Product Added",
        });
      }
    });
  }
};

exports.getProduct = (req, res, next) => {
  let listProductQuery = `SELECT * FROM product`;
  db.query(listProductQuery, (err, table, result) => {
    if (err) {
      res.status(500).send({
        successful: "Query Error",
        message: err,
      });
    } else {
      res.status(200).send({
        successful: true,
        product_list: table,
      });
    }
  });
};

exports.deleteProduct = (req, res, next) => {
  let productID = req.body.productID;

  if (productID == "" || productID == undefined) {
    res.status(500).send({
      successful: false,
      message: "Product ID is required.",
    });
  } else {
    let deleteQuery = `DELETE FROM product WHERE productID = '${productID}'`;

    db.query(deleteQuery, (err, rows, result) => {
      if (err) {
        res.status(500).send({
          successful: false,
          message: "Error in Query",
        });
      } else if (rows.affectedRows == 0) {
        res.status(404).send({
          successful: true,
          message: "No Product Found",
        });
      } else {
        res.status(200).send({
          successful: true,
          message: "Product Deleted Successfully",
        });
      }
    });
  }
};

exports.updateProduct = (req, res, next) => {
  let productName = req.body.productName;
  let productDetails = req.body.productDetails;
  let productPrice = req.body.productPrice;
  let productStocks = req.body.productStocks;
  let productStatus = req.body.productStatus;
  let productID = req.body.productID;

  if (productID == "" || productID == undefined) {
    res.status(500).send({
      successful: false,
      message: "Product ID is required.",
    });
  } else {
    let updateQuery = `UPDATE product SET productName = '${productName}', productDetails = '${productDetails}', productPrice = '${productPrice}', productStocks = '${productStocks}', productStatus = '${productStatus}' WHERE productID = '${productID}'`;

    db.query(updateQuery, (err, rows, result) => {
      if (err) {
        res.status(500).send({
          successful: false,
          message: err
        });
      } else if (rows.affectedRows == 0) {
        res.status(404).send({
          successful: true,
          message: "No Product Found",
        });
      } else {
        res.status(200).send({
          successful: true,
          message: "Product Updated Successfully",
        });
      }
    });
  }
};

