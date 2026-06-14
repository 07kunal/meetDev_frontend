import AppRoutes from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import appStore from "./components/utils/store/AppStore";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={appStore}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
