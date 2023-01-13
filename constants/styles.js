import { StyleSheet } from 'react-native';

export const colors = {
  background: '#121213',
  card: '#192734',
  interactive: '#22303C',
  primaryText: '#FFFFFF',
  secondaryText: '#8899A6',
  good: '#538d4e',
  medium: '#b59f3b',
  bad: '#3a3a3c',
  border: '#3a3a3c',
};

export const spacing = {
  small: '0.5rem',
  medium: '1rem',
  large: '3rem',
  xlarge: '4rem',
};

export const typography = {
  small: '1rem',
  medium: '1.5rem',
  large: '3rem',
  xlarge: '4rem',
}

export const commonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    gap: spacing.medium,
    justifyContent: 'center',
    padding: spacing.medium,
  },
  text: {
    color: colors.primaryText,
    fontSize: typography.medium,
  },
  input: {
    backgroundColor: colors.interactive,
    color: colors.primaryText,
    height: spacing.large,
    padding: spacing.small,
  },
});
