import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { HomePage } from "./pages/home-page";
import { ErrorPage } from "./pages/error-page";
import { ProfilePage } from "./pages/profile-page";
import { BreweriesPage } from "./pages/breweries-page";
import { BreweryPage } from "./pages/brewery-page";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/breweries" element={<BreweriesPage />} />
      <Route path="/breweries/:id" element={<BreweryPage />} />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
