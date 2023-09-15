import Navbar from "../navbar";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl w-full mx-auto pt-20">{children}</div>
    </>
  );
}
