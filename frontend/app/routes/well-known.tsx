import type { Route } from "./+types/well-known";

export function loader({ request }: Route.LoaderArgs) {
  return new Response(null, { status: 404 });
}