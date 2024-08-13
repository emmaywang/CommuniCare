import express, { Express } from "express";

import cors from "cors";

import {getClinic, getClinicsRadius3, getLanguages, getInsurance, getWebsite, getServices, getLocation} from "./clinics.controller";
import { Clinics, Users } from "../common/types";
import {addUser, getUsers, getUser, getUserInsurance, updateInsurance, updateName, updateSex,
         updatePolicyName,  deleteUser, getUserServices} from "./user.controller";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());



//----------------------------------------------
//clinic ROUTES


//get clinic by name
app.get("/api/clinics", async (req, res) => {
  console.log("[GET] entering 'clinics/:id' endpoint");
  const id: string = String(req.query.id);
  try {
    const clinic = await getClinic(id); 
    if (clinic === null) {
      res
        .status(404)
        .send({
          error: `ERROR: clinic with id: ${id} not found in Firestore`,
        });
    } else {
      res.status(200).send(clinic);
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/clinics/:id endpoint: ${err}`,
    });
  }
});


//*****CHANGED */*********** */
//get all clinics meeting requirements
app.get('/api/clinics/search', async (req, res) => {
  console.log("getting by requirement")
  try {
    const { userLatitude, userLongitude, radius, language, userID} = req.query;
    

    if (!userLatitude || !userLongitude || !radius || !language || !userID) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    const userLat = String(userLatitude);
    const userLng = String(userLongitude);
    const rad = String(radius);
    const userId = String(userID);
    const languagePreference=String(language)
   // const serviceDesired=String(service);
    const services=await getUserServices(userId)
    
    //const insurance = await getUserInsurance(userId);
    

    // if (!insurance) {
    //   return res.status(404).json({ message: "User data not found" });
    // }

    const parsedUserLatitude = parseFloat(userLat);
    const parsedUserLongitude = parseFloat(userLng);
    const parsedRadius = parseFloat(rad);
    
    const clinics = await getClinicsRadius3(
      parsedUserLatitude,
      parsedUserLongitude,
      parsedRadius,
      languagePreference,
      services
    );
    res.status(200).send(clinics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//----------------------------------------------
//USER ROUTES

//*****CHANGED!! */*********** */
//add a new user
app.post(`/api/users/:id`, async (req, res) => {
  console.log("[POST] entering '/users/:id' endpoint");
  const id: string = req.params.id;
  const { name, sex, insurance, policy, services } = req.body;
  const user: Users = {
    name,
    sex,
    insurance,
    policy,
    services
  };

  try {
    
    await addUser(id, user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/:name endpoint: ${err}`,
    });
  }
});


//get user by id
app.get("/api/users/:id", async (req, res) => {
  console.log("[GET] entering 'users/:id' endpoint");
  const id: string = req.params.id;
  try {
    const user = await getUser(id); 
    if (user === null) {
      res
        .status(404)
        .send({
          error: `ERROR: user with id: ${id} not found in Firestore`,
        });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/:id endpoint: ${err}`,
    });
  }
});



//delete user by id
app.delete("/api/users/:id", async (req, res) => {
  console.log("[DELETE] entering '/users/:id' endpoint");
  const id: string = req.params.id;

  try {
    await deleteUser(id);
    res.status(200).send({
      message: `SUCCESS deleted user with id: ${id} from the users collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/:id endpoint: ${err}`,
    });
  }
});


//PUT routes: updateAge, updateInsurance, updateLanguage, updateName

/*
//update age by user id
app.put("/api/users/age/:id", async (req, res) => {
  console.log("[PUT] entering '/api/users/age/:id' endpoint");
  const id: string = req.params.id;
  const {age}=req.body;
  
  try {
    await updateAge(id, age);
    res.status(200).send({
      message: `SUCCESS updated user with id: ${id} to age: ${age} from the users collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/age/:id endpoint: ${err}`,
    });
  }
});*/


//update insurance by user id
app.put("/api/users/insurance/:id", async (req, res) => {
  console.log("[PUT] entering '/api/users/insurance/:id' endpoint");
  const id: string = req.params.id;
  const {insurance}=req.body;
  
  try {
    await updateInsurance(id, insurance);
    res.status(200).send({
      message: `SUCCESS updated user with id: ${id} to insurance: ${insurance} from the users collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/insurance/:id endpoint: ${err}`,
    });
  }
});

//update preferred language by user id
/*
app.put("/api/users/language/:id", async (req, res) => {
  console.log("[PUT] entering '/api/users/language/:id' endpoint");
  const id: string = req.params.id;
  const {language}=req.body;
  
  try {
    await updateLanguage(id, language);
    res.status(200).send({
      message: `SUCCESS updated user with id: ${id} to language: ${language} from the users collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/language/:id endpoint: ${err}`,
    });
  }
});
*/

//update name by user id
app.put("/api/users/name/:id", async (req, res) => {
  console.log("[PUT] entering '/api/users/name/:id' endpoint");
  const id: string = req.params.id;
  const {name}=req.body;
  
  try {
    await updateName(id, name);
    res.status(200).send({
      message: `SUCCESS updated user with id: ${id} to name: ${name} from the users collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/name/:id endpoint: ${err}`,
    });
  }
});


app.put("/api/users/sex/:id", async (req, res) => {
  console.log("[PUT] entering '/api/users/sex/:id' endpoint");
  const id: string = req.params.id;
  const {sex}=req.body;
  
  try {
    await updateSex(id, sex);
    res.status(200).send({
      message: `SUCCESS updated user with id: ${id} to sex: ${sex} from the users collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/sex/:id endpoint: ${err}`,
    });
  }
});


app.put("/api/users/policyname/:id", async (req, res) => {
  console.log("[PUT] entering '/api/users/policyname/:id' endpoint");
  const id: string = req.params.id;
  const {policyName}=req.body;
  
  try {
    await updatePolicyName(id, policyName);
    res.status(200).send({
      message: `SUCCESS updated user with id: ${id} to policy name: ${policyName} from the users collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/policyname/:id endpoint: ${err}`,
    });
  }
});




app.listen(port, '0.0.0.0', () => {
  console.log(`SERVER listening on port ${port}`);
});
