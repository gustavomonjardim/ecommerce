import classNames from 'classnames';
import { navigate } from 'gatsby';
import propTypes from 'prop-types';
import React, { useEffect } from 'react';

import ArrowLeft from '../../assets/svg/ArrowLeft';
import { useBag } from '../../context/BagContext';
import { useBagController, useBagDisplay } from '../../context/BagDisplayContext';
import { currencyMask } from '../../services/maskService';
import BagItem from '../BagItem/BagItem';
import Button from '../Button';
import Separator from '../Separator';

import './styles.css';

const Overlay = ({ onClick, visible }) => {
  const handleKeyPress = event => {
    if (event.keyCode === 27) {
      onClick();
    }
  };

  return (
    <div
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label="overlay"
      className={classNames('fixed inset-0 bg-black z-10 transition-delay', {
        'block opacity-25': visible,
        'hidden opacity-0': !visible,
      })}
      onClick={onClick}
    ></div>
  );
};

Overlay.propTypes = {
  visible: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
};

const Bag = () => {
  const open = useBagDisplay();
  const { closeBag } = useBagController();
  const { bag, bagSize, totalValue } = useBag();

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  const goToCheckout = () => {
    closeBag();
    navigate('/checkout');
  };

  return (
    <>
      <div
        className={classNames(
          'transform fixed top-0 right-0 flex flex-col h-full min-h-screen max-h-screen w-full sm:max-w-sm z-20 bg-white px-4 py-6 transition-delay',
          { 'translate-x-0': open, 'translate-x-full': !open }
        )}
      >
        <div className="w-full flex flex-row justify-between pb-2">
          <button aria-label="Close bag" onClick={closeBag} className="h-6 w-6">
            <ArrowLeft />
          </button>
          <h4>Your Bag</h4>
          <span>{bagSize}</span>
        </div>
        <Separator />

        {bag?.length === 0 && (
          <div className="w-full max-w-lg flex flex-col flex-grow items-center justify-start mt-32">
            <span className="text-gray-800 text-md mb-6">
              Looks like there&apos;s nothing in your bag.
            </span>
            <Button text="Start shopping" onClick={() => navigate('/')}></Button>
          </div>
        )}

        {bag?.length > 0 && (
          <>
            <div data-testid="products" className="flex flex-col flex-grow overflow-y-scroll py-6">
              {bag.map(product => (
                <BagItem key={product.id} product={product} />
              ))}
            </div>

            <div className="w-full flex flex-col py-8">
              <div className="w-full flex flex-row justify-between">
                <span className="text-gray-600 text-sm">Subtotal</span>
                <span className="text-gray-700 text-sm font-semibold">
                  {currencyMask(totalValue)}
                </span>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span className="text-gray-600 text-sm">Shipping</span>
                <span className="text-gray-700 text-sm font-semibold">{currencyMask(0)}</span>
              </div>
              <Separator />
              <div className="w-full flex flex-row justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-green-600">{currencyMask(totalValue)}</span>
              </div>
            </div>
            <Button onClick={goToCheckout} text="Checkout" />
          </>
        )}
      </div>
      <Overlay visible={open} onClick={() => closeBag(false)} />
    </>
  );
};

export default Bag;
