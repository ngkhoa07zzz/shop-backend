import bcript from 'bcrypt';

const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin01@gmail.com',
      password: bcript.hashSync('12345633333', 10),
      isAdmin: true,
    },
    {
      name: 'User',
      email: 'user01@gmail.com',
      password: bcript.hashSync('12345633333', 10),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'CPU Intel Core i7',
      slug: 'cpu-intel-core-i7',
      category: 'CPU - Bộ vi xử lý',
      image: '/images/cpu-intel-core-i7.jpg',
      price: 6990000,
      countInStock: 100,
      brand: 'Intel ',
      rating: 4.0,
      numReviews: 4,
      description: '12700K 12C/20T ( 3.60 GHz up to 5.00 GHz ) Hàng NK',
    },
    {
      // _id: '2',
      name: 'Card Màn Hình ASUS DUAL RTX4060',
      slug: 'asus-dual-rtx4060',
      category: 'VGA - Card màn hình',
      image: '/images/asus-dual-rtx4060.jpg',
      price: 16990000,
      countInStock: 10,
      brand: 'ASUS ',
      rating: 5.0,
      numReviews: 2,
      description: 'Đang cập nhật...',
    },
    {
      // _id: '3',
      name: 'Card Màn Hình Gigabyte GeForce RTX 4060 Ti',
      slug: 'gigabyte-geforce-rtx-4060ti',
      category: 'VGA - Card màn hình',
      image: '/images/gigabyte-geforce-rtx-4060ti.jpg',
      price: 12390000,
      countInStock: 0,
      brand: 'Gigabyte ',
      rating: 4.5,
      numReviews: 1,
      description: 'Bảo Hành 36 Tháng',
    },
    {
      // _id: '4',
      name: 'CPU AMD Ryzen 7 7800X3D',
      slug: 'cpu-amd-ryzen7',
      category: 'CPU - Bộ vi xử lý',
      image: '/images/cpu-amd-ryzen7.jpg',
      price: 11889000,
      countInStock: 100,
      brand: 'AMD ',
      rating: 4.0,
      numReviews: 4,
      description: '4.2GHz Boost 5.0GHz / 8 nhân 16 luồng / 104MB / AM5',
    },
  ],
};

export default data;
