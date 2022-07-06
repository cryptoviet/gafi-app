import { render, screen } from '@testing-library/react';

import Banner from '../components/Banner';

describe('Render banner', () => {
  beforeEach(() => {
    render(
      <Banner
        title="deploy contract"
        subTitle="Description"
        bannerBg="/assets/layout/deploycontract-banner.png"
        btnLink="https://wiki.gafi.network/learn/demo"
      />
    );
  });
  it('display correctly title', () => {
    const title = screen.getByTestId('title');
    expect(title.innerHTML).toBe('deploy contract');
  });
  it('display correctly subTitle', () => {
    const subTitle = screen.getByTestId('sub-title');
    expect(subTitle.innerHTML).toBe('Description');
  });
  it('button redirect correctly', () => {
    const showMoreButton = screen.getByTestId('show-more-button');
    expect(showMoreButton.getAttribute('href')).toBe(
      'https://wiki.gafi.network/learn/demo'
    );
  });
});
