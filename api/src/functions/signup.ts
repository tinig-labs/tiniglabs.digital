import { app, type HttpRequest, type HttpResponseInit } from "@azure/functions";
import { clientIp } from "../rate-limit";
import { joinWaitlist, subscribeToBlog, type Input, type SignupResult } from "../signup";

type Handler = (input: Input, ip: string) => Promise<SignupResult>;

// Static Web Apps serves these at /api/<route>, on the same origin as the site
function signupEndpoint(handler: Handler) {
  return async (request: HttpRequest): Promise<HttpResponseInit> => {
    let input: Input;
    try {
      const body = await request.json();
      if (!body || typeof body !== "object") throw new Error("not an object");
      input = body as Input;
    } catch {
      return { status: 400, jsonBody: { ok: false, error: "Send the form as JSON." } };
    }

    const result = await handler(input, clientIp(request.headers));
    return result.ok
      ? { status: 200, jsonBody: { ok: true } }
      : { status: result.status, jsonBody: { ok: false, error: result.error } };
  };
}

app.http("waitlist", {
  route: "waitlist",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: signupEndpoint(joinWaitlist),
});

app.http("subscribe", {
  route: "subscribe",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: signupEndpoint(subscribeToBlog),
});
