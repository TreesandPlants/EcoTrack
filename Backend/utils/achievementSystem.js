const db = require("../config/db");


const checkAchievements = (userId) => {

    return new Promise((resolve, reject) => {

        // Get number of calculations
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

                const totalCalculations =
                    Number(result[0].total || 0);


                // Find available achievements
                db.query(
                    `
                    SELECT *
                    FROM achievements
                    ORDER BY id ASC
                    `,

                    (err, achievements) => {

                        if (err) {
                            return reject(err);
                        }


                        // Check already unlocked achievements
                        db.query(
                            `
                            SELECT achievement_id
                            FROM user_achievements
                            WHERE user_id = ?
                            `,

                            [userId],

                            (err, unlocked) => {

                                if (err) {
                                    return reject(err);
                                }


                                const unlockedIds =
                                    unlocked.map(
                                        item =>
                                            item.achievement_id
                                    );


                                const newlyUnlocked = [];


                                achievements.forEach(
                                    achievement => {

                                        let qualifies = false;


                                        /*
                                         * Achievement 1:
                                         * First Calculation
                                         */
                                        if (
                                            achievement.name ===
                                            "First Green Step" &&
                                            totalCalculations >= 1
                                        ) {

                                            qualifies = true;

                                        }


                                        /*
                                         * Achievement 2:
                                         * Five Calculations
                                         */
                                        if (
                                            achievement.name ===
                                            "Eco Explorer" &&
                                            totalCalculations >= 5
                                        ) {

                                            qualifies = true;

                                        }


                                        if (
                                            qualifies &&
                                            !unlockedIds.includes(
                                                achievement.id
                                            )
                                        ) {

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
                                                ]
                                            );


                                            newlyUnlocked.push(
                                                achievement
                                            );

                                        }

                                    }
                                );


                                resolve(
                                    newlyUnlocked
                                );

                            }
                        );

                    }
                );

            }
        );

    });

};


module.exports = {
    checkAchievements
};