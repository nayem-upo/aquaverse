import ProductDetail from "@/app/components/ProductDetail";

export default function ProductPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return <ProductDetail id={id} />;
}
