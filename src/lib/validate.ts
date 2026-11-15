// validate.ts file for password validation check

export const validatePassword = (pwd: string) =>{
  if(pwd.length < 6) return "Password must be at least 6 characters";
  if(!/[A-Z]/.test(pwd)) return "Password must contain an uppercase letter";
  if(!/[a-z]/.test(pwd)) return "Password must contain a lowercase letter";
  return null;
};