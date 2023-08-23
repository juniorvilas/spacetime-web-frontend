export const queryClientOptions = {
    defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 30000, // 30s
          cacheTime: 10 * (60 * 1000), // 10 mins
        },
      },
  };