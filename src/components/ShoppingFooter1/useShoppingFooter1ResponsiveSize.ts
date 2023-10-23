/**********************************************************************
 *
 *   Responsiveness hook generated by Quest
 *
 *   Responsive Logic for the component goes in this hook
 *   If you want to customize the min/max values for the breakpoints, open the component on Quest Editor.
 *
 *   For help and further details refer to: https://www.quest.ai/docs
 *
 *
 **********************************************************************/

import React from 'react';

const useShoppingFooter1ResponsiveSize = () => {
  const [variant, setVariant] = React.useState<string>('Property1desktop');

  React.useEffect(() => {
    const handlerProperty1Mobile = (e) =>
      setVariant((size: string) => (e.matches ? 'Property1Mobile' : size));
    const Property1MobileSize = window.matchMedia('(max-width: 572px)');
    setVariant((size: string) =>
      Property1MobileSize.matches ? 'Property1Mobile' : size
    );
    Property1MobileSize.addEventListener('change', handlerProperty1Mobile);

    const handlerProperty1Tablet = (e) =>
      setVariant((size: string) => (e.matches ? 'Property1Tablet' : size));
    const Property1TabletSize = window.matchMedia(
      '(min-width: 572px) and (max-width: 1104px)'
    );
    setVariant((size: string) =>
      Property1TabletSize.matches ? 'Property1Tablet' : size
    );
    Property1TabletSize.addEventListener('change', handlerProperty1Tablet);

    const handlerProperty1desktop = (e) =>
      setVariant((size: string) => (e.matches ? 'Property1desktop' : size));
    const Property1desktopSize = window.matchMedia('(min-width: 1104px)');
    setVariant((size: string) =>
      Property1desktopSize.matches ? 'Property1desktop' : size
    );
    Property1desktopSize.addEventListener('change', handlerProperty1desktop);
  }, []);

  return variant;
};

export default useShoppingFooter1ResponsiveSize;
