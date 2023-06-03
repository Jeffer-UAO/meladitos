import { Footer, Contact, Separator } from "@/components";
import { BasicLayout } from "../../layouts";

export default function ContactHome() {
  return (
    <>
      <BasicLayout>
        <Separator />
        <Contact />

        <Footer />
      </BasicLayout>
    </>
  );
}
