// /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { FiSearch, FiHeart, FiStar } from 'react-icons/fi';
// import { countries } from '../libs/constants';
// import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
// import CountryFlag from '../components/ui/CountryFlag';

// const MarketplacePage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [wishlist, setWishlist] = useState([]);
//   const uniqueCountries = Array.from(new Map(countries.map(c => [c.code, c])).values());
//   const [selectedCountry, setSelectedCountry]=useState(uniqueCountries[2])
//   console.log(selectedCountry);
 

//   // Sample product data
//   const products = [
//     {
//  
//       name: 'Wireless Noise-Cancelling Headphones',
//       price: 129.99,
//       category: 'Electronics',
//   
//       image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
//     },
//     {
//  
//       name: 'Organic Cotton T-Shirt',
//       price: 29.99,
//       category: 'Clothing',
//   
//       image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
//     },
//     {
//  
//       name: 'Smart Fitness Watch',
//       price: 199.99,
//       category: 'Electronics',
//   
//       image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
//     },
//     {
//  
//       name: 'Genuine Leather Wallet',
//       price: 49.99,
//       category: 'Accessories',
//   
//       image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?w=500',
//     },
//     {
//  
//       name: 'Ceramic Coffee Mug Set',
//       price: 24.99,
//       category: 'Home',
//   
//       image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500',
//     },
//     {
//  
//       name: 'Hardcover Recipe Book',
//       price: 19.99,
//       category: 'Books',
//   
//       image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
//     },
//     {
//  
//       name: 'Yoga Mat (Non-Slip)',
//       price: 34.99,
//       category: 'Fitness',
//   
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
//     },
//     {
//  
//       name: 'Vitamin C Serum',
//       price: 27.99,
//       category: 'Beauty',
//   
//       image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
//     },
//     {
//  
//       name: 'Bluetooth Portable Speaker',
//       price: 89.99,
//       category: 'Electronics',
//   
//       image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
//     },
//     {
//  
//       name: 'Denim Jeans (Slim Fit)',
//       price: 59.99,
//       category: 'Clothing',
//   
//       image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
//     },
//     {
//  
//       name: 'Stainless Steel Water Bottle',
//       price: 22.99,
//       category: 'Outdoors',
//   
//       image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
//     },
//     {
//  
//       name: 'Wireless Phone Charger',
//       price: 18.99,
//       category: 'Electronics',
//   
//       image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
//     },
//     {
//  
//       name: 'Aromatherapy Diffuser',
//       price: 32.99,
//       category: 'Home',
//   
//       image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=500',
//     },
//     {
//  
//       name: 'Running Shoes',
//       price: 79.99,
//       category: 'Footwear',
//   
//       image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500',
//     },
//     {
//  
//       name: 'Canvas Backpack',
//       price: 45.99,
//       category: 'Accessories',
//   
//       image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
//     },
//     {
//  
//       name: 'Organic Green Tea',
//       price: 12.99,
//       category: 'Food',
//   
//       image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500',
//     },
//     {
//  
//       name: 'Resistance Bands Set',
//       price: 29.99,
//       category: 'Fitness',
//   
//       image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
//     },
//     {
//  
//       name: 'Wooden Desk Organizer',
//       price: 39.99,
//       category: 'Office',
//   
//       image: 'https://images.unsplash.com/photo-1585637071663-799845ad5212?w=500',
//     },
//     {
//  
//       name: 'Sunglasses (UV Protection)',
//       price: 65.99,
//       category: 'Accessories',
//   
//       image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
//     },
//     {
//  
//       name: 'Indoor Plant (Snake Plant)',
//       price: 34.99,
//       category: 'Garden',
//   
//       image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
//     }
//   ];

//   const categories = ['All', 'Restaurantss', 'Order Food Stuff', 'African Attire','Herb', 'Hair Salon'];

//   const toggleWishlist = (productId) => {
//     setWishlist(prev => 
//       prev.includes(productId) 
//         ? prev.filter(id => id !== productId) 
//         : [...prev, productId]
//     );
//   };

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
//     const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
//     return matchesSearch && matchesCategory && matchesPrice;
//   });

//   return (
//     <div className="bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         {/* Marketplace Header */}
//         <div className='flex justify-between items-center gap-6'>
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Diaspora Marketplace</h1>
//           <p className="text-gray-600">Discover amazing products and get it delivered to your doorstep</p>
//         </div>
//         <div className="border rounded-lg">
//                   <Countries selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} uniqueCountries={uniqueCountries} />
//                 </div>
//         </div>

//         {/* Search and Categories */}
//         <div className="mb-8">
//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
//           </div>

//           {/* Category Buttons */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map(category => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   activeCategory === category
//                     ? 'bg-indigo-600 text-white'
//                     : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Grid - Full Width */}
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">
//               {activeCategory === 'All' ? 'All Products' : activeCategory}
//               <span className="text-sm text-gray-500 ml-2">
//                 ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'})
//               </span>
//             </h2>
//             <select 
//               className="border rounded px-3 py-1.5 bg-white text-sm"
//               onChange={(e) => console.log('Sort by:', e.target.value)}
//             >
//               <option value="featured">Featured</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="rating">Top Rated</option>
//             </select>
//           </div>

//           {filteredProducts.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//               <p className="text-gray-500 text-lg">No products found matching your criteria</p>
//               <button 
//                 className="mt-4 text-indigo-600 hover:underline"
//                 onClick={() => {
//                   setSearchQuery('');
//                   setActiveCategory('All');
//                   setPriceRange([0, 1000]);
//                 }}
//               >
//                 Reset all filters
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredProducts.map(product => (
//                 <div 
//                   key={product.id} 
//                   className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
//                 >
//                   <div className="relative h-[16rem] w-full">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                     <button
//                       onClick={() => toggleWishlist(product.id)}
//                       className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
//                     >
//                       <FiHeart
//                         className={
//                           wishlist.includes(product.id) 
//                             ? 'text-red-500 fill-red-500' 
//                             : 'text-gray-400'
//                         }
//                       />
//                     </button>
//                   </div>
                  
//                   <div className="p-4 flex-grow flex flex-col">
//                     <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
//                     <div className="flex items-center mb-2">
//                       <div className="flex text-yellow-400">
//                         {[...Array(5)].map((_, i) => (
//                           <FiStar
//                             key={i}
//                             className={
//                               i < Math.floor(product.rating) 
//                                 ? 'fill-current' 
//                                 : 'text-gray-300'
//                             }
//                           />
//                         ))}
//                       </div>
//                       <span className="text-xs text-gray-500 ml-1">
//                         ({product.rating})
//                       </span>
//                     </div>
//                     <p className="text-lg font-bold text-indigo-600 mt-auto">
//                       ${product.price.toFixed(2)}
//                     </p>
//                     <button 
//                       className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors text-sm"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketplacePage;



// const Countries=( {uniqueCountries,selectedCountry,setSelectedCountry})=>{
//       const [open, setOpen] = useState(false);
     
      

//   return (
//     <div>
//            <Popover
//                   isOpen={open}
//                   onOpenChange={setOpen}
//                   placement="bottom-end"
//                   showArrow={true}
                  
//                 >
//                   <PopoverTrigger>
//                     <Button className="bg-inherit bordered">
//                       <CountryFlag
//                         rounded
//                         code={selectedCountry?.code}
//                         className=" rounded-md w-10 h-7"
//                       />
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
//                     <div className="px-4 py-2 w-[200px] gap-4 grid grid-cols-1 overflow-y-scroll  custom-scrollbar">
//                       {uniqueCountries?.map((country, index) => (
//                           <Button
//                             key={index}
//                             onPress={() => {
//                               setSelectedCountry(country);
//                               setOpen(false);
//                             }}
//                             className={`flex flex-col h-11 gap-1 items-stretch rounded-md hover:bg-primary-500 hover:text-white ${country.code === selectedCountry.code && "border-2 border-primary-500"}
//                             `}
//                           >
//                             <div className="flex flex-row gap-2 items-center">
//                               <CountryFlag
//                                 rounded
//                                 code={country.code}
//                                 className="h-7 w-7"
//                               />
//                               <p className="text-sm font-medium">{country.name}</p>
//                             </div>
//                           </Button>
//                         )
//                       )}
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//     </div>
//   )
// }



// /* eslint-disable react/prop-types */
// import { useState, useEffect } from 'react';
// import { FiSearch, FiStar, FiMapPin } from 'react-icons/fi';

// const MarketplacePage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [selectedCountry, setSelectedCountry] = useState('Nigeria');
//   const [businesses, setBusinesses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const categories = ['All', 'Restaurants', 'Food Items', 'African Attire', 'Herb', 'Hair Saloon'];

//   // Sample business data - in a real app, this would come from your API
//   const sampleBusinesses = [
//     {
//       id: 1,
//       merchantName: "Savannah Grill",
//       category: "Restaurants",
//       country: "Nigeria",
//       state: "Lagos",
//       address: "123 Victoria Island",
//       businessProfile: "https://savannahgrill.com",
//       businessImageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
//   
//       description: "Authentic Nigerian cuisine in a modern setting"
//     },
//     {
//       id: 2,
//       merchantName: "AfroFood Market",
//       category: "Food Items",
//       country: "Nigeria",
//       state: "Lagos",
//       address: "45 Lekki Phase 1",
//       businessProfile: "https://afrofoodmarket.com",
//       businessImageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
//   
//       description: "Premium African food ingredients delivered to your door"
//     },
//     {
//       id: 3,
//       merchantName: "Nubian Threads",
//       category: "African Attire",
//       country: "Nigeria",
//       state: "Abuja",
//       address: "78 Central District",
//       businessProfile: "https://nubianthreads.com",
//       businessImageUrl: "https://images.unsplash.com/photo-1591561954555-607968c989ab?w=500",
//   
//       description: "Handcrafted African clothing and accessories"
//     },
//     {
//       id: 4,
//       merchantName: "Herbal Haven",
//       category: "Herb",
//       country: "Nigeria",
//       state: "Ogun",
//       address: "22 Abeokuta Road",
//       businessProfile: "https://herbalhaven.com",
//       businessImageUrl: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=500",
//   
//       description: "Traditional African herbs and natural remedies"
//     },
//     {
//       id: 5,
//       merchantName: "Curls & Coils",
//       category: "Hair Saloon",
//       country: "Nigeria",
//       state: "Lagos",
//       address: "56 Ikeja City Mall",
//       businessProfile: "https://curlsandcoils.com",
//       businessImageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500",
//   
//       description: "Specialists in African hair care and styling"
//     },
//     {
//       id: 6,
//       merchantName: "Taste of Kenya",
//       category: "Restaurants",
//       country: "Kenya",
//       state: "Nairobi",
//       address: "34 Kilimani Road",
//       businessProfile: "https://tasteofkenya.com",
//       businessImageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500",
//   
//       description: "Experience the rich flavors of Kenyan cuisine"
//     }
//   ];

//   // Simulate API call to fetch businesses
//   useEffect(() => {
//     setIsLoading(true);
    
//     // In a real app, you would fetch from your API:
//     // fetch(`/api/businesses?country=${selectedCountry}`)
//     //   .then(res => res.json())
//     //   .then(data => {
//     //     setBusinesses(data);
//     //     setIsLoading(false);
//     //   });
    
//     // For demo, use sample data after a delay
//     setTimeout(() => {
//       setBusinesses(sampleBusinesses);
//       setIsLoading(false);
//     }, 800);
//   }, [selectedCountry]);


//   const filteredBusinesses = businesses.filter(business => {
//     const matchesSearch = business.merchantName.toLowerCase().includes(searchQuery.toLowerCase());
    
//     // If "All" is selected, show businesses in the selected country
//     const matchesCategory = activeCategory === 'All' || business.category === activeCategory;
    
//     // Filter by selected country
//     const matchesCountry = business.country === selectedCountry;
    
//     return matchesSearch && matchesCategory && matchesCountry;
//   });

//   return (
//     <div className="bg-gray-50 py-8 min-h-screen">
//       <div className="container mx-auto px-4">
//         {/* Marketplace Header */}
//         <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Diaspora Business Marketplace</h1>
//             <p className="text-gray-600">Discover authentic businesses from your home country</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-gray-700 hidden md:block">Country:</span>
//             <div className="border rounded-lg">
//               <select 
//                 value={selectedCountry}
//                 onChange={(e) => setSelectedCountry(e.target.value)}
//                 className="py-2 px-3 bg-white rounded-md"
//               >
//                 <option value="Nigeria">Nigeria</option>
//                 <option value="Ghana">Ghana</option>
//                 <option value="Kenya">Kenya</option>
//                 <option value="South Africa">South Africa</option>
//                 <option value="United States">United States</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Search and Categories */}
//         <div className="mb-8">
//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="Search businesses..."
//               className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
//           </div>

//           {/* Category Buttons */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map(category => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   activeCategory === category
//                     ? 'bg-indigo-600 text-white'
//                     : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Business Grid */}
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">
//               {activeCategory === 'All' 
//                 ? `All Businesses in ${selectedCountry}` 
//                 : `${activeCategory} in ${selectedCountry}`}
//               <span className="text-sm text-gray-500 ml-2">
//                 ({filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'})
//               </span>
//             </h2>
//           </div>

//           {isLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[1, 2, 3, 4, 5, 6].map((item) => (
//                 <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
//                   <div className="animate-pulse">
//                     <div className="bg-gray-200 h-[16rem] w-full"></div>
//                     <div className="p-4">
//                       <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
//                       <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
//                       <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
//                       {/* <div className="h-10 bg-gray-200 rounded w-full"></div> */}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : filteredBusinesses.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//               <p className="text-gray-500 text-lg">
//                 No businesses found in {selectedCountry}{activeCategory !== 'All' ? ` in the ${activeCategory} category` : ''}
//               </p>
//               <button 
//                 className="mt-4 text-indigo-600 hover:underline"
//                 onClick={() => {
//                   setSearchQuery('');
//                   setActiveCategory('All');
//                 }}
//               >
//                 Reset filters
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredBusinesses.map(business => (
//                 <div 
//                   key={business.id} 
//                   className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col border border-gray-100"
//                 >
//                   <div className="relative h-[16rem] w-full">
//                     {business.businessImageUrl ? (
//                       <img
//                         src={business.businessImageUrl}
//                         alt={business.merchantName}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400">
//                         <div className="text-center p-4">
//                           <div className="text-4xl mb-2">🏢</div>
//                           <p>Business Image</p>
//                         </div>
//                       </div>
//                     )}
//                     <div className="absolute bottom-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
//                       {business.category}
//                     </div>
//                   </div>
                  
//                   <div className="p-4 flex-grow flex flex-col">
//                     <h3 className="font-bold text-gray-900 text-lg mb-1">{business.merchantName}</h3>
                    
//                     <div className="flex items-center mb-2">
//                       <div className="flex text-yellow-400">
//                         {[...Array(5)].map((_, i) => (
//                           <FiStar
//                             key={i}
//                             className={
//                               i < Math.floor(business.rating) 
//                                 ? 'fill-current' 
//                                 : 'text-gray-300'
//                             }
//                           />
//                         ))}
//                       </div>
//                       <span className="text-xs text-gray-500 ml-1">
//                         ({business.rating})
//                       </span>
//                     </div>
                    
//                     <div className="flex items-center mb-2 text-sm text-gray-600">
//                       <FiMapPin className="mr-1" />
//                       {business.address}, {business.state}
//                     </div>
                    
//                     <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-1">
//                       {business.description}
//                     </p>
                    
//                     {/* <div className="flex gap-2 mt-auto">
//                       <button 
//                         className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors text-sm flex items-center justify-center"
//                       >
//                         View Details
//                       </button>
//                       <button 
//                         className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-50 transition-colors text-sm flex items-center justify-center"
//                       >
//                         Contact
//                       </button>
//                     </div> */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketplacePage;




/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FiSearch, FiStar, FiMapPin } from 'react-icons/fi';
import { Select, SelectItem } from "@nextui-org/react";
import { africanCountryCodes, countries } from '../libs/constants';
import { useGetMerchants } from '../apis/auth';

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const africanCountries = countries.filter(
    (country) => africanCountryCodes.includes(country.code)
  );
  const uniqueCountries = Array.from(new Map(africanCountries.map(c => [c.code, c])).values());
  const [country, setCountry] = useState(uniqueCountries[0]);
  const [businesses, setBusinesses] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const {data, isPending:isLoading} = useGetMerchants({country: country.name, category: activeCategory});
  console.log("data", data?.merchants);
  

  const categories = ['All', 'Restaurant', 'Food Items', 'African Attire', 'Herb', 'Hair Saloon'];

 // const sampleBusinesses = [
  //   {
  //     merchantName: "Savannah Grill",
  //     category: "Restaurants",
  //     country: "Nigeria",
  //     state: "Lagos",
  //     address: "123 Victoria Island",
  //     businessImageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
  //     description: "Authentic Nigerian cuisine in a modern setting"
  //   },
  //   {
  //     merchantName: "AfroFood Market",
  //     category: "Food Items",
  //     country: "Nigeria",
  //     state: "Lagos",
  //     address: "45 Lekki Phase 1",
  //     businessImageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
  //     description: "Premium African food ingredients delivered to your door"
  //   },
  //   {
  //     merchantName: "Nubian Threads",
  //     category: "African Attire",
  //     country: "Nigeria",
  //     state: "Abuja",
  //     address: "78 Central District",
  //     businessImageUrl: "https://images.unsplash.com/photo-1591561954555-607968c989ab?w=500",
  //     description: "Handcrafted African clothing and accessories"
  //   },
  //   {
  //     merchantName: "Herbal Haven",
  //     category: "Herb",
  //     country: "Nigeria",
  //     state: "Ogun",
  //     address: "22 Abeokuta Road",
  //     businessImageUrl: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=500",
  //     description: "Traditional African herbs and natural remedies"
  //   },
  //   {
  //     merchantName: "Curls & Coils",
  //     category: "Hair Saloon",
  //     country: "Nigeria",
  //     state: "Lagos",
  //     address: "56 Ikeja City Mall",
  //     businessImageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500",
  //     description: "Specialists in African hair care and styling"
  //   },
  //   {
  //     merchantName: "Taste of Kenya",
  //     category: "Restaurants",
  //     country: "Kenya",
  //     state: "Nairobi",
  //     address: "34 Kilimani Road",
  //     businessImageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500",
  //     description: "Experience the rich flavors of Kenyan cuisine"
  //   },
  //   {
  //     merchantName: "Spice Traders",
  //     category: "Food Items",
  //     country: "Ghana",
  //     state: "Accra",
  //     address: "89 Independence Ave",
  //     businessImageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
  //     description: "Premium African spices and cooking ingredients"
  //   },
  //   {
  //     merchantName: "Zulu Designs",
  //     category: "African Attire",
  //     country: "South Africa",
  //     state: "Johannesburg",
  //     address: "12 Soweto Plaza",
  //     businessImageUrl: "https://images.unsplash.com/photo-1591369822090-8d9a14fdd0c5?w=500",
  //     description: "Contemporary African fashion inspired by tradition"
  //   }
  // ];  // Sample business data
 

  // Simulate API call to fetch businesses
  useEffect(() => {
    
    // In a real app, you would fetch from your API:
    // fetch(`/api/businesses?country=${country.name}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setBusinesses(data);
    //     setIsLoading(false);
    //   });
    
    // For demo, use sample data after a delay
   if (data) {
    setBusinesses(data?.merchants);
   }
    // setBusinesses(sampleBusinesses);
  }, [data]);

  const filteredBusinesses = businesses?.filter(business => {
    const matchesSearch = business?.merchantInfo?.merchantName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If "All" is selected, show businesses in the selected country
    // const matchesCategory = activeCategory === 'All' || business.category === activeCategory;
    
    // Filter by selected country
    // const matchesCountry = business.country === country.name;
    
    // return matchesSearch && matchesCategory && matchesCountry;
    return matchesSearch
  });

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Marketplace Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Diaspora Business Marketplace</h1>
            <p className="text-gray-600">Discover authentic businesses from your home country</p>
          </div>
              <Select
                 size="sm"
     className="max-w-[250px]"
                label="Select Country"
                selectedKeys={country.code ? new Set([country.code]) : new Set()}
                onSelectionChange={(e) => {
                  const selectedCode = Array.from(e)[0];
                  const selected = uniqueCountries.find(c => c.code === selectedCode);
                  console.log("selectedCountry",selected);
                  
                  if (selected) setCountry(selected);
                }}
                required
              >
                {uniqueCountries.map((country) => (
                  <SelectItem 
                    key={country.code} 
                    textValue={country.name}
                    isDisabled={country.code === 'US'}
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://flagcdn.com/16x12/${country.code.toLowerCase()}.png`} 
                        alt={country.name} 
                        className="w-5 h-5" 
                      />
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
          {/* <div className="flex items-center gap-3">
            <div className="border rounded-lg w-full max-w-[300px]">
            </div>
          </div> */}
        </div>

        {/* Search and Categories */}
        <div className="mb-8">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search businesses..."
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

        {/* Business Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {activeCategory === 'All' 
                ? `All Businesses from ${country.name}` 
                : `${activeCategory} from ${country.name}`}
              <span className="text-sm text-gray-500 ml-2">
                ({filteredBusinesses?.length} {filteredBusinesses?.length === 1 ? 'business' : 'businesses'})
              </span>
            </h2>
          </div>
                    {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="animate-pulse">
                    <div className="bg-gray-200 h-[16rem] w-full"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                      {/* <div className="h-10 bg-gray-200 rounded w-full"></div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBusinesses?.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">
                No businesses from {country.name} found {activeCategory !== 'All' ? ` in the ${activeCategory} category` : ''}
              </p>
              <button 
                className="mt-4 text-indigo-600 hover:underline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBusinesses?.map(business => (
                <div 
                  key={business.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col border border-gray-100"
                >
                  <div className="relative h-[16rem] w-full">
                    {business.merchantInfo.businessImageUrl ? (
                      <img
                        src={business.merchantInfo.businessImageUrl}
                        alt={business.merchantInfo.merchantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">🏢</div>
                          <p>Business Image</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      {business.merchantInfo.category}
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{business.merchantInfo.merchantName}</h3>
                    <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={
                              i < Math.floor(4.5) 
                                ? 'fill-current' 
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({4.5})
                      </span>
                    </div>
                    <div className=" bg-slate-300 text-xs px-2 py-1 rounded-full">
                      {business.merchantInfo.country}
                    </div>
                    </div>
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                      <FiMapPin className="mr-1" />
                      {business.merchantInfo.address}, {business.merchantInfo.state}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-1">
                      {business.merchantInfo.description}
                    </p>
                    
                    {/* <div className="flex gap-2 mt-auto">
                      <button 
                        className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors text-sm flex items-center justify-center"
                      >
                        View Details
                      </button>
                      <button 
                        className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-50 transition-colors text-sm flex items-center justify-center"
                      >
                        Contact
                      </button>
                    </div> */}
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