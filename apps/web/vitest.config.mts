import { defineConfig, mergeConfig } from 'vitest/config';
import { config } from '@nexusrealm/config/vitest/react';

export default mergeConfig(
  config,
  defineConfig({
    test: {
      server: {
        deps: {
          inline: ['next', 'next/image', 'next/font'],
        },
      },
    },
  })
);
