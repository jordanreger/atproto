/**
 * A simple interface that allows you to create a user and access their handle or did by using `const user: BskyUser = { handle: "user.bsky.social" }`
 */

export interface BskyUser {
	handle?: string;
	did?: string;
}
