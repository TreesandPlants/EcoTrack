const db = require("../config/db");

const getProfile = (req, res) => {

  const { id } = req.params;

  db.query(
    `SELECT
      id,
      full_name,
      email,
      country,
      profile_image,
      created_at,
      theme,
      language,
      notifications
     FROM users
     WHERE id = ?`,
    [id],
    (err, results) => {

      if (err) {

        console.error("Get Profile Error:", err);

        return res.status(500).json({
          message: "Failed to fetch profile"
        });

      }

      if (results.length === 0) {

        return res.status(404).json({
          message: "User not found"
        });

      }

      res.json(results[0]);

    }
  );

};

const updateProfile = (req, res) => {

  const { id } = req.params;

  const {
    full_name,
    country,
    theme,
    language, 
    notifications
  } = req.body;


  const fields = [];
  const values = [];


  if (full_name !== undefined) {

    fields.push("full_name = ?");
    values.push(full_name);

  }


  if (country !== undefined) {

    fields.push("country = ?");
    values.push(country);

  }


  if (theme !== undefined) {

    fields.push("theme = ?");
    values.push(theme);

  }


  if (language !== undefined) {

    fields.push("language = ?");
    values.push(language);

  }

  if (notifications !== undefined) {

  fields.push("notifications = ?");
  values.push(notifications);

}


  if (fields.length === 0) {

    return res.status(400).json({

      message:
        "No fields provided for update"

    });

  }


  values.push(id);


  const query = `

    UPDATE users

    SET ${fields.join(", ")}

    WHERE id = ?

  `;


  db.query(

    query,

    values,

    (err, result) => {

      if (err) {

        console.error(
          "Update Profile Error:",
          err
        );

        return res.status(500).json({

          message:
            "Failed to update profile"

        });

      }


      return res.json({

        message:
          "Profile Updated Successfully"

      });

    }

  );

};

const uploadProfileImage = (req, res) => {

  const id = req.params.id;

  if (!req.file) {
    return res.status(400).json({
      message: "No image uploaded",
    });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  db.query(
    `UPDATE users
     SET profile_image = ?
     WHERE id = ?`,
    [imagePath, id],
    (err) => {
      if (err)
        return res.status(500).json({message: "Failed to update profile image"});

      res.json({
        message: "Profile image updated",
        imagePath,
      });
    }
  );
};

const getEcoRank=(req,res)=>{

const userId=req.params.id;

db.query(

"SELECT xp,level FROM users WHERE id=?",

[userId],

(err,result)=>{

if(err){
  console.error("EcoRank Error:", err)
return res.status(500).json({
  message: "Failed to fetch EcoRank"
});
}
if(result.length===0)
return res.status(404).json({

message:"User not found"

});

const {
        calculateLevel,
        getRank
      } = require("../utils/xpSystem");

      const xp = Number(result[0].xp || 0);

      const level = calculateLevel(xp);

      const rank = getRank(level);

      res.json({
        xp,
        level,
        rank
      });

});

};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
  getEcoRank,
};
