import { redirect } from "next/navigation";
import { parseSelectablePlan } from "@/lib/plans";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

/**
 * Signup belongs to the client application, which owns the trial it creates
 * and the session that follows it. The public website no longer runs a second
 * registration form against the same API.
 *
 * This route stays so existing marketing links, campaign URLs and bookmarks
 * keep working, and so the pricing CTAs can name a stable public path instead
 * of carrying a deployment hostname in translation data.
 *
 * The chosen plan travels with the redirect. Only that one parameter does, and
 * only when it names a plan we actually offer: everything else on an inbound
 * URL is dropped rather than forwarded to another origin unexamined. The
 * client signup is free to ignore it until it is wired up.
 */
type RegisterPageProps = {
  searchParams: Promise<{
    plan?: string | string[];
  }>;
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const { plan } = await searchParams;
  const selectedPlan = parseSelectablePlan(plan);

  redirect(
    selectedPlan
      ? `${CLIENT_SIGNUP_URL}?plan=${encodeURIComponent(selectedPlan)}`
      : CLIENT_SIGNUP_URL,
  );
}
