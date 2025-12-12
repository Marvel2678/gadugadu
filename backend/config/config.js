export default async function SetupForServer() {
  let param;
  process.argv.forEach((value) => {
    if (value == "dev") {
      return (param = ".env.development");
    }
  });
  return (param = ".env.development");
}
