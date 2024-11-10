import { Container } from "./container";

export const Footer = () => {
  return (
    <header className="mt-12 mb-12">
      <Container className="flex justify-between gap-4 ">
        <p className="text-sm">
          Invoicipedia &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm">
          Created by Colby FAyock with Next.js,, Xata, and Clerk
        </p>
      </Container>
    </header>
  );
};
