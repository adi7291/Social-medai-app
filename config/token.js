/**
 * JSON WEB TOKEN is self contained token that proves you are logged in without needing to send your password.
 * This long string has 3 parts separated by dots (.)
 * PART 1: HEADER [ Algorithm: HS256│ Type: JWT ]
 * PART 2: PAYLOAD [User ID: 61...  │ Issued At: ...  │ Expires: ...]
 * PART 3: SIGN   [SECRET encrypted]
 *
 * ---------------------
 * PROBLEM WITHOUT JWT
 * ----------------------
 * (SESSION BASED AUTHENTICATION)
 * ❌ User sends email & password with EVERY request
   ❌ Password sent over network repeatedly (security risk)
   ❌ Backend must query database for EVERY request 
   ❌ Slow & insecure
   ❌ No way to know when user logged out
   ❌ Stateful (server stores session data)

  ────────────── 
✓ WITH TOKEN:
  ──────────────
     Signup → Send email & password → Get token
     Create post → Send token only
     Like post → Send token only
     Token sent, not password ✓

----------------------------
  Where to Store Tokens
----------------------------
    OPTION 1: localStorage 
    ======================
       Browser storage that persists after closing tab.
    How to store:                                  
      localStorage.setItem('token', token); 
    How to retrieve:                                        
     const token = localStorage.getItem('token');
    PROS:                                                   
      ✓ Easy to use                                           
      ✓ Persists across tab/browser close                    
      ✓ Simple for frontend developers                        
      ✓ Works on mobile (React Native)  
    CONS:                                                   
      ✗ Vulnerable to XSS (Cross-Site Scripting)              
      ✗ Hacker can steal with: localStorage.getItem('token') 
      ✗ Any script on page can access it                      
      ✗ Not as secure   

    OPTION 2: sessionStorage
    ======================== 
    What is it?
    Browser storage that clears when tab closes.

    How to store?
    sessionStorage.setItem('token,token)

    PROS:
    Auto clear when tab is closed
    Easy to use.

    CONS:
    still vulnerable to XSS
    Clears when tab closes(bad Ux)

    Option3 HTTP-Only Cookie (Recommended)
    ======================================
    What is it?
    - Cookie stored by browser, not accessible from JS
    How backend sets it?
    res.cookie('token', token,{ httpOnly:true, // can't access from JS
                                secure:true,   // only over HTTPS
                                sameSite:true})// Prevent CSRF
    NOTE: Browser automatically includes includes in every request 

    PROS:
     - Protected from XSS (can't be stolen by JS)
     - Automatically sent with requests
     - Browser handle security
     - Easier for CSRF protection

    CONS:
    - Slightly harder to implement
    - More server side code needed
    - CORS/Credential required.

 */

import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    res.status(500).json({
      message: ` Token error ${error}`,
    });
  }
};

export default generateAccessToken;
