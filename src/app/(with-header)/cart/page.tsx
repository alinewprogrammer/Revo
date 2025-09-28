import { Heading } from "@/components/Heading";
import CartList from "./CartList";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl ~px-4/6 ~py-6/10">
      <Heading as="h1" size="sm" className="mb-6 mt-0">
        Your cart
      </Heading>
      <CartList />
    </div>
  );
}
