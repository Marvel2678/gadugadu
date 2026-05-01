import { render } from "@testing-library/react-native";
import Login from "@/app/(auth)/login";
test("renderuje formularz logowania", () => {
  const { getByText, getByPlaceholderText } = render(<Login />);

  expect(getByText("Zaloguj się")).toBeTruthy();
  expect(getByPlaceholderText("np. janek123")).toBeTruthy();
  expect(getByPlaceholderText("••••••••")).toBeTruthy();
});
