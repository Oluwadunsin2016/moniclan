/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FiSearch, FiHeart, FiStar } from 'react-icons/fi';
import { countries } from '../libs/constants';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import CountryFlag from '../components/ui/CountryFlag';

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [wishlist, setWishlist] = useState([]);
  const uniqueCountries = Array.from(new Map(countries.map(c => [c.code, c])).values());
  const [selectedCountry, setSelectedCountry]=useState(uniqueCountries[2])
  console.log(selectedCountry);
 

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones',
      price: 129.99,
      category: 'Electronics',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      category: 'Clothing',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      price: 199.99,
      category: 'Electronics',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    },
    {
      id: 4,
      name: 'Genuine Leather Wallet',
      price: 49.99,
      category: 'Accessories',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?w=500',
    },
    {
      id: 5,
      name: 'Ceramic Coffee Mug Set',
      price: 24.99,
      category: 'Home',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500',
    },
    {
      id: 6,
      name: 'Hardcover Recipe Book',
      price: 19.99,
      category: 'Books',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    },
    {
      id: 7,
      name: 'Yoga Mat (Non-Slip)',
      price: 34.99,
      category: 'Fitness',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    },
    {
      id: 8,
      name: 'Vitamin C Serum',
      price: 27.99,
      category: 'Beauty',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    },
    {
      id: 9,
      name: 'Bluetooth Portable Speaker',
      price: 89.99,
      category: 'Electronics',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
    },
    {
      id: 10,
      name: 'Denim Jeans (Slim Fit)',
      price: 59.99,
      category: 'Clothing',
      rating: 4.1,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    },
    {
      id: 11,
      name: 'Stainless Steel Water Bottle',
      price: 22.99,
      category: 'Outdoors',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    },
    {
      id: 12,
      name: 'Wireless Phone Charger',
      price: 18.99,
      category: 'Electronics',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    },
    {
      id: 13,
      name: 'Aromatherapy Diffuser',
      price: 32.99,
      category: 'Home',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=500',
    },
    {
      id: 14,
      name: 'Running Shoes',
      price: 79.99,
      category: 'Footwear',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500',
    },
    {
      id: 15,
      name: 'Canvas Backpack',
      price: 45.99,
      category: 'Accessories',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    },
    {
      id: 16,
      name: 'Organic Green Tea',
      price: 12.99,
      category: 'Food',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500',
    },
    {
      id: 17,
      name: 'Resistance Bands Set',
      price: 29.99,
      category: 'Fitness',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    },
    {
      id: 18,
      name: 'Wooden Desk Organizer',
      price: 39.99,
      category: 'Office',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1585637071663-799845ad5212?w=500',
    },
    {
      id: 19,
      name: 'Sunglasses (UV Protection)',
      price: 65.99,
      category: 'Accessories',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    },
    {
      id: 20,
      name: 'Indoor Plant (Snake Plant)',
      price: 34.99,
      category: 'Garden',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
    }
  ];

  const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Accessories', 'Books', 'Beauty'];

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Marketplace Header */}
        <div className='flex justify-between items-center gap-6'>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover amazing products from our community</p>
        </div>
        <div className="border rounded-lg">
                  <Countries selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} uniqueCountries={uniqueCountries} />
                </div>
        </div>

        {/* Search and Categories */}
        <div className="mb-8">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Full Width */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
              <span className="text-sm text-gray-500 ml-2">
                ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'})
              </span>
            </h2>
            <select 
              className="border rounded px-3 py-1.5 bg-white text-sm"
              onChange={(e) => console.log('Sort by:', e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">No products found matching your criteria</p>
              <button 
                className="mt-4 text-indigo-600 hover:underline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setPriceRange([0, 1000]);
                }}
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="relative h-[16rem] w-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
                    >
                      <FiHeart
                        className={
                          wishlist.includes(product.id) 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-gray-400'
                        }
                      />
                    </button>
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={
                              i < Math.floor(product.rating) 
                                ? 'fill-current' 
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.rating})
                      </span>
                    </div>
                    <p className="text-lg font-bold text-indigo-600 mt-auto">
                      ${product.price.toFixed(2)}
                    </p>
                    <button 
                      className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;



const Countries=( {uniqueCountries,selectedCountry,setSelectedCountry})=>{
      const [open, setOpen] = useState(false);
     
      

  return (
    <div>
           <Popover
                  isOpen={open}
                  onOpenChange={setOpen}
                  placement="bottom-end"
                  showArrow={true}
                  
                >
                  <PopoverTrigger>
                    <Button className="bg-inherit bordered">
                      <CountryFlag
                        rounded
                        code={selectedCountry?.code}
                        className=" rounded-md w-10 h-7"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
                    <div className="px-4 py-2 w-[200px] gap-4 grid grid-cols-1 overflow-y-scroll  custom-scrollbar">
                      {uniqueCountries?.map((country, index) => (
                          <Button
                            key={index}
                            onPress={() => {
                              setSelectedCountry(country);
                              setOpen(false);
                            }}
                            className={`flex flex-col h-11 gap-1 items-stretch rounded-md hover:bg-primary-500 hover:text-white ${country.code === selectedCountry.code && "border-2 border-primary-500"}
                            `}
                          >
                            <div className="flex flex-row gap-2 items-center">
                              <CountryFlag
                                rounded
                                code={country.code}
                                className="h-7 w-7"
                              />
                              <p className="text-sm font-medium">{country.name}</p>
                            </div>
                          </Button>
                        )
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
    </div>
  )
}