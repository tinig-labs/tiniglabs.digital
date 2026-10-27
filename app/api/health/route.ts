// App Service health check path. Kept free of external calls so a slow
// email service never takes instances out of rotation.
export function GET() {
  return Response.json({ status: "ok" });
}
