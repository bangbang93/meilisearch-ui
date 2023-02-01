import type { FC, ReactNode } from 'react';
import { createEmotionCache, DefaultMantineColor, MantineProvider, Tuple } from '@mantine/core';
import theme from '@/src/style/theme.json';
import _ from 'lodash';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

type CustomColors = 'brand';
type ExtendedCustomColors = CustomColors | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

const myCache = createEmotionCache({ key: 'mantine' });

type Props = {
  children: ReactNode;
};

export const MantineUIProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider
      emotionCache={myCache}
      withNormalizeCSS
      theme={{
        colors: _.pick(theme.colors as unknown as Record<CustomColors, Tuple<string, 10>>, 'brand'),
        primaryColor: 'brand',
      }}
    >
      <ModalsProvider
        modalProps={{
          centered: true,
          lockScroll: true,
          overflow: 'inside',
          shadow: 'xl',
          radius: 'lg',
          padding: 'xl',
          overlayOpacity: 0.3,
        }}
      >
        <NotificationsProvider>{children}</NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};
