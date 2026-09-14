const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

exports.googleLogin = async (req, res) => {

    console.log("Google Login Controller Hit");

    try {

        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "Missing Google credential"
            });
        }

        // =====================================================
        // VERIFY GOOGLE TOKEN
        // =====================================================

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const {
            email,
            name,
            picture
        } = payload;

        if (!email) {
            return res.status(400).json({
                message: "Google account email not available"
            });
        }

        // =====================================================
        // FIND USER
        // =====================================================

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, result) => {

                if (err) {

                    console.error(
                        "Google user lookup error:",
                        err
                    );

                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                // =================================================
                // EXISTING USER
                // =================================================

                if (result.length > 0) {

                    const user = result[0];

                    const token = jwt.sign(
                        {
                            id: user.id,
                            email: user.email
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1d"
                        }
                    );

                    return res.json({
                        message: "Google Login Successful",

                        token,

                        user: {
                            id: user.id,
                            full_name: user.full_name,
                            email: user.email,
                            picture:
                                user.profile_image ||
                                picture ||
                                null,

                            auth_provider:
                                user.auth_provider || "google",

                            theme:
                                user.theme || "light",

                            language:
                                user.language || "English",

                            notifications:
                                user.notifications !== undefined
                                    ? user.notifications
                                    : 1
                        }
                    });
                }

                // =================================================
                // NEW GOOGLE USER
                // =================================================

                db.query(
                    `INSERT INTO users
                    (
                        full_name,
                        email,
                        password,
                        profile_image,
                        auth_provider
                    )
                    VALUES (?, ?, ?, ?, ?)`,

                    [
                        name || "Google User",
                        email,
                        "GOOGLE_LOGIN",
                        picture || null,
                        "google"
                    ],

                    (err, insertResult) => {

                        if (err) {

                            console.error(
                                "Google user creation error:",
                                err
                            );

                            return res.status(500).json({
                                message:
                                    "Failed to create Google account"
                            });
                        }

                        const userId =
                            insertResult.insertId;

                        const token = jwt.sign(
                            {
                                id: userId,
                                email
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "1d"
                            }
                        );

                        return res.status(201).json({

                            message:
                                "Google Account Created",

                            token,

                            user: {
                                id: userId,
                                full_name:
                                    name || "Google User",
                                email,
                                picture:
                                    picture || null,

                                auth_provider: "google",

                                theme: "light",
                                language: "English",
                                notifications: 1
                            }
                        });
                    }
                );
            }
        );

    } catch (err) {

        console.error(
            "Google Authentication Error:",
            err
        );

        return res.status(500).json({
            message:
                "Google Authentication Failed"
        });
    }
};