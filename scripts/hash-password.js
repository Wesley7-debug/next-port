// Run: node scripts/hash-password.js "your-password-here"
// This generates a bcrypt hash for the ADMIN_PASSWORD_HASH env variable

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.log("Usage: node scripts/hash-password.js <password>");
  console.log("Example: node scripts/hash-password.js mySecureAdminPass123");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nAdd this to your .env.local file:\n");
console.log("ADMIN_PASSWORD_HASH=" + hash);
console.log("\nAuthorized Admin Emails:");
console.log("ADMIN_EMAILS=admin@omnicargo.com,omnicargo.admin@gmail.com\n");
