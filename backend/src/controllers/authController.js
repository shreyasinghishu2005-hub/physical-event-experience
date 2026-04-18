import { createUserProfile } from "../services/firebaseService.js";
import { normalizeRole, requireEmail, requireText } from "../utils/requestValidation.js";

export async function signup(request, response, next) {
  try {
    const createdUser = await createUserProfile({
      name: requireText(request.body.name, "name"),
      email: requireEmail(request.body.email, "email"),
      role: normalizeRole(request.body.role)
    });
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
        email: requireEmail(request.body.email, "email"),
        role: normalizeRole(request.body.role)
      },
      token: "demo-login-token"
    });
  } catch (error) {
    next(error);
  }
}
