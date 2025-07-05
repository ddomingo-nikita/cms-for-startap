import {create} from 'zustand'
import {register, login} from "../consts/apiRoutes.js";

const useSignUpStore = create((set) => ({
  isLoading: false,
  error: null,
  user: null,
  jwt: null,

  signUp: async (userData, userType) => {
    set({ isLoading: true, error: null });
    try {
      const { username, email, password } = userData;
      const registerResponse = await fetch(register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!registerResponse.ok) {
        throw new Error('Initial registration failed');
      }

      const { user: createdUser, jwt } = await registerResponse.json();
      set({jwt: jwt});
      const updateResponse = await fetch(currentUserUrl(createdUser.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          ...userData,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('User data update failed');
      }

      const updatedUser = await updateResponse.json();
      set({ user: updatedUser, isLoading: false });
      return updatedUser;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      set({ user: data.user, isLoading: false });
      return data.user;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  resetSignUp: () => set({ isLoading: false, error: null, user: null }),

  logout: () => {
    set({ user: null, jwt: null, error: null });
  },
}));

export default useSignUpStore;
