/** @type {import('next').NextConfig} */

let ENV = {};
switch (process.env.NEXT_PUBLIC_AMB) {
  case "local": {
    ENV = {
      baseURL: "http://localhost:8081",
    };
    break;
  }
  case "dev": {
    ENV = {
      baseURL: "http://localhost:8081",
    };
    break;
  }
  default:
    ENV = {
      baseURL: "http://localhost:8081",
    };
}

const nextConfig = {
  env: {
    ...ENV,
  },
  output: "standalone",
  trailingSlash: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.iconpacks.net",
          pathname: "**",
        },
      ],
      // domains: ["www.iconpacks.net"],
    },
}

module.exports = nextConfig
