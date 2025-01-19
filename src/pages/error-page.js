import React from "react";
import { PageLayout } from "../components/page-layout";
import { useLocation } from 'react-router-dom';

export const ErrorPage = () => {
  const location = useLocation();
  const { state } = location;
  const { errorCode, errorMessage } = state || {};

  return (
    <PageLayout>
      <div className="content-layout">
        <div>
          <h1>Error {errorCode}</h1>
          <p>{errorMessage}</p>
        </div>
      </div>
    </PageLayout>
  );
};
