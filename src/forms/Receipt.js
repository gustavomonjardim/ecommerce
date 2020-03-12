import { navigate } from 'gatsby';
import propTypes from 'prop-types';
import React from 'react';

import Button from '../components/Button';
import Separator from '../components/Separator';
import { currencyMask } from '../services/maskService';

function Receipt({ receipt }) {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold tracking-wide leading-tight pb-8">
        Compra concluída com sucesso!
      </h2>
      <Separator />

      <h4 className="font-semibold text-lg text-center mb-2">Produtos</h4>
      <div className="w-full h-80 overflow-y-scroll">
        {receipt.bag.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Separator />

      <div className="w-full">
        <h4 className="font-semibold text-lg text-center mb-2">Divisão do pagamento</h4>
        {Object.keys(receipt.payables)
          .filter(key => key !== 'fees' && key !== 'platform')
          .map(recipient => (
            <Recipient
              key={recipient}
              recipient={receipt.sellers[recipient]}
              value={currencyMask(receipt.payables[recipient] / 100)}
            />
          ))}
        <Recipient recipient="Plants" value={currencyMask(receipt.payables.platform / 100)} />
        <Recipient recipient="Taxas" value={currencyMask(receipt.payables.fees / 100)} />
      </div>
      <Separator />

      <div className="w-full flex flex-row justify-between">
        <span className="font-semibold text-lg">Total</span>
        <span className="font-semibold text-lg text-green-600">
          {currencyMask(receipt.totalValue)}
        </span>
      </div>

      <div className="w-full mt-8">
        <Button text="Shop more" onClick={() => navigate('/')} />
      </div>
    </div>
  );
}

function Product({ product }) {
  return (
    <div className="w-full flex flex-row py-2 mb-4">
      <div className="relative w-32">
        <img
          className="absolute h-full w-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="w-full flex flex-col ml-4">
        <span className="font-semibold text-lg text-gray-700">{product.name}</span>
        <span className="text-sm text-gray-700">
          {`${product.quantity} ${product.quantity === 1 ? 'unidade' : 'unidades'}`}
        </span>
        <span className="my-2 font-semibold text-md text-gray-800">
          {currencyMask(product.price)}
        </span>
        <span className="text-gray-600 text-sm">
          Vendido por <span className="font-semibold">{product.seller.name}</span>
        </span>
      </div>
    </div>
  );
}

function Recipient({ recipient, value }) {
  return (
    <div className="w-full flex flex-row justify-between">
      <span className="text-gray-600 text-sm">{recipient}</span>
      <span className="text-gray-700 text-sm font-semibold">{value}</span>
    </div>
  );
}

Receipt.propTypes = {
  receipt: propTypes.shape({
    bag: propTypes.arrayOf(propTypes.shape).isRequired,
    sellers: propTypes.shape.isRequired,
    payables: propTypes.shape.isRequired,
    totalValue: propTypes.number.isRequired,
  }).isRequired,
};

Product.propTypes = {
  product: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    image: propTypes.string.isRequired,
    seller: propTypes.shape.isRequired,
    quantity: propTypes.number.isRequired,
  }).isRequired,
};

Recipient.propTypes = {
  recipient: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
};

export default Receipt;
