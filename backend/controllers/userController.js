const connection = require("../config/database");

exports.loginUser = (req, res, next) => {
  const UserID = req.body.user;
  const sql = `SELECT UserID from User WHERE UserID= ?`;
  const data = [UserID];
  connection.query(sql, data, (err, rows) => {
    if (rows && rows.length == 1) {
      res.status(200).json({
        success: true,
        userId: rows[0].UserID,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "User Does Not Exist",
      });
    }
  });
};

exports.postUserDetails = (req, res, next) => {
  const UserID = req.body.user;
  const currentDate = new Date().toISOString().slice(0, 10);
  var sql = `Update User Set currentDate = ?  Where UserID = ?`;
  let data = [currentDate, UserID];
  connection.query(sql, data, (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({
      success: true,
    });
  });
};

exports.getJobDetails = (req, res, next) => {
  connection.query("select * from job_interview_assignment", (err, rows) => {
    if (err) {
      console.log(err);
    }
    if (rows.length) {
      res.status(200).json({
        success: true,
        details: rows,
      });
    }
  });
};

exports.userRegister = (req, res, next) => {
  const UserID = req.body.UserID;

  var sql = `INSERT INTO User
	           (
							UserID,currentDate
	           )
	           VALUES
	           (
	               ?,?
	           ); `;

  connection.query(sql, [UserID, null], (err, rows) => {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: "error",
        message: "User Already Exist",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Registration Succesful",
      });
    }
  });
};
