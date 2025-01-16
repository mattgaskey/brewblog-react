import React from 'react';
import { PageLayout } from '../components/page-layout';
import { BreweriesList } from '../components/breweries-list';

export const BreweriesPage = () => {
  return (
    <PageLayout>
      <div className="content-layout">
        <div className="content__body">
          <BreweriesList />
        </div>
      </div>
    </PageLayout>
  );
};
