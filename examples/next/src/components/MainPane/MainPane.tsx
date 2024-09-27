// components/MainPane.tsx
import type { FC } from 'react';

import { useAccount } from 'wagmi';

import {
  Address,
  Balance,
  BlockNumber,
  BoostCoreInfo,
  Chain,
  Status,
} from './components';

const MainPane: FC = () => {
  const { isConnected } = useAccount();

  return (
    <section>
      <header>Display Info</header>

      <article>
        <Status />

        {isConnected && (
          <>
            <Address />
            <Chain />
            <Balance />
            <BlockNumber />
            <BoostCoreInfo />
          </>
        )}
      </article>
    </section>
  );
};

export default MainPane;
