const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const PatientModel = mongoose.model("Patient");
const AppointmentModel = mongoose.model("Appointment");

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

async function viewPatients(req, res) {
  const registeredPatients = await PatientModel.find().sort({ createdAt: -1 });

  res.render("patients.ejs", {
    layout: "./layouts/dashboard",
    title: "Patients",
    registeredPatients: registeredPatients || [],
    formatDate,
    message: req.flash("message"),
  });
}

async function loadRegisterPatient(req, res) {
  res.render("registerPatient.ejs", {
    layout: "./layouts/dashboard",
    title: "Register Patient",
    message: req.flash("message"),
  });
}

async function registerNewPatient(req, res) {
  try {
    const existingUser = await PatientModel.findOne({
      emailAddress: req.body.email,
    });
    if (existingUser) {
      req.flash(
        "message",
        "The email address has been used. Use another email address."
      );
      return res.redirect("/patients");
    }
    let newPatient = await PatientModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: new Date(req.body.dob),
      gender: req.body.gender,
      emailAddress: req.body.email,
      address: req.body.address,
      occupation: req.body.occupation,
      nextOfKin: req.body.nextOfKin,
      allergies: req.body.allergies || [],
    });

    if (newPatient) {
      res.redirect("/patients");
    }
  } catch (err) {
    req.flash("message", "Patient not registered.");
    res.redirect("/patients/add");
  }
}

async function viewOnePatient(req, res) {
  const id = req.params.id;
  const registeredPatient = await PatientModel.findById({ _id: id });
  const patientAppointments = await AppointmentModel.find({
    patientId: new ObjectId(req.params.id),
  });

  res.render("patientDetail.ejs", {
    layout: "./layouts/dashboard",
    title: "Patients",
    registeredPatient,
    patientAppointments,
    formatDate,
    message: req.flash("message"),
  });
}

module.exports = {
  viewPatients,
  loadRegisterPatient,
  registerNewPatient,
  viewOnePatient,
};
