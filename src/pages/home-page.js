import React from 'react';
import { HeroBanner } from '../components/hero-banner';
import { PageLayout } from '../components/page-layout';
import { BrewerySearch } from '../components/brewery-search';
import '../styles/components/brewery-search.css';

export const HomePage = () => {
  return (
    <PageLayout>
      <HeroBanner />
      <BrewerySearch />
    </PageLayout>
  );
};
