/**
 * @description Hides the full email address and shows only the first 2 characters, and the last 1 characters.
 * @param email
 * @returns {string|*}
 */
export const maskEmail = (email) => {
  if (email.includes("*") || email === "") {
    return email;
  } // Splits the email into two parts

  const maskedEmail = email.split("@");
  return `${maskedEmail[0].slice(0, 2)}**${maskedEmail[0].slice(-1)}@${
    maskedEmail[1]
  }`;
};

/**
 * @description Hides the full username and shows only the first 2 characters, and the last 1 characters.
 * @param username
 * @returns {string|*}
 */
export const maskUsername = (username) => {
  if (username.includes("*") || username === "") {
    return username;
  } // Splits the email into two parts

  return `${username.slice(0, 2)}**${username.slice(-1)}`;
};