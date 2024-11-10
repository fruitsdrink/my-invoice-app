import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container } from "./container";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center gap-4 ">
          <div className="flex items-center gap-4">
            <Link href={"/dashboard"}>
              <h1 className="font-bold">Invoiceipedia</h1>
            </Link>
            <span className="text-slate-300">/</span>
            <SignedIn>
              <span className="-ml-2">
                <OrganizationSwitcher
                  afterCreateOrganizationUrl={"/dashboard"}
                  afterSelectOrganizationUrl={"/dashboard"}
                  afterSelectPersonalUrl={"/dashboard"}
                  afterLeaveOrganizationUrl="/"
                />
              </span>
            </SignedIn>
          </div>

          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};
