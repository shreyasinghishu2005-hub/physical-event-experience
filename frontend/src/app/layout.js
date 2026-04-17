import "@/styles/globals.css";

export const metadata = {
  title: "Physical Event Experience Assistant",
  description: "AI-powered assistant for physical events"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
