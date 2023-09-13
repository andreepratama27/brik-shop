import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductTable from "@/components/ui/product-table";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import AppWrapper from "./components/ui/app-wrapper";

export default function Home() {
  return (
    <AppWrapper>
      <main className="py-8">
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
    </AppWrapper>
  );
}
