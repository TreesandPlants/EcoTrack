const db = require("../config/db");


// ======================================
// GET USER ACHIEVEMENTS
// ======================================

exports.getUserAchievements = (req, res) => {

    const userId = req.user.id;

    const query = `

        SELECT
            a.id,
            a.name,
            a.description,
            a.icon,
            a.xp_reward,
            ua.unlocked_at

        FROM achievements a

        LEFT JOIN user_achievements ua
            ON a.id = ua.achievement_id
            AND ua.user_id = ?

        ORDER BY a.id ASC

    `;

    db.query(
        query,
        [userId],
        (err, results) => {

            if (err) {

                console.error(
                    "Achievements Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to load achievements"
                });

            }

            res.json(results);

        }
    );

};