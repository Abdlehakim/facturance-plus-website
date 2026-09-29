import { redirect } from "next/navigation";
import { CLIENT_LOGIN_URL } from "@/lib/urls";

/**
 * The public website no longer authenticates anyone: login belongs to the
 * client application, which owns the session it creates.
 *
 * This route stays so existing links, bookmarks and indexed results keep
 * working; it forwards to the client application instead of rendering a second
 * login form against the same API.
 */
export default function LoginPage() {
  redirect(CLIENT_LOGIN_URL);
}
