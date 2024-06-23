import { toXML } from "jstoxml";
import { OutputListProductsDto } from "../../../../usecase/product/list/dto /list-products.dto";

export class ProductPresenter {
  static listXML(data: OutputListProductsDto): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        products: {
          product: data.products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
          })),
        },
      },
      xmlOption
    );
  }
}
