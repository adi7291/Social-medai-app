const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",

    });
    return res.status(200).json({ message: "Signout successfully!!." });
  } catch (error) {
    console.error("Signout error");
    return res.status(500).json({
      message: "SignOut Error",
      error: error.message,
    });
  }
};
export default signOut;
