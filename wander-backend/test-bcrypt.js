const bcrypt = require('bcryptjs');

const runTest = async () => {
  const plainPassword = 'maroosha2005';

  // Simulate password hashing
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log('Hashed password:', hashedPassword);

  // Simulate login comparison
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Password match result:', isMatch ? '✅ Match' : '❌ Mismatch');
};

runTest();

