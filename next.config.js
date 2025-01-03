/** @type {import('next').NextConfig} */

let ENV = {};
switch (process.env.NEXT_PUBLIC_AMB) {
  case "local": {
    ENV = {
      baseURL: "http://localhost:8090",//"https://transport-manager-back.vercel.app/", // "http://localhost:8080", //  "http://192.168.0.8:8080", //
    };
    break;
  }
  case "dev": {
    ENV = {
        baseURL: "https://transport-manager-back.vercel.app/", // "https://estock-backend-440615.rj.r.appspot.com",
    };
    break;
  }
  default:
    ENV = {
        baseURL: "https://transport-manager-back.vercel.app/",
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
