const db = require("../config/db");

const {
  calculateLevel
} = require("../utils/xpSystem");

const {
  checkAchievements
} = require("../utils/achievementSystem");


// ======================================================
// SAVE CALCULATION
// ======================================================

exports.saveCalculation = async (req, res) => {

  const {
    transport_type,
    travel_distance,
    electricity_usage,
    waste_generated,
    total_carbon
  } = req.body;

  // Get logged-in user from JWT
  const user_id = req.user.id;


  // ======================================================
  // STEP 1 — SAVE CALCULATION
  // ======================================================

  db.query(

    `INSERT INTO calculations
    (
      user_id,
      transport_type,
      travel_distance,
      electricity_usage,
      waste_generated,
      total_carbon
    )
    VALUES (?, ?, ?, ?, ?, ?)`,

    [
      user_id,
      transport_type,
      travel_distance,
      electricity_usage,
      waste_generated,
      total_carbon
    ],

    (err, result) => {

      if (err) {

        console.error(
          "Save Calculation Error:",
          err
        );

        return res.status(500).json({
          message: "Failed to save calculation"
        });

      }


      // ======================================================
      // STEP 2 — GET CURRENT XP
      // ======================================================

      db.query(

        "SELECT xp, level FROM users WHERE id = ?",

        [user_id],

        (err, userResult) => {

          if (err) {

            console.error(
              "Get XP Error:",
              err
            );

            return res.status(500).json({
              message:
                "Calculation saved but XP update failed"
            });

          }


          if (userResult.length === 0) {

            return res.status(404).json({
              message: "User not found"
            });

          }


          const currentXP =
            Number(userResult[0].xp || 0);

          const newXP =
            currentXP + 10;

          const newLevel =
            calculateLevel(newXP);


          // ======================================================
          // STEP 3 — UPDATE XP
          // ======================================================

          db.query(

            `UPDATE users
             SET xp = ?,
                 level = ?
             WHERE id = ?`,

            [
              newXP,
              newLevel,
              user_id
            ],

            async (err) => {

              if (err) {

                console.error(
                  "XP Update Error:",
                  err
                );

                return res.status(500).json({
                  message:
                    "Calculation saved but XP update failed"
                });

              }


              // ======================================================
              // STEP 4 — CHECK ACHIEVEMENTS
              // ======================================================

               let newlyUnlocked = [];

try {

  newlyUnlocked =
    await checkAchievements(user_id);

} catch (achievementError) {

  console.error(
    "❌ Achievement processing failed:",
    achievementError
  );

  // Calculation and XP were already successfully saved.
  // Don't fail the entire calculation request.
  newlyUnlocked = [];

}

              // ======================================================
              // FINAL RESPONSE
              // ======================================================

              return res.status(201).json({

                message: "Calculation Saved",

                calculationId:
                  result.insertId,

                xp: newXP,

                level: newLevel,

                achievements:
                  newlyUnlocked

              });

            }

          );

        }

      );

    }

  );

};


// ======================================================
// GET USER CALCULATIONS
// ======================================================

exports.getCalculations = (req, res) => {

  // User comes from JWT
  const userId = req.user.id;

  db.query(

    `SELECT *
     FROM calculations
     WHERE user_id = ?
     ORDER BY created_at DESC`,

    [userId],

    (err, result) => {

      if (err) {

        console.error(
          "Get Calculations Error:",
          err
        );

        return res.status(500).json({
          message: "Failed to fetch calculations"
        });

      }

      return res.json(result);

    }

  );

};


// ======================================================
// DELETE CALCULATION
// ======================================================

exports.deleteCalculation = (req, res) => {

  const userId = req.user.id;

  const calculationId = req.params.id;


  // ======================================================
  // STEP 1 — DELETE CALCULATION
  // ======================================================

  db.query(

    `DELETE FROM calculations
     WHERE id = ?
     AND user_id = ?`,

    [
      calculationId,
      userId
    ],

    (err, result) => {

      if (err) {

        console.error(
          "Delete Calculation Error:",
          err
        );

        return res.status(500).json({
          message:
            "Failed to delete calculation"
        });

      }


      if (result.affectedRows === 0) {

        return res.status(404).json({
          message:
            "Calculation not found or unauthorized"
        });

      }


      // ======================================================
      // STEP 2 — COUNT REMAINING CALCULATIONS
      // ======================================================

      db.query(

        `SELECT COUNT(*) AS total
         FROM calculations
         WHERE user_id = ?`,

        [userId],

        (err, countResult) => {

          if (err) {

            console.error(
              "Calculation Count Error:",
              err
            );

            return res.status(500).json({
              message:
                "Calculation deleted but XP update failed"
            });

          }


          const totalCalculations =
            Number(countResult[0].total || 0);


          // ======================================================
          // STEP 3 — RECALCULATE XP
          // ======================================================

          const newXP =
            totalCalculations * 10;


          // ======================================================
          // STEP 4 — RECALCULATE LEVEL
          // ======================================================

          const newLevel =
            calculateLevel(newXP);


          // ======================================================
          // STEP 5 — UPDATE USER
          // ======================================================

          db.query(

            `UPDATE users
             SET xp = ?,
                 level = ?
             WHERE id = ?`,

            [
              newXP,
              newLevel,
              userId
            ],

            (err) => {

              if (err) {

                console.error(
                  "XP Update After Delete Error:",
                  err
                );

                return res.status(500).json({
                  message:
                    "Calculation deleted but XP update failed"
                });

              }


              // ======================================================
              // FINAL RESPONSE
              // ======================================================

              return res.json({

                message:
                  "Calculation Deleted Successfully",

                totalCalculations,

                xp: newXP,

                level: newLevel

              });

            }

          );

        }

      );

    }

  );

};