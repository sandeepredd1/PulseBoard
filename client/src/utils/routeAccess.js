const PUBLIC_ROUTES = new Set([
  "/login",
  "/register",
  "/signup",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
]);

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/projects",
  "/analytics",
  "/customers",
  "/settings",
  "/integrations",
  "/support",
  "/ai-insights",
  "/profile",
];

export function canAccessRoute({ isAuthenticated, path = "/" }) {
  if (!path) {
    return true;
  }

  if (PUBLIC_ROUTES.has(path)) {
    return !isAuthenticated;
  }

  const isProtected = PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));

  if (isProtected) {
    return isAuthenticated;
  }

  return true;
}
