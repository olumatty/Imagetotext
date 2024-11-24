import "./globals.css";

export const metadata = {
  title: "Text to Image",
  description: "Text to image app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
