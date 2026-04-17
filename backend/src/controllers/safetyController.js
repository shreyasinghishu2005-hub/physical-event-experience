import { createSosAlert, getHelpDesks } from "../services/safetyService.js";

export function helpDesks(request, response) {
  response.json(getHelpDesks());
}

export function sos(request, response) {
  response.json(createSosAlert(request.body));
}