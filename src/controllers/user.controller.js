import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../models/user.modules.js";
import { uploadOnCloudinary } from "../utils/claudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });

  // Steps wise for the algorithm of all check list for programming logic.
  const { fullname, username, email, password } = req.body;
  console.log("email", email);
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiErrors(400, "All Fields Are Required");
  }

  const existedUser = Userser.findone({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiErrors(409, "User with email or username already exsist");
  }

  const avatarLocalPath = req.files?.avatar[0].path;
  const coverImageLocalPath = req.files?.coverImage[0].path;

  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar is must required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiErrors(400, "Avatar is must required");
  }

  const user = await User.create({
    fullname,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
  });
  const createdUser = User.findbyId(user._id).select("-password -refreshToken");

  if (!createdUserUser) {
    throw new ApiErrors(500, "STH is wrong in registering the UserS");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registrated succesfully"));
});

export { registerUser };
