import React from "react";
import { Header, Sidebar } from "@src/components";
import { css, k } from "@kuma-ui/core";
export const metadata = {
  title: "Kuma UI - Zero-Runtime CSS-in-JS with type-safe utility props",
  description:
    "Kuma UI is a utility-first, zero-runtime CSS-in-JS library that offers an outstanding developer experience and optimized performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <k.div
          display="grid"
          gridTemplateRows="auto 1fr auto"
          gridTemplateColumns="100%"
          minHeight="100vh"
        >
          <Header />
          <k.div className={flexRow} maxWidth={1200} mx="auto" width="100%">
            <Sidebar />
            <main>{children}</main>
          </k.div>
        </k.div>
      </body>
    </html>
  );
}

const flexRow = css({
  display: "flex",
  flexDir: "row",
});