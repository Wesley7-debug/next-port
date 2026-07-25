// Run: node scripts/hash-password.js "your-password-here"
// This generates a bcrypt hash for the ADMIN_PASSWORD_HASH env variable

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  process.stderr.write("Usage: node scripts/hash-password.js <password>\n");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
process.stdout.write("\nAdd this to your .env.local file:\n\n");
process.stdout.write("ADMIN_PASSWORD_HASH=" + hash + "\n");
process.stdout.write("\nAuthorized Admin Emails:\n");
process.stdout.write(
  "ADMIN_EMAILS=admin@omnicargo.com,omnicargo.admin@gmail.com\n\n",
);
