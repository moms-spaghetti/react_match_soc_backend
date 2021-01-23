const express = require("express");
const router = express.Router();

const {
  getAllUserData,
  getSpecificUser,
  postNewUser,
  getBootcampers,
  getMentors,
  deleteUser,
  patchNewMatch,
} = require("../model/index");

router.get("/", async function (req, res, next) {
  const allUsers = await getAllUserData();
  res.json(allUsers);
});

router.get("/search", async function (req, res, next) {
  const specificUser = await getSpecificUser(req.query);
  res.json({ payload: specificUser });
});

router.post("/", async function (req, res) {
  const newUser = await postNewUser(req.body);
  res.json(newUser);
});

router.get("/bootcampers", async function (req, res) {
  const bootcampers = await getBootcampers();
  res.json({ payload: bootcampers });
  return;
});

router.get("/mentors", async function (req, res) {
  const mentors = await getMentors();
  res.json({ payload: mentors });
  return;
});

router.delete("/:id", async (req, res) => {
  const deleteRes = await deleteUser(req.params.id);
  res.json(deleteRes);
});

router.patch("/match", async function (req, res) {
  const match = await patchNewMatch(req.body);
  res.json({ payload: match });
});

module.exports = router;
