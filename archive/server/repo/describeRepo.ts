import headers from "../headers.ts";
// TODO: create error function

export default async function describeRepo(repo: string): Response {
	if (repo) {
		const res = await fetch(`https://bsky.social/xrpc/com.atproto.repo.describeRepo?repo=${repo}`).then(res => res.json());
		return new Response(JSON.stringify(res), headers);
	} else {
		return new Response(JSON.stringify({ "error": "Invalid", "message": "Error: Params must have the property \"repo\"" }), headers);
	}
}
