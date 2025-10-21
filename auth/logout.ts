import jwt from "jsonwebtoken";
import prisma from "../utils/database/engine.js";

export const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const verified = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Find user and check if refresh token matches
    const user = await prisma.user.findUnique({
      where: { username: verified.username },
    });

    if (!user || user.lastToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Invalidate refresh token by clearing it in database
    await prisma.user.update({
      where: { username: verified.username },
      data: { lastToken: null },
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};
