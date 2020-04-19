import propTypes from 'prop-types';
import React, { useState, useContext, useCallback, useMemo } from 'react';

const BagDisplayContext = React.createContext();
const BagControllerContext = React.createContext();

function BagDisplayProvider({ children }) {
  const [isBagOpen, setBagOpen] = useState(false);

  const showBag = useCallback(() => {
    setBagOpen(true);
  }, []);

  const closeBag = useCallback(() => {
    setBagOpen(false);
  }, []);

  const controllers = useMemo(
    () => ({
      showBag,
      closeBag,
    }),
    [showBag, closeBag]
  );

  return (
    <BagControllerContext.Provider value={controllers}>
      <BagDisplayContext.Provider value={isBagOpen}>{children}</BagDisplayContext.Provider>
    </BagControllerContext.Provider>
  );
}

BagDisplayProvider.propTypes = {
  children: propTypes.oneOfType([propTypes.node.isRequired, propTypes.arrayOf(propTypes.node)])
    .isRequired,
};

function useBagDisplay() {
  const context = useContext(BagDisplayContext);
  if (context === undefined) {
    throw new Error(`useBagDisplay must be used within a BagDisplayProvider`);
  }
  return context;
}

function useBagController() {
  const context = useContext(BagControllerContext);
  if (context === undefined) {
    throw new Error(`useBagController must be used within a BagControllerProvider`);
  }
  return context;
}

export {
  BagDisplayProvider,
  useBagDisplay,
  useBagController,
  BagControllerContext,
  BagDisplayContext,
};
