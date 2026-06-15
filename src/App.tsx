import AppRoutes from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import AppStore from "./components/utils/store/AppStore";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Provider store={AppStore}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
