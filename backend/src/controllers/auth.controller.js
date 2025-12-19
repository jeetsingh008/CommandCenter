import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // or wherever your helper is
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

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
  } else {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      user = emailExists;
      user.githubId = githubId;
      user.githubUsername = username;
      user.githubAccessToken = accessToken;
      await user.save();
    } else {
      user = await User.create({
        username: username || `user_${githubId}`,
        email,
        githubId,
        githubAccessToken: accessToken,
        password: `oauth-${Date.now()}-${githubId}`, // Random password for OAuth users
      });
    }
  }

  // Generate tokens for the session
  const { accessToken: apiToken, refreshToken } =
    await generateAccessAndRefereshTokens(user._id);

  // FIX: Using ApiResponse for consistency, and ensuring 'token' key exists for frontend
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        token: apiToken, // Frontend 'jwt' callback expects 'data.token'
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
      "GitHub user synced successfully"
    )
  );
});

// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Validation
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // 2️⃣ Check existing user
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // 3️⃣ Auto-generate username
  const username = email.split("@")[0] + "_" + Date.now().toString().slice(-4);

  // 4️⃣ Create user
  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
    fullName: "", // can be updated later
    avatar: "/images/avatar.png", // default avatar
    coverImage: "",
  });

  // 5️⃣ Remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Email & pw are: ", email, password);

  if (!password && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true, // Should be true in production
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          token: accessToken, // CRITICAL FIX: Frontend 'authorize' checks !data.token
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

// @desc    Change Password
// @route   POST /api/auth/change-password
// @access  Private
export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// @desc    Get Current User
// @route   GET /api/auth/current-user
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

// @desc    Update Account Details
// @route   PATCH /api/auth/update-account
// @access  Private
export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

//@desc    Update User Avatar
//@route   PATCH /api/auth/avatar
//@access  Private
export const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  //TODO: delete old image - assignment

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});
