export type DemoCredential = {
  username: string;
  password: string;
};

export function getDemoCredentials(): DemoCredential[] {
  const raw = process.env.DEMO_CREDENTIALS || "";

  return raw
    .split(",")
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const [username, ...passwordParts] = pair.split(":");

      return {
        username: username?.trim() || "",
        password: passwordParts.join(":").trim(),
      };
    })
    .filter((credential) => credential.username && credential.password);
}

export function validateDemoCredential(username: string, password: string) {
  const credentials = getDemoCredentials();

  return credentials.some(
    (credential) =>
      credential.username === username && credential.password === password
  );
}