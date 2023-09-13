import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductTable from "@/components/ui/product-table";

export default function Home() {
  return (
    <>
      <nav className="w-full h-14 flex items-center border-b-2 border-b-black">
        <div className="max-w-2xl mx-auto w-full">
          <div className="brand-title">
            <p className="text-lg font-bold">Brik Shop.</p>
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto w-full py-8">
        <div className="card-content grid grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">50 Product</CardTitle>
              <CardDescription>Total Product</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="main-content mt-8">
          <ProductTable />
        </div>
      </main>
    </>
  );
}
