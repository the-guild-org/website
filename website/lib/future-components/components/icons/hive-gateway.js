import { jsx, jsxs } from 'react/jsx-runtime';

const SvgHiveGateway = props =>
  /* @__PURE__ */ jsxs('svg', {
    width: 52,
    height: 53,
    viewBox: '0 0 52 53',
    fill: 'currentColor',
    ...props,
    children: [
      /* @__PURE__ */ jsxs('defs', {
        children: [
          /* @__PURE__ */ jsx('path', {
            id: 'hive-gateway-path',
            d: 'm25 .524872-7.7758.000001V13.6981c0 2.2382-1.8128 4.051-4.0509 4.051H0l7.2e-7 7.7758H8.48411c1.06096 0 2.07849-.4215 2.82859-1.1718l12.5159-12.5176C24.5786 11.0854 25 10.068 25 9.00727V.524872Zm2 0 7.7758.000001V13.6981c0 2.2382 1.8128 4.051 4.0509 4.051H52v7.7758h-8.4841c-1.061 0-2.0785-.4215-2.8286-1.1718L28.1714 11.8355C27.4214 11.0854 27 10.068 27 9.00727V.524872ZM25 52.5249h-7.7758V39.3516c0-2.2381-1.8128-4.0509-4.0509-4.0509H0l7.2e-7-7.7758H8.48411c1.06096 0 2.07849.4215 2.82859 1.1717l12.5159 12.5176c.75.7502 1.1714 1.7675 1.1714 2.8283v8.4824Zm2 0h7.7758V39.3516c0-2.2381 1.8128-4.0509 4.0509-4.0509H52v-7.7758h-8.4841c-1.061 0-2.0785.4215-2.8286 1.1717L28.1714 41.2142c-.75.7502-1.1714 1.7675-1.1714 2.8283v8.4824Zm2.8369-29.837H22.163v7.6739h7.6739v-7.6739Z',
          }),
          /* @__PURE__ */ jsx('clipPath', {
            id: 'hive-gateway-clip-path',
            children: /* @__PURE__ */ jsx('use', { href: '#hive-gateway-path' }),
          }),
        ],
      }),
      /* @__PURE__ */ jsx('use', {
        href: '#hive-gateway-path',
        clipPath: 'url(#hive-gateway-clip-path)',
      }),
    ],
  });
export { SvgHiveGateway as ReactComponent };
