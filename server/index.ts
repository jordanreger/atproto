import { serve } from "https://deno.land/std/http/server.ts";
import { getDID } from "./did.ts";

const headers = { headers: { "Content-Type": "application/json" } };

async function handler (req: Request): Response {
	const url = new URL(req.url),
				pathname = url.pathname,
				params = url.searchParams;
	
	if (pathname === "/xrpc/com.atproto.identity.resolveHandle") {
		const handle = params.get("handle");
		const did = await getDID(handle);
		if (handle) {
			return new Response(JSON.stringify({ "did": did }), headers);
		} else {
			return new Response("?handle= not supplied");
		}
	}

	// 404 error
	else return new Response(`Cannot GET ${pathname}`, { status: 404 });
}

serve(handler);
