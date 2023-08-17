export async function getDID(handle) {
	let did;

	try {
		did = await Deno.resolveDns(`_atproto.${handle}`, "TXT");
	} catch {
		did = await fetch(`https://${handle}/.well-known/atproto-did`).then(res => res.text());
	}

	// if did comes from TXT record, strip from array and format
	if (typeof did === "object") {
		did = did[0][0].replace("did=", "").replace("\n", "");
	}

	return did;
}
