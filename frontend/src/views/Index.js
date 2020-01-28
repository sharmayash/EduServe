import withRoot from '../helpers/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from '../partials/ProductCategories';
import ProductSmokingHero from '../partials/ProductSmokingHero';
import AppFooter from '../partials/AppFooter';
import ProductHero from '../partials/ProductHero';
import ProductValues from '../partials/ProductValues';
import ProductHowItWorks from '../partials/ProductHowItWorks';
import ProductCTA from '../partials/ProductCTA';
import AppAppBar from '../partials/AppAppBar';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
