import React, { useState } from 'react';

import Layout from '../components/Layout';
import TextInput from '../components/TextInput';

const Checkout = () => {
  const [name, setName] = useState('Gustavo');

  return (
    <Layout>
      <TextInput id="name" placeholder="Nome" label="Nome" value={name} onChange={setName} />
    </Layout>
  );
};

export default Checkout;
