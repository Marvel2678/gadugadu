jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
