const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {

    console.log("Google Login Controller Hit");

  try {

    const { credential } = req.body;

    if (!credential) {

      return res.status(400).json({
        message: "Missing Google credential"
      });

    }

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

    db.query(

      "SELECT * FROM users WHERE email = ?",

      [email],

      (err, result) => {

        if (err)
          return res.status(500).json(err);

        // Existing User
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
  picture: user.profile_image || null,

  theme: user.theme || "light",
  language: user.language || "en",
  notifications: user.notifications ?? 1
}

          });

        }

        // New User

        db.query(

          "INSERT INTO users(full_name,email,password, profile_image, auth_provider) VALUES(?,?,?,?,?)",

          [

            name,

            email,

            "GOOGLE_LOGIN",

            picture,

            "google"

          ],

          (err, insertResult) => {

            if (err)
              return res.status(500).json(err);

            const token = jwt.sign(

              {

                id: insertResult.insertId,

                email

              },

              process.env.JWT_SECRET,

              {

                expiresIn: "1d"

              }

            );

            res.json({

              message: "Google Account Created",

              token,

              user: {

                id: insertResult.insertId,

                full_name: name,

                email,

                picture,

                auth_provider: "google"

              }

            });

          }

        );

      }

    );

  }

  catch (err) {

    console.error("Google Login Error:", err);

    return res.status(500).json({

        message: "Google Authentication Failed",

        error: err.message

    });

}
};