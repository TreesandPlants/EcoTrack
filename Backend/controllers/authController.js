const bcrypt = require("bcryptjs");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
try {
const rawName = req.body.full_name;
const rawEmail = req.body.email;
const password = req.body.password;

const full_name = String(rawName || "").trim();
const email = String(rawEmail || "").trim().toLowerCase();

if (!full_name || !email || !password) {
  return res.status(400).json({
    message: "All fields are required",
  });
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return res.status(400).json({
    message: "Please provide a valid email address"
  });
}

if (full_name.length < 2 || full_name.length > 100) {
  return res.status(400).json({
    message: "Name must contain between 2 and 100 characters"
  });
}

if (password.length < 8) {
  return res.status(400).json({
    message: "Password must contain at least 8 characters"
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
      message: "Invalid email or password",
    });
  }

  const user = result[0];
  if (
    user.auth_provider === "google" &&
    user.password === "GOOGLE_LOGIN"
  ) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  try {
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
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
