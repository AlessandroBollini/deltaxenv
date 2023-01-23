const nfts=require("./getTokenId");
require("dotenv").config();

nfts.getData(process.env.WALLET,"0x5157e60ae90e3a9af8a3828accab9a8ff9fcbf97");