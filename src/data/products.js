const products = [
  {
    id: 1,
    title: "Used Laptop - Dell Inspiron",
    images: [
      "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3535-amd/spi/plastic/black/ng/notebook-inspiron-15-3535-plastic-black-campaign-hero-504x350-ng.psd?fmt=jpg&wid=570&hei=400", 
      "https://m.media-amazon.com/images/I/81zDEfedPCL.jpg", 
      "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3530-intel/media-gallery/silver-plastic/notebook-inspiron-15-3530-nt-plastic-silver-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=320&wid=482&qlt=100,1&resMode=sharp2&size=482,320&chrss=full"] , 
    category: "Electronics",
    price: '30,000',
    description: "Used Laptop, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user1",
  },
  {
    id: 2,
    title: "Engineering Maths - II Textbook",
    images: [
      "https://www.tcetmumbai.in/image/Staff/hns/Resource/MATHS-II.webp", 
      "https://www.tcetmumbai.in/image/Staff/hns/Resource/MATHS-II.webp", 
      "https://www.tcetmumbai.in/image/Staff/hns/Resource/MATHS-II.webp", 
      ] , 
    category: "Books",
    price: '150',
    description: "Engineering Maths 2 Textbook. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user2",

  },
  {
    id: 3,
    title: "Scientific Calculator",
    images: [
      "https://scoffco.com/cdn/shop/products/61YjIY_0fDL._SX425.jpg?v=1682332707&width=1445", 
      "https://www.casio-intl.com/asia/en/calc/products/images/fx-991ES_F.jpg", 
      "https://ssstationers.pk/cdn/shop/files/Casio_Fx-991_Es_Plus_Box.png?v=1730191688&width=1445", 
      ] , 
    category: "Electronics",
    price: '500',
    description: "Scientific Calculator. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user3",

  },
  {
    id: 4,
    title: "WMP Lab Coat",
    images: [
      "https://kewalson.com/cdn/shop/files/Blue_Cotton_Lab_Coat___KS_COLABD_668764dd-4c66-4ddf-8a70-68e3759f6ef3.jpg?v=1740643424", 
      "https://lordsindia.com/cdn/shop/products/IMG_20190225_161627.jpg?v=1707763619", 
      "https://images.jdmagicbox.com/quickquotes/images_main/women-s-lab-coat-navy-blue-l-2221484746-bbztveb1.jpg", 
      ] , 
    category: "Clothes",
    price: '200',
    description: "WMP Lab Coat. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user4",
  },
  {
    id: 5,
    title: "Single Sided Sheet Bundle",
    images: [
      "https://rukminim2.flixcart.com/image/300/300/jcnovbk0/paper/c/4/w/lc748-1-project-paper-shipra-original-imaffqs56man7pfy.jpeg", 
      "https://rukminim2.flixcart.com/image/300/300/jcnovbk0/paper/c/4/w/lc748-1-project-paper-shipra-original-imaffqs56man7pfy.jpeg", 
      "https://rukminim2.flixcart.com/image/300/300/jcnovbk0/paper/c/4/w/lc748-1-project-paper-shipra-original-imaffqs56man7pfy.jpeg", 
      ] , 
    category: "Stationary",
    price: '200',
    description: "Single Sided Sheet Bundle. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user5",
  },
  {
    id: 6,
    title: "Double Sided Sheet Bundle",
    images: [
      "https://rukminim2.flixcart.com/image/704/844/xif0q/paper/a/p/1/a4-size-both-side-ruled-white-sheet-for-project-2-pack-of-40-original-imagpsruha7zcpha.jpeg?q=90&crop=false", 
      "https://rukminim2.flixcart.com/image/704/844/xif0q/paper/a/p/1/a4-size-both-side-ruled-white-sheet-for-project-2-pack-of-40-original-imagpsruha7zcpha.jpeg?q=90&crop=false", 
      "https://rukminim2.flixcart.com/image/704/844/xif0q/paper/a/p/1/a4-size-both-side-ruled-white-sheet-for-project-2-pack-of-40-original-imagpsruha7zcpha.jpeg?q=90&crop=false",
      ] , 
    category: "Stationary",
    price: '200',
    description: "Double Sided Sheet Bundle. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user6",
  },
  {
    id: 7,
    title: "Chemistry Lab Coat",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/5/312514544/HU/WY/LH/1164718/machine-wash-white-lab-coat.jpg", 
      "https://samtechlabs.com/wp-content/uploads/2024/08/img_7944.jpeg", 
      "https://www.sirsafety.com/assets/img/prodotti/MC3318K1.png", 
      ] , 
    category: "Clothes",
    price: '200',
    description: "Chemistry Lab Coat. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user7",
  },
  {
    id: 8,
    title: "Physics Reference Book",
    images: [
      "https://www.tcetmumbai.in/image/Staff/hns/Resource/PHYSICS.webp", 
      "https://www.tcetmumbai.in/image/Staff/hns/Resource/PHYSICS.webp", 
      "https://www.tcetmumbai.in/image/Staff/hns/Resource/PHYSICS.webp", 
      ] , 
    category: "Books",
    price: '150',
    description: "Physics Reference Book. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user8",
  },
  {
    id: 9,
    title: "Engineering Mechanics Reference Book",
    images: [
      "https://imgv2-1-f.scribdassets.com/img/document/515271818/original/5e08d65225/1?v=1", 
      "https://imgv2-1-f.scribdassets.com/img/document/515271818/original/5e08d65225/1?v=1", 
      "https://imgv2-1-f.scribdassets.com/img/document/515271818/original/5e08d65225/1?v=1", 
      ] , 
    category: "Books",
    price: '50',
    description: "Engineering Mechanics Reference Book. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem consequatur rem, earum dicta modi fugit possimus quis ea ab maxime, totam eaque eum, tenetur a neque fugiat harum qui vitae!", 
    sellerId: "user9",
  },
];

export default products;
