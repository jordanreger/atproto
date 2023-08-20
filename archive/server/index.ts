import describeRepo from "./repo/describeRepo.ts";
import listRecords from "./repo/listRecords.ts";

// move out
import { getDID } from "../lib/getDID.ts";
import headers from "./headers.ts";

async function handler (req: Request): Promise<Response> {
	const url = new URL(req.url),
				pathname = url.pathname,
				params = url.searchParams;

	// com.atproto.repo
	
	// .describeRepo
	if (pathname === "/xrpc/com.atproto.repo.describeRepo") return describeRepo(params.get("repo")!)
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

Deno.serve(handler);
