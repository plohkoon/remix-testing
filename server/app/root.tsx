import { json, type LoaderFunction, type LinksFunction, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Footer from "./components/footer";
import Header from "./components/header";
import styles from "./styles.css";
import { prismaClient } from "./utils/prisma.server";

export const links: LinksFunction = () => [
  {
    as: "style",
    rel: "stylesheet preload",
    href: styles,
    type: "text/css"
  }
]

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async () => {
  const count = await prismaClient.user.count();
  const user = await prismaClient.user.findFirst({
    take: 1,
    skip: Math.floor(Math.random() * count)
  })

  return json({ user })
}

export default function App() {
  const { user } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <Header name={user.name} profileUrl={user.avatar} />
          <Outlet />
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
