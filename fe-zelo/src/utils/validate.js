export class validate{
    static email(mail){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            return true;
        }
        return false;
    }
    static password(pass) {
        // Regular expressions for uppercase, lowercase and special characters
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      
        if (
          pass.length >= 8 &&
          upperCaseRegex.test(pass) &&
          lowerCaseRegex.test(pass) &&
          specialCharRegex.test(pass)
        ) {
          return true;
        }
        return false;
      } 
      static fullname(name) {
        // Regular expression for fullname
        const fullnameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)+$/;
    
        if (fullnameRegex.test(name)) {
          return true;
        }
        return false;
      }
}