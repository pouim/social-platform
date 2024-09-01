/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/content",
        permanent: true, // Set this to `false` if you plan to change it in the future.
      },
    ];
  },
};

export default nextConfig;
