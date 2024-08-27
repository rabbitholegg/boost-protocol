'use client';
import { Box, Flex } from '@chakra-ui/react';

import { BoostList, Header, MainPane } from '@/components';

export default function Home() {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header />

      <Box as="main" flex={1} p={4}>
        <MainPane />
        <BoostList />
      </Box>
    </Flex>
  );
}
