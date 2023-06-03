import { BasicLayout } from "@/layouts";
import { DetailProduct, FooterApp, Separator } from "@/components";
import { Footer } from "@/components";

export default function ProductPage(props) {
  const { product, relate } = props;

  return (
    <div>
      <BasicLayout>
        <Separator />
        <Separator />
        <DetailProduct product={product} relate={relate} />
        <FooterApp />
        <Footer />
      </BasicLayout>
    </div>
  );
}
