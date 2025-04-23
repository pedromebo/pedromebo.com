/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "pedromebo-website",
      home: "aws",
      region: "eu-west-1",
      providers: { aws: "6.77.1" },
    };
  },
  async run() {
    const site = new sst.aws.Nextjs("MySite", {
      path: ".",
    });

    return {
      outputs: {
        SiteUrl: site.url,
      },
    };
  },
});
