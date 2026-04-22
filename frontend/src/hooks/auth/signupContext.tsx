import { createContext, PropsWithChildren, useContext, useState } from 'react';

// data shape
type SignupData = {
  usage: 'employee' | 'manager' | null; // employee account or manager account
  name: string; // legal name
  dob: string; // date of birth
  phone: string; // phone number
  email: string; // email address
  user: string; // username
  password: string; // password
  business: string; // business name
  role: string; // individual role
  location: string; // business location
  rolesRaw: string; // comma separated string of roles
  roles: string[]; // list of all roles
};

type SignupContextType = {
  data: SignupData;
  updateSignupData: (fields: Partial<SignupData>) => void;
  resetSignup: () => void;
};

const initialData: SignupData = {
  usage: null,
  name: '',
  dob: '',
  phone: '',
  email: '',
  user: '',
  password: '',
  business: '',
  role: '',
  location: '',
  rolesRaw: '',
  roles: [],
};

export const SignupContext = createContext<SignupContextType>({
  data: initialData,
  updateSignupData: () => {},
  resetSignup: () => {},
});

export function useSignup() {
  return useContext(SignupContext);
}

export function SignupProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<SignupData>(initialData);

  const updateSignupData = (fields: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const resetSignup = () => {
    setData(initialData);
  };

  return (
    <SignupContext.Provider value={{ data, updateSignupData, resetSignup }}>
      {children}
    </SignupContext.Provider>
  );
}
