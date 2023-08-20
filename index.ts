import * as xrpc from 'https://esm.sh/@atproto/xrpc-server';
import express from 'https://esm.sh/express';

// create xrpc server
const server = xrpc.createServer([{
    lexicon: 1,
    id: 'net.fjall.main',
    defs: {
      main: {
        type: 'query',
        parameters: {
          type: 'params',
          properties: { response: { type: 'string' } },
        },
        output: {
          encoding: 'application/json',
        },
      },
    },
  }
]);

function main(_ctx: {auth: xrpc.HandlerAuth | undefined, params: xrpc.Params, input: xrpc.HandlerInput | undefined, req: express.Request, res: express.Response}) {
  return { encoding: 'application/json', body: {response: "⛰️" }}
}

server.method('net.fjall.main', main);

const app = express();
app.use(server.router);
app.listen(80);
