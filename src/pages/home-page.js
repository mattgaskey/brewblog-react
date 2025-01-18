import React, { useState } from 'react';
import { HeroBanner } from '../components/hero-banner';
import { PageLayout } from '../components/page-layout';
import { BrewerySearch } from '../components/brewery-search';
import { BrewerySearchResults } from '../components/brewery-search-results';
import '../styles/components/brewery-search.css';
import '../styles/components/brewery-search-results.css';

export const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <PageLayout>
      <HeroBanner />
      <BrewerySearch setSearchResults={setSearchResults} />
      <BrewerySearchResults breweries={searchResults} />
    </PageLayout>
  );
};
