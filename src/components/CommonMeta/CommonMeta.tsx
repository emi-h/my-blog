import Head from "next/head";
import { FC } from "react";

export const CommonMeta: FC<{ title?: string; description?: string }> = ({
  title = "Home | console.log(emi);",
  description = "A web developer Emi's blog",
}) => {
  return (
    <Head>
      <title>{title} | console.log(emi);</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="google-site-verification"
        content="oaoDilvZZWm-FMZwrbaRdNwtLq0U_aggrBZS-FImnqc"
      />
    </Head>
  );
};
