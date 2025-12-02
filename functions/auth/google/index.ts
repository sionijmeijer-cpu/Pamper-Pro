export default async function handler(req: any, res: any) {
  res.status(410).json({ error: "Google OAuth has been disabled" });
}
