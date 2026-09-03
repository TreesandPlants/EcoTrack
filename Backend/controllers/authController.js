const bcrypt = require("bcryptjs");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
try {
const { full_name, email, password } = req.body;

if (!full_name || !email || !password) {
  return res.status(400).json({
    message: "All fields are required",
  });
}

db.query(
  "SELECT id FROM users WHERE email = ?",
  [email],
  async (checkError, results) => {
    if (checkError) {
      console.error("Registration check error:", checkError);

      return res.status(500).json({
        message: "Database error while checking user",
      });
    }

    if (results.length > 0) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `INSERT INTO users
        (full_name, email, password, auth_provider)
        VALUES (?, ?, ?, ?)`,
        [
          full_name,
          email,
          hashedPassword,
          "local",
        ],
        (insertError, result) => {
          if (insertError) {
            console.error(
              "User registration database error:",
              insertError
            );

            return res.status(500).json({
              message: "Failed to create account",
              error: insertError.message,
            });
          }

          return res.status(201).json({
            message: "User Registered Successfully",
            userId: result.insertId,
          });
        }
      );
    } catch (hashError) {
      console.error("Password hashing error:", hashError);

      return res.status(500).json({
        message: "Password processing failed",
      });
    }
  }
);

} catch (error) {
console.error("Registration error:", error);
return res.status(500).json({
  message: "Registration failed",
  error: error.message,
});

}
};
exports.login = (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
return res.status(400).json({
message: "Email and password are required",
});
}

db.query(
"SELECT * FROM users WHERE email = ?",
[email],
async (err, result) => {
if (err) {
console.error("Login database error:", err);
    return res.status(500).json({
      message: "Database error",
    });
  }

  if (result.length === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const user = result[0];
  if (
    user.auth_provider === "google" &&
    user.password === "GOOGLE_LOGIN"
  ) {
    return res.status(400).json({
      message: "Please sign in using Google",
    });
  }

  try {
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        picture: user.profile_image || null,
        theme: user.theme || "light",
    language: user.language || "English",
    notifications:
      user.notifications !== undefined
        ? user.notifications
        : 1,
      },
    });

  } catch (compareError) {
    console.error("Password comparison error:", compareError);

    return res.status(500).json({
      message: "Login processing failed",
    });
  }
}

);
};
