import { type BskyUser } from "./lib/bskyUser.ts";
import bsky from "npm:@atproto/api";
const { AtpAgent } = bsky;

const jordan: BskyUser = { handle: "jordanreger.com", did: "did:plc:27rjcwbur2bizjjx3zakeme5" };
const agent = new AtpAgent({ service: "http://localhost:8000" });

const identity = await agent.com.atproto.identity.resolveHandle({ handle: jordan.handle });

console.log(identity);
