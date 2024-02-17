import { RegisterFormData } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";


export const register = async(formData: RegisterFormData)=>{
  const response = await fetch(`${API_BASE_URL}/api/users/register`,{
    method:'POST',
    credentials:'include',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const responseBody = await response.json();

  if(!response.ok){
    throw new Error(responseBody.message)
  }
};

//sign in endpoint
export const signIn = async (formData: SignInFormData)=>{
  const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
    method:'POST',
    credentials:'include',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
  });

  const responseBody = await response.json();

  if(!response.ok){
    throw new Error(responseBody.message)
  };

  return responseBody;
}

//validtate token endpoint
export const validateToken = async ()=>{
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
    credentials:'include'
  });

  if(!response.ok){
     throw new Error('Invalid Token')
  }

  return response.json();
};

//Logout endpoint
export const logout = async()=>{
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
    credentials:"include",
    method:'POST'
  });

  if(!response.ok){
    throw new Error('Error during logout')
  }
};

