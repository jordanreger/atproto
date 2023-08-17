import { serve } from "https://deno.land/std/http/server.ts";
import { getDID } from "../lib/getDID.ts";

const headers = { headers: { "Content-Type": "application/json" } };

async function handler (req: Request): Response {
	const url = new URL(req.url),
				pathname = url.pathname,
				params = url.searchParams;

	// com.atproto.repo
	
	// .describeRepo
	if (pathname === "/xrpc/com.atproto.repo.describeRepo") {
		const repo = params.get("repo");
		if (repo) {
			const res = await fetch(`https://bsky.social/xrpc/com.atproto.repo.describeRepo?repo=${repo}`).then(res => res.json());
			return new Response(JSON.stringify(res), headers);
		} else {
			return new Response(JSON.stringify({ "error": "InvalidRequest", "message": "Error: Params must have the property \"repo\"" }), headers);
		}
	}
	// .listRecords
	if (pathname === "/xrpc/com.atproto.repo.listRecords") {
		const repo = params.get("repo"), collection = params.get("collection");
		if (!repo) {
			return new Response(JSON.stringify({ "error": "InvalidRequest", "message": "Error: Params must have the property \"repo\"" }), headers);
		} else if (!collection) {
			return new Response(JSON.stringify({ "error": "InvalidRequest", "message": "Error: Params must have the property \"repo\"" }), headers);
		} else {
			const res = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${repo}&collection=${collection}`).then(res => res.json());
				return new Response(JSON.stringify(res), headers);
		}
	}
	// .getRecord
	if (pathname === "/xrpc/com.atproto.repo.getRecord") {
		const repo = params.get("repo"), collection = params.get("collection"), rkey = params.get("rkey");
		if (!repo) {
			return new Response(JSON.stringify({ "error": "InvalidRequest", "message": "Error: Params must have the property \"repo\"" }), headers);
		} else if (!collection) {
			return new Response(JSON.stringify({ "error": "InvalidRequest", "message": "Error: Params must have the property \"repo\"" }), headers);
		} else if (!rkey) {
			return new Response(JSON.stringify({ "error": "InvalidRequest", "message": "Error: Params must have the property \"rkey\"" }), headers);

		} else {
			const res = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?repo=${repo}&collection=${collection}&rkey=${rkey}`).then(res => res.json());
				return new Response(JSON.stringify(res), headers);
		}
	}

	// com.atproto.identity
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
