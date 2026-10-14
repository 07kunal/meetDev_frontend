import AppRoutes from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import AppStore from "./utils/store/AppStore";
import { GlobalLoader } from "./components/Loader/GlobalLoader";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Provider store={AppStore}>
        <QueryClientProvider client={queryClient}>
          <GlobalLoader />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                padding: "18px",
                color: "white",
                background:"green"
              },
            }}
          />
          <AppRoutes />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
