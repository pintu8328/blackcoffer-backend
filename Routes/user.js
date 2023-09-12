const { Router } = require("express");
const UserModel = require("../Models/user");
const dashboardrouter = Router();

dashboardrouter.post("/user/dashboard", async (req, res) => {
  console.log(req.body);
  try {
    const itemsToInsert = req.body;
    if (!Array.isArray(itemsToInsert)) {
      return res
        .status(400)
        .json({
          message: "Invalid request format. Expecting an array of items.",
        });
    }

    const insertedItems = await UserModel.insertMany(itemsToInsert);

    res.status(201).json(insertedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const ITEMS_PER_PAGE = 15;
dashboardrouter.get("/user/dashboard", async (req, res) => {
  try {
    const {
      page,
      intensity,
      country,
      topic,
      sector,
      source,
      region,
      end_year,
      pestle,
    } = req.query;

    const query = {};

    if (intensity) {
      query.intensity = intensity;
    }
    if (topic) {
      query.topic = topic;
    }
    if (sector) {
      query.sector = sector;
    }

    if (country) {
      query.country = country;
    }

    if (source) {
      query.source = source;
    }

    if (region) {
      query.region = region;
    }

    if (end_year) {
      query.end_year = end_year;
    }

    if (pestle) {
      query.pestle = pestle;
    }

    const skip = (page - 1) * ITEMS_PER_PAGE;
    const userdata = await UserModel.find(query)
      .skip(skip)
      .limit(ITEMS_PER_PAGE);
    res.send(userdata);
  } catch (error) {
    console.log(error);
  }
});

dashboardrouter.get("/user/dashboard/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const detailItem = await UserModel.findById(id);

    if (!detailItem) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(detailItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = dashboardrouter;
