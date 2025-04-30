import { type JwtPayload, jwtDecode } from 'jwt-decode';

// import jwtDecode from 'jwt-decode';
// import { type JwtPayload } from 'jwt-decode';
interface ExtendedJwt extends JwtPayload {
  data:{
    username:string,
    email:string,
    _id:string
  }
};

class AuthService {
  getProfile() {
    return jwtDecode<ExtendedJwt>(this.getToken());
  }
// Checks if user is logged in
  // * @returns {boolean} - True if user is logged in, false otherwise
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  // Checks if token is expired
  // * @param {string} token - The JWT token to check
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

// Retrieves the username from the token
// Retrieves the token from local storage
  // * @returns {string} - The JWT token
  // * @throws {Error} - Throws an error if the token is not found
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  // Saves the token to local storage
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }
  // Removes the token from local storage
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
