import React from "react";
import Head from "next/head"
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import Particles from "react-tsparticles";

interface Props { }

const Layout = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col justify-between w-full h-screen ">
      <Head>
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
        <title>MetaRock</title>
      </Head>
      <Navbar />
      <div className="container px-4 mx-auto mb-auto sm:px-8 lg:px-16 xl:px-20">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
