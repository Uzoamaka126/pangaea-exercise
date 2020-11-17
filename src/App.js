import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import Products from "./pages/Products";
import store from "./redux/store";

function App() {
  const client = new ApolloClient({
    uri: "https://pangaea-interviews.now.sh/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Products />
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
