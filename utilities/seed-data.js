const { getNames } = require('country-list');
const jsSha = require('jssha');

// function to generate a hash for password
function getHash(input) {
  // environment variable to use as a secret word for hashing userId cookie
  // environment variable is currently stored in ~/.profile (see RA module 3.6.4)
  const myEnvVar = process.env.MY_ENV_VAR;

  // create new SHA object
  // eslint-disable-next-line new-cap
  const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });

  // create an unhashed cookie string based on user ID and myEnVar
  const unhashedString = `${input}-${myEnvVar}`;

  // generate a hashed cookie string using SHA object
  shaObj.update(unhashedString);

  return shaObj.getHash('HEX');
}

// array of objects containing country names.
// object template is { name: <countryname> }
const countriesList = [];
const countriesNames = getNames();

countriesNames.sort();

for (let i = 0; i < countriesNames.length; i += 1) {
  countriesList.push({
    name: countriesNames[i],
  });
}

// array of objects containing category names.
// object template is { name: <categoryname> }
const categoriesList = [];

const categoriesNames = ['Food & Drinks', 'Collectibles', 'Gadgets', 'Ladies Fashion', 'Men Fashion', 'Sports', 'Beauty', 'Household', 'Pets', 'Babies', 'Games', 'Everything Else'];

for (let i = 0; i < categoriesNames.length; i += 1) {
  categoriesList.push({
    name: categoriesNames[i],
  });
}

// array of objects containing users data
const usersList = [
  {
    name: 'Alvin',
    about: 'Hi! Pleased to meet you!',
    email: 'alvin@gmail.com',
    password: getHash('alvin'),
    bank_name: 'POSB',
    bank_account_number: '12345678910',
    address: 'Nicoll highway blk700A #09-891',
    country_id: 200,
    photo: '/images/profile-photos/anonymous-person.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Kai',
    about: 'Hi! Pleased to meet you!',
    email: 'kai@gmail.com',
    password: getHash('kai'),
    bank_name: 'OCBC',
    bank_account_number: '12345678910',
    address: '777 Brockton Avenue, Abington MA 2351',
    country_id: 236,
    photo: '/images/profile-photos/anonymous-person.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Akira',
    about: 'Hi! Pleased to meet you!',
    email: 'akira@gmail.com',
    password: getHash('akira'),
    bank_name: 'OCBC',
    bank_account_number: '12345678910',
    address: '30 Memorial Drive, Avon MA 2322',
    country_id: 236,
    photo: '/images/profile-photos/anonymous-person.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Jit Corn',
    about: 'Hi! Pleased to meet you!',
    email: 'jitcorn@gmail.com',
    password: getHash('jitcorn'),
    bank_name: 'OCBC',
    bank_account_number: '12345678910',
    address: '10, Eoulmadang-ro 2-gil, Mapo-gu, Seoul',
    country_id: 112,
    photo: '/images/profile-photos/anonymous-person.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Kenrick',
    about: 'Hi! Pleased to meet you!',
    email: 'kenrick@gmail.com',
    password: getHash('kenrick'),
    bank_name: 'OCBC',
    bank_account_number: '12345678910',
    address: '20, Eoulmadang-ro 2-gil, Mapo-gu, Seoul',
    country_id: 112,
    photo: '/images/profile-photos/anonymous-person.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Jeremy',
    about: 'Hi! Pleased to meet you!',
    email: 'jeremy@gmail.com',
    password: getHash('jeremy'),
    bank_name: 'OCBC',
    bank_account_number: '12345678910',
    address: '92 Mapo-daero, Dohwa-dong, Mapo-gu, Seoul',
    country_id: 112,
    photo: '/images/profile-photos/anonymous-person.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Veena',
    about: 'Hi! Pleased to meet you!',
    email: 'veena@gmail.com',
    password: getHash('veena'),
    bank_name: 'OCBC',
    bank_account_number: '12345678910',
    address: 'Veerapathiran Kovil, Kamakkapalayam, Tamil Nadu 636101, India',
    country_id: 103,
    photo: '/images/profile-photos/anonymous-person.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Ben',
    about: 'Hi! Pleased to meet you!',
    email: 'ben@gmail.com',
    password: getHash('ben'),
    bank_name: 'POSB',
    bank_account_number: '12345678910',
    address: 'Espen highway blk100A #09-891',
    country_id: 200,
    photo: '/images/profile-photos/anonymous-person.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// array of objects containing requests data
const requestsList = [
  {
    category_id: 1,
    country_id: 200,
    helper_id: null,
    requester_id: 2,
    product_name: 'Bak Kwa',
    description: '1 packet of 500g Bee Cheng Hiang Bak Kwa',
    price: '50',
    reference_link: 'https://www.beechenghiang.com.sg/sliced-pork-480g.html',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: '777 Brockton Avenue, Abington MA 2351',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 5,
    country_id: 112,
    helper_id: null,
    requester_id: 3,
    product_name: 'uniqlo shirt',
    description: '1 x Medium uniqlo shirt',
    price: '30',
    reference_link: 'https://www.uniqlo.com/sg/store/men-the-game-by-street-fighter-graphic-t-shirt-4193600005.html',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: '10, Eoulmadang-ro 2-gil, Mapo-gu, Seoul',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 11,
    country_id: 200,
    helper_id: null,
    requester_id: 4,
    product_name: 'Singaporean Dream',
    description: '1 set of Singaporean Dream cards',
    price: '50',
    reference_link: 'https://www.amazon.sg/The-Singaporean-Dream-Base-Set/dp/B081S8NTCC',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: '30 Memorial Drive, Avon MA 2322',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 3,
    country_id: 200,
    helper_id: null,
    requester_id: 5,
    product_name: 'prism monitor',
    description: '1 W270 pro prism monitor',
    price: '250',
    reference_link: 'https://prismplus.sg/collections/gaming-monitors',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: '20, Eoulmadang-ro 2-gil, Mapo-gu, Seoul',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 6,
    country_id: 103,
    helper_id: null,
    requester_id: 6,
    product_name: 'skateboard',
    description: 'Zero Skateboards Single Skull Black / White Complete Skateboard - 8" x 32"',
    price: '450',
    reference_link: 'https://www.desertcart.sg/products/55671368-zero-skateboards-single-skull-black-white-complete-skateboard-8-x-32',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: '92 Mapo-daero, Dohwa-dong, Mapo-gu, Seoul',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 4,
    country_id: 200,
    helper_id: null,
    requester_id: 7,
    product_name: 'green dress',
    description: '1 x love bonito dress',
    price: '50',
    reference_link: 'https://www.carousell.sg/p/love-bonito-lovebonito-lb-green-dress-141766431/',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: 'Veerapathiran Kovil, Kamakkapalayam, Tamil Nadu 636101, India',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 1,
    country_id: 112,
    helper_id: null,
    requester_id: 2,
    product_name: 'Seaweed',
    description: '1 packet of seaweed',
    price: '20',
    reference_link: 'https://ezbuy.sg/product/475122044.html?keywords=seaweed&baseGpid=475122044&pl=1&ezspm=1.20000000.22.0.0',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: 'Nicoll highway blk700A #09-891',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 2,
    country_id: 236,
    helper_id: 2,
    requester_id: 1,
    product_name: 'Dolphin mug',
    description: '1 dolpin mug',
    price: '50',
    reference_link: 'https://www.lazada.sg/products/dolphin-collection-porcelain-mug-with-cover-coffee-design-i303060070-s536344452.html?spm=a2o42.lazmart_search.list.1.6fb97ec7n2BhNj&search=1',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'accepted',
    shipping_address: 'Nicoll highway blk700A #09-891',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 2,
    country_id: 103,
    helper_id: 7,
    requester_id: 1,
    product_name: 'Gift tags',
    description: '1 packet',
    price: '10',
    reference_link: 'https://www.lazada.sg/products/artwrap-coloured-gift-tags-i304170726-s538362875.html?spm=a2o42.lazmart_search.list.2.3b2e8d06nPo6tZ&search=1',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'shipped',
    shipping_address: 'Nicoll highway blk700A #09-891',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 1,
    country_id: 200,
    helper_id: 8,
    requester_id: 1,
    product_name: 'milo powder',
    description: '1 packet',
    price: '20',
    reference_link: 'https://www.lazada.sg/products/milo-active-go-regular-powder-refill-pack-i301090782-s527090731.html?spm=a2o42.lazmart_search.list.1.6bae1e26NoPu9M&search=1',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'completed',
    shipping_address: 'Nicoll highway blk700A #09-891',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 3,
    country_id: 236,
    helper_id: null,
    requester_id: 1,
    product_name: 'Ipad stand',
    description: '1 stand',
    price: '60',
    reference_link: 'https://www.lazada.sg/products/elago-p4-stand-for-ipad-pro-ipad-air-ipad-mini-and-pc-tablet-rose-gold-i306712629-s549576628.html?spm=a2o42.lazmart_search.list.1.2b93226cMmYids&search=1',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'cancelled',
    shipping_address: 'Nicoll highway blk700A #09-891',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 4,
    country_id: 103,
    helper_id: null,
    requester_id: 1,
    product_name: 'Earrings',
    description: '1 packet',
    price: '10',
    reference_link: 'https://www.lazada.sg/products/artwrap-party-favors-pirate-silver-earrings-i304034111-s538136757.html?spm=a2o42.lazmart_search.list.1.52093bb5eZo0Mz&search=1',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: 'Nicoll highway blk700A #09-891',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    category_id: 3,
    country_id: 103,
    helper_id: null,
    requester_id: 1,
    product_name: 'Iphone case',
    description: '1 case',
    price: '20',
    reference_link: 'https://www.lazada.sg/products/artwrap-party-favors-pirate-silver-earrings-i304034111-s538136757.html?spm=a2o42.lazmart_search.list.1.52093bb5eZo0Mz&search=1',
    payment_filename: '/images/payments/wire-transfer.jpg',
    status: 'requested',
    shipping_address: 'Nicoll highway blk700A #09-891',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const productPhotosList = [
  {
    request_id: 1,
    filename: '/images/products/bak-kwa.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    request_id: 1,
    filename: 'https://images-sg.girlstyle.com/wp-content/uploads/2021/01/8e044402.png',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    request_id: 2,
    filename: '/images/products/sg-dream.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    request_id: 3,
    filename: '/images/products/uniqlo-shirt.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    request_id: 4,
    filename: '/images/products/prism.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    request_id: 5,
    filename: '/images/products/skateboard.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    request_id: 13,
    filename: '/images/products/iphone-case.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// export the seed data as a module
module.exports = {
  countriesList,
  categoriesList,
  usersList,
  requestsList,
  productPhotosList,
};
