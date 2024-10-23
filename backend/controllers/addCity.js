const cityModel = require("../models/cityModel");
const cities = ["delhi","mumbai","bangalore","kolkata","chennai","hyderabad"];
const addCity = async (req, res) => {
  const name  = (req.body.name).toLowerCase();
  const userId = req.body.userId;
  if(!city.includes(name)) return res.status()
  try {
    // console.log("step1")
    const cityExists = await cityModel.findOne({name : name});
    if(!cityExists){
      await cityModel.create({ name, userIds: [userId] });
      return res.status(201).json({ message: "City added successfully!"});
    }else{
      console.log("step2")
      const userExistsInCity = await cityModel.findOne({ name, userIds: userId });
      if(!userExistsInCity){
        console.log("step3")
        await cityModel.updateOne({ name }, { $addToSet: { userIds: userId } });
        return res.status(201).json({ message: "City added successfully!"});
      }
      return res.status(400).json({ message: "City already exists!" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding city", error: error.message });
  }
};

const deleteCity = async (req, res) => {
  const name = req.params.name;
  const userId = req.body.userId;
  console.log(name + " " + userId);
  
  try {
    const city = await cityModel.findOne({ name: name });
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    if (!city.userIds.includes(userId)) {
      return res.status(404).json({ message: "User not associated with the city" });
    }

    const result = await cityModel.updateOne(
      { name: name },
      { $pull: { userIds: userId } }
    );
    console.log(result);

    if (result.modifiedCount > 0) {
      const updatedCity = await cityModel.findOne({ name: name });
      if (updatedCity.userIds.length === 0) {
        await cityModel.deleteOne({ name: name });
        return res.status(200).json({ message: "City deleted as no more users are associated with it!" });
      }
      return res.status(200).json({ message: "User removed from city successfully!" });
    } else {
      return res.status(404).json({ message: "User not associated with the city" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating city", error: error.message });
  }
};


const getCities = async (req, res) => {
  try {
    const userId = req.params.id;
    const cities = await cityModel.find({ userIds: userId });
    console.log(cities);
    res.status(200).json(cities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cities", error: error.message });
  }
};
module.exports = { addCity, deleteCity, getCities };
