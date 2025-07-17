/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductTabs = ({ product }: { product: any }) => {
  console.log(product);
  const howToUse = JSON.parse(product?.result?.details?.how_to_use);
  const benefits = JSON.parse(product?.result?.details?.benefits);
  //   const reviews = JSON.parse(product?.result?.details?.reviews);
  return (
    <div className="">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">How To Use</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="key-ingredients">Key Ingredients</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="p-4 h-[220px] block transition-all duration-300">
            <div>
              {howToUse.map((item: any, i: number) => (
                <div className="flex flex-col " key={i + 10}>
                  <h1 className="text-[16px] my-[8px] font-medium">
                    {i + 1}. {item}
                  </h1>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="benefits">
          <Card className="p-4 h-[220px] block transition-all duration-300">
            <div className="">
              {benefits.map((item: any, i: number) => (
                <div key={i + 20}>
                  <h1 className="text-[16px] font-medium">
                    {i + 1}. {item}
                  </h1>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="key-ingredients">
          <Card className="p-4 h-[220px] block transition-all duration-300">
            <div className="">{product?.result?.details?.key_ingredient}</div>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card className="h-[220px] transition-all duration-300 p-4">
            <h1>No reviews yet</h1>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
