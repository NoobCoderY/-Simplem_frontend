import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./component/Login/Login";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Signup from "./component/Signup/Signup";
import DashBoard from "./component/Dashboard/DashBoard";
import EditProfile from "./component/Dashboard/EditProfile";
import { useAppDispatch, useAppSelector } from "../src/Redux/Store";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
    credentials:"include"
  });

  const User = useAppSelector((state) => state.User);
  const PrivateRoute = ({ children }: any) => {
    if (User._id) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/profile"
            element={
              // <PrivateRoute>
                
                <DashBoard />
              // </PrivateRoute>
            }
          />
          <Route path="/editprofile/:id" element={<EditProfile />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
