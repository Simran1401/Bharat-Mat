export class ProductDepthDetails {
  constructor(
    public id: number,
    public name: string,
    public categroy: string,
    public image1: string,
    public image2: string,
    public image3: string,
    public image4: string,
    public price: number,
    public discount: any,
    public description: string,
    public reviews: {
      user_name: string,
      rate: number,
      description: string
    }[]
  ) { }
}
