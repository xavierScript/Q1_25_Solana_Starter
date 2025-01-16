import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../cluster1/wallet/dev-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("dUHiv6XBB34Te8X82pw2Eo397VNLpnY44pzFFDB7nfb");

// Recipient address
const to = new PublicKey("AsAduBWNpjJXvW2mN1PXKM1CuHeNYapQQ2VCjZpq9Hbq");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it

    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    // Get the token account of the toWallet address, and if it does not exist, create it

    const ata1 = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );
    // Transfer the new token to the "toTokenAccount" we just created

    const tx = await transfer(
      connection,
      keypair,
      ata.address,
      ata1.address,
      keypair,
      1e6
    );
    console.log(`Transaction signature: ${tx}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
