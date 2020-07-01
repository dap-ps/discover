// TS complains but webpack finds it fine
//@ts-ignore
import InterRegularWoff2 from './Inter-Regular.woff2';
export const Inter = {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('Inter'),
    local('Inter-Regular'),
    url(${InterRegularWoff2}) format('woff2')
  `,
};

//@ts-ignore
import InterMediumWoff2 from './Inter-Medium.woff2';
export const InterMedium = {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  src: `
    local('Inter'),
    local('Inter-Bold'),
    url(${InterMediumWoff2}) format('woff2')
  `,
};

//@ts-ignore
import InterBoldWoff2 from './Inter-Bold.woff2';
export const InterBold = {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  src: `
    local('Inter'),
    local('Inter-Bold'),
    url(${InterBoldWoff2}) format('woff2')
  `,
};
