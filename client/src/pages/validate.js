export const validateForm = (username, email, password, confirmPassword) => {
    if (!username || !email || !password || !confirmPassword) {
      return "All fields are required";
    }
  
    if(username.length < 3) {
      return "Username must be at least 3 characters long";
    }

    if(username.length > 15) {
      return "Username must be at most 15 characters long";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      return "Invalid email format";
    }
  
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordPattern)) {
      return "Password must be at least 8 characters long and contain both letters and numbers";
    }
  
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
  
    return "valid";
  }