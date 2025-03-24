export const useApiBasePath = (): string => {
  const missingEnvVariables =
    !process.env.NEXT_PUBLIC_API_URL ||
    !process.env.NEXT_PUBLIC_API_VERSION_PREFIX;
  if (missingEnvVariables) {
    console.error({
      vars: {
        base_url: process.env.NEXT_PUBLIC_API_URL,
        version: process.env.NEXT_PUBLIC_API_VERSION_PREFIX,
      },
    });
    throw Error(
      "Missing either NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_VERSION_PREFIX variable",
    );
  }
  return (
    process.env.NEXT_PUBLIC_API_URL! +
    process.env.NEXT_PUBLIC_API_VERSION_PREFIX!
  );
};
