import { connectUsers, getMatches } from "../services/networkingService.js";

export function matches(request, response) {
  response.json(getMatches(request.params.userId));
}

export function connect(request, response) {
  response.json(connectUsers(request.body));
}