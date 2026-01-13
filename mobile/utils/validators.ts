export function PasswordValidator(password: string) {
  if (password.length < 8) {
    return "Hasło musi mieć minimum 8 znaków";
  }

  if (!/[a-z]/.test(password)) {
    return "Hasło musi zawierać małą literę";
  }

  if (!/[A-Z]/.test(password)) {
    return "Hasło musi zawierać wielką literę";
  }

  if (!/\d/.test(password)) {
    return "Hasło musi zawierać cyfrę";
  }
  if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    )
  ) {
    return "Hasło musi zawierać jeden znak specjalny";
  }
  return null; // OK
}

export function EmailValidator(email: string) {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Podany adres email nie jest poprawny";
  }
  return null;
}
