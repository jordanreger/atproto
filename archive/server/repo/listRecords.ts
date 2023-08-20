import headers from "../headers.ts";
// TODO: create error function

export default async function listRecords(repo: string, collection: string): Promise<Response> {
  if(!repo || !collection) {
    return new Response()
  }
}
