import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Sync User from NextAuth (GitHub)
// @route   POST /api/auth/github/sync
// @access  Public (Secured by NextAuth on frontend)
export const syncGitHubUser = asyncHandler(async (req, res) => {
  const { githubId, email, username, accessToken } = req.body;

  let user = await User.findOne({ githubId });

  if (user) {
    user.githubAccessToken = accessToken;
    user.email = email;
    user.githubUsername = username;
    await user.save();
    console.log(`User synced: ${user.username}`);
  } else {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      user = emailExists;
      user.githubId = githubId;
      user.githubUsername = username;
      user.githubAccessToken = accessToken;
      await user.save();
      console.log(`Existing user linked to GitHub: ${user.username}`);
    } else {
      user = await User.create({
        username,
        email,
        githubId,
        githubAccessToken: accessToken,
        password: `oauth-${Date.now()}-${githubId}`,
      });
      console.log(`New user created: ${user.username}`);
    }
  }

  res.json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});

