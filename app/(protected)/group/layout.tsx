export default function GroupLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  // Auth check is handled by parent (protected) layout
  return (
    <>
      {children}
      {modal}
    </>
  );
}
