const db = require("../config/db");

// ======================================================
// CHECK ACHIEVEMENTS
// ======================================================

const checkAchievements = async (userId) => {

    try {

        console.log("🏆 Checking achievements for user:", userId);

        // --------------------------------------------------
        // GET CALCULATION COUNT
        // --------------------------------------------------

        const totalCalculations =
            await new Promise((resolve, reject) => {

                db.query(
                    `
                    SELECT COUNT(*) AS total
                    FROM calculations
                    WHERE user_id = ?
                    `,
                    [userId],

                    (err, result) => {

                        if (err) {
                            return reject(err);
                        }

                        resolve(
                            Number(result[0].total || 0)
                        );

                    }
                );

            });

        console.log(
            "📊 Total calculations:",
            totalCalculations
        );


        // --------------------------------------------------
        // GET ALL ACHIEVEMENTS
        // --------------------------------------------------

        const achievements =
            await new Promise((resolve, reject) => {

                db.query(
                    `
                    SELECT *
                    FROM achievements
                    ORDER BY id ASC
                    `,

                    (err, results) => {

                        if (err) {
                            return reject(err);
                        }

                        resolve(results);
                    }

                );

            });


        console.log(
            "🏅 Total achievements:",
            achievements.length
        );


        // --------------------------------------------------
        // GET UNLOCKED ACHIEVEMENTS
        // --------------------------------------------------

        const unlocked =
            await new Promise((resolve, reject) => {

                db.query(
                    `
                    SELECT achievement_id
                    FROM user_achievements
                    WHERE user_id = ?
                    `,
                    [userId],

                    (err, results) => {

                        if (err) {
                            return reject(err);
                        }

                        resolve(results);
                    }

                );

            });


        const unlockedIds =
            unlocked.map(
                item => Number(item.achievement_id)
            );


        console.log(
            "🔓 Already unlocked:",
            unlockedIds
        );


        // --------------------------------------------------
        // DETERMINE NEW ACHIEVEMENTS
        // --------------------------------------------------

        const newlyUnlocked = [];


        for (const achievement of achievements) {

            let qualifies = false;


            // First calculation
            if (
                Number(achievement.id) === 1 &&
                totalCalculations >= 1
            ) {

                qualifies = true;

            }


            // Five calculations
            if (
                Number(achievement.id) === 2 &&
                totalCalculations >= 5
            ) {

                qualifies = true;

            }


            console.log(
    "🏆 Achievement check:",
    achievement.id,
    achievement.name,
    "Total calculations:",
    totalCalculations,
    "Qualifies:",
    qualifies
);

            // ------------------------------------------------
            // INSERT IF QUALIFIED
            // ------------------------------------------------

            if (
                qualifies &&
                !unlockedIds.includes(
                    Number(achievement.id)
                )
            ) {

                console.log(
                    "🔓 Unlocking:",
                    achievement.name,
                    "for user:",
                    userId
                );


                await new Promise((resolve, reject) => {

                    db.query(
                        `
                        INSERT INTO user_achievements
                        (
                            user_id,
                            achievement_id
                        )
                        VALUES (?, ?)
                        `,

                        [
                            userId,
                            achievement.id
                        ],

                        (err, result) => {

                            if (err) {

                                console.error(
                                    "❌ Achievement INSERT error:",
                                    err
                                );

                                return reject(err);

                            }


                            console.log(
                                "✅ Achievement inserted:",
                                achievement.name,
                                "ID:",
                                result.insertId
                            );


                            resolve();

                        }

                    );

                });


                newlyUnlocked.push(achievement);

            }

        }


        console.log(
            "🎉 Newly unlocked:",
            newlyUnlocked.map(
                achievement => achievement.name
            )
        );


        return newlyUnlocked;


    } catch (error) {

        console.error(
            "❌ checkAchievements failed:",
            error
        );

        throw error;

    }

};


module.exports = {
    checkAchievements
};