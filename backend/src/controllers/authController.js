import { createUserProfile } from "../services/firebaseService.js";

export async function signup(request, response, next) {
  try {
    const createdUser = await createUserProfile(request.body);
    response.status(201).json({
      user: createdUser,
      token: "demo-signup-token"
    });
  } catch (error) {
    next(error);
  }
}

export async function login(request, response, next) {
  try {
    response.json({
      user: {
        email: request.body.email,
        role: "attendee"
      },
      token: "demo-login-token"
    });
  } catch (error) {
    next(error);
  }
}