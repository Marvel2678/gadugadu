import { db } from "..";
import bcrypt from "bcrypt";

export const RegisterUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  const userExistName = await db.query(
    "SELECT id FROM users WHERE username = ?",
    [username]
  );

  const userExistEmail = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (userExistName) {
    return res.json({ ok: false, message: "Nazwa użytkownika została użyta" });
  }

  if (userExistEmail) {
    return res.json({ ok: false, message: "Ten Email został już użyty" });
  }

  const encryptedPassword = bcrypt.hash(password);

  await db.query(
    "INSERT INTO users (name, username, email, password, avatar_url) VALUES (?, ?, ?, ?, ?)",
    [name, username, email, encryptedPassword, ""]
  );
};

export const LoginUser = async (req, res) => {
  const { param, password } = req.body;
  try {
    const userExist = db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [param, param]
    );

    if (!userExist) {
      return res.json({ ok: false, message: "Użytkownik nie istnieje" });
    }

    const isTheSame = bcrypt.compare(password, userExist.rows[0].password);

    if (!isTheSame) {
      return res.json({
        ok: false,
        message: "Email albo hasło są niepoprawne",
      });
    }

    const token = "";

    return json({ ok: true, token });
  } catch (error) {}
};
