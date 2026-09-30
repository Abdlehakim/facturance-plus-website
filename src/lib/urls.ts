/**
 * Where the authenticated client application lives.
 *
 * The public website and the client application are two deployments on two
 * origins: facturance.com serves marketing, client.plus.facturance.com owns
 * login, signup and every authenticated screen. Anything here that points at
 * the client app crosses an origin in production, so it is a real navigation
 * rather than a Next.js route.
 *
 * The paths mirror the client application's own router exactly - it serves
 * /login and /signup at the root, with no /dashboard prefix, no router
 * basename and no Vite base.
 *
 * Kept in one place on purpose: a production hostname scattered across
 * components is the thing that makes a domain move painful.
 */
export const CLIENT_APP_BASE_URL =
  process.env.NEXT_PUBLIC_CLIENT_APP_BASE_URL ?? "http://localhost:5174";

/** The canonical web client login screen. */
export const CLIENT_LOGIN_URL = `${CLIENT_APP_BASE_URL}/login`;

/** The canonical trial signup screen, which the client application owns. */
export const CLIENT_SIGNUP_URL = `${CLIENT_APP_BASE_URL}/signup`;

/**
 * Desktop installers and release notes. Authenticated, so the public site
 * links to it rather than reimplementing it.
 */
export const CLIENT_DOWNLOADS_URL = `${CLIENT_APP_BASE_URL}/downloads`;
