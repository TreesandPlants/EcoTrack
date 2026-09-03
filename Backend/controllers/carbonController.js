const db = require("../config/db");

exports.calculateCarbon = (req,res)=>{

 const {
   user_id,
   transport_type,
   travel_distance,
   electricity_usage,
   waste_generated
 } = req.body;

 let transportEmission = 0;

 if(transport_type==="car"){
   transportEmission = travel_distance * 0.21;
 }

 if(transport_type==="bus"){
   transportEmission = travel_distance * 0.08;
 }

 if(transport_type==="bike"){
   transportEmission = travel_distance * 0.05;
 }

 const electricityEmission =
 electricity_usage * 0.82;

 const wasteEmission =
 waste_generated * 0.57;

 const totalCarbon =
 transportEmission +
 electricityEmission +
 wasteEmission;

 db.query(
  `INSERT INTO calculations
   (user_id,transport_type,
    travel_distance,
    electricity_usage,
    waste_generated,
    total_carbon)
   VALUES(?,?,?,?,?,?)`,
 [
   user_id,
   transport_type,
   travel_distance,
   electricity_usage,
   waste_generated,
   totalCarbon
 ],
 ()=>{}
 );

 res.json({
   transportEmission,
   electricityEmission,
   wasteEmission,
   totalCarbon
 });
};