export const generateVerificationToken = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); 

export const verificationTokenExpiresAt = () => new Date(Date.now() + 24 * 60 * 60 * 1000);
