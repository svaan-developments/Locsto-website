export class Constants {
  // Testing URL for
  static BaseURL = "https://erpserver.tazk.in/locstoUser/";
  static BaseURL_Product = "https://erpserver.tazk.in/locstoProduct/";
}

export class ApiEndPoints {
  static nearbyshops = "nearbyshops";
  static getCompanyProfile(companyId, personId) {
    return `companyProfile/${companyId}/${personId}`;
  }
  static Follow_profile = "follow/?type=follow";

  // Products
  static Seacrch_products = "searchproducts?page=0&per_page=100";
  static Trending_Products = "trending?user_id=&page=0&per_page=100";
  static getItemsUrl(companyId) {
    return `items/${companyId}?page=0&per_page=100`;
  }
}
