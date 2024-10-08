const mongoose = require("mongoose");
const staffModel = mongoose.model("Staff");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function loadRegisterStaffForm(req, res) {
  res.render("registerStaff.ejs", {
    layout: "./layouts/dashboard",
    title: "Add New Staff",
    message: req.flash("message"),
  });
}

async function viewStaff(req, res) {
  const staffCount = await staffModel.countDocuments();
  const allStaff = await staffModel.find();
  if (staffCount === 0) {
    res.redirect("/staff/emptyState");
  } else {
    res.render("staff.ejs", {
      layout: "./layouts/dashboard",
      title: "Staff",
      allStaff,
      message: req.flash("message"),
    });
  }
}

function loadEmptyState(req, res) {
  res.render("emptyState.ejs", {
    layout: "./layouts/dashboard",
    title: "Staff",
    content: "All your added staff will be displayed here.",
    message: req.flash("message"),
  });
}

async function registerStaff(req, res) {
  try {
    const defaultPassword = process.env.DEFAULT_PASSWORD;
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const existingStaff = await staffModel.findOne({
      emailAddress: req.body.email,
    });
    if (existingStaff) {
      req.flash("message", "Email address has been used by another user.");
      return res.redirect("/staff");
    }
    const addStaff = await staffModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      emailAddress: req.body.email,
      department: req.body.department,
      qualification: req.body.qualification,
      password: hashedPassword,
    });
    if (addStaff) {
      return res.redirect("/staff");
    }
  } catch (err) {
    req.flash("message", "An error occured while registering the staff.");
    res.redirect("/staff/add");
  }
}

async function deleteSingleStaff(req, res) {
  try {
    const id = req.params.id;
    await staffModel.deleteOne({ _id: id });
    res.redirect("/staff");
  } catch (err) {
    req.flash("message", "Staff not deleted.");
    res.redirect("/staff");
  }
}

async function loadUpdateStaffForm(req, res) {
  const id = req.params.id;
  const genders = ["Male", "Female", "Non Binary"];
  const departments = [
    "Nursing",
    "Records",
    "Pharmacy",
    "Laboratory",
    "Medicine",
    "Physiotherapy",
  ];
  const singleStaff = await staffModel.findById({ _id: id });
  res.render("updateStaff.ejs", {
    layout: "./layouts/dashboard",
    title: "Staff",
    singleStaff,
    departments,
    genders,
    message: req.flash("message"),
  });
}

async function updateStaff(req, res) {
  const staffRecord = await staffModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        firstName: req.body.firstName ? req.body.firstName.trim() : "",
        lastName: req.body.lastName ? req.body.lastName.trim() : "",
        gender: req.body.gender ? req.body.gender.trim() : "",
        emailAddress: req.body.email ? req.body.email.trim() : "",
        department: req.body.department ? req.body.department.trim() : "",
        qualification: req.body.qualification
          ? req.body.qualification.trim()
          : "",
      },
    }
  );

  if (staffRecord) {
    res.redirect("/staff");
  } else {
    req.flash("message", "Staff not updated at the moment..");
    res.redirect("/staff");
  }
}

function staffLoginForm(req, res) {
  res.render("staffLogin.ejs", {
    layout: "./layouts/page",
    message: req.flash("message"),
  });
}

async function staffLogin(req, res) {
  const existingStaff = await staffModel.findOne({
    emailAddress: req.body.email,
  });

  if (existingStaff) {
    const storedPassword = existingStaff.password;
    const inputPassword = req.body.password;

    const isMatch = await bcrypt.compare(inputPassword, storedPassword);
    if (isMatch) {
      const jwtSecret = process.env.JWT_SECRET;
      const expirationInHours = "1000h";
      const token = jwt.sign(
        {
          email: existingStaff.emailAddress,
        },
        jwtSecret,
        {
          expiresIn: expirationInHours,
        }
      );
      res.cookie("token", token);
      res.redirect("/");
    } else {
      req.flash("message", "Incorrect password!!!");
      res.redirect("/login");
    }
  } else {
    req.flash("message", "Email address does not exist!!!");
    res.redirect("/login");
  }
}

function loadResetPasswordForm(req, res) {
  res.render("resetPassword.ejs", {
    layout: "./layouts/page",
    message: req.flash("message"),
  });
}

async function resetPassword(req, res) {
  try {
    const existingStaff = await staffModel.findOne({
      emailAddress: req.body.email,
    });
    const storedPassword = existingStaff.password;
    const inputPassword = req.body.currentPassword;
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    const isMatch = await bcrypt.compare(inputPassword, storedPassword);
    if (isMatch) {
      await staffModel.findOneAndUpdate(
        {
          emailAddress: req.body.email,
        },
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          gender: req.body.gender,
          emailAddress: req.body.email,
          department: req.body.department,
          qualification: req.body.qualification,
          password: hashedNewPassword,
        }
      );
      req.flash("message", "Password reset successfully");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("message", "Unable to reset password");
    res.redirect("/");
  }
}

module.exports = {
  viewStaff,
  registerStaff,
  loadRegisterStaffForm,
  deleteSingleStaff,
  loadUpdateStaffForm,
  updateStaff,
  loadEmptyState,
  staffLoginForm,
  staffLogin,
  loadResetPasswordForm,
  resetPassword,
};
